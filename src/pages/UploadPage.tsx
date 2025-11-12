import { useState, useEffect } from "react";
import { WalletConnection } from "../components/WalletConnection";
import { FileUploader } from "../components/FileUploader";
import { MetadataDisplay } from "../components/MetadataDisplay";
import {
  Alert,
  AlertDescription,
} from "../components/ui/alert";
import { CheckCircle, Clock } from "lucide-react";
import { ethers } from "ethers";
import axios from "axios";
import MediaVerificationABI from "../MediaVerification.json";

interface FileData {
  fileName: string;
  fileHash: string;
  ipfsCID: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

export function UploadPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [fileData, setFileData] = useState<FileData | null>(
    null,
  );
  const [file, setFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [blockchainSuccess, setBlockchainSuccess] =
    useState(false);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleConnectionChange = async (
    connected: boolean,
    address: string,
  ) => {
    setWalletConnected(connected);
    setWalletAddress(address);
    if (connected && window.ethereum) {
      try {
        const newProvider = new ethers.BrowserProvider(window.ethereum);
        setProvider(newProvider);
        const newSigner = await newProvider.getSigner();
        setSigner(newSigner);
        const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
        if (!contractAddress) {
          throw new Error("Contract address not found. Check your .env file.");
        }
        const mediaVerificationContract = new ethers.Contract(contractAddress, MediaVerificationABI, newSigner);
        setContract(mediaVerificationContract);
      } catch (err) {
        setError("Failed to connect to wallet.");
      }
    } else {
      setFileData(null);
      setUploadSuccess(false);
      setBlockchainSuccess(false);
    }
  };

  const handleFileData = (data: FileData | null, file: File | null) => {
    setFileData(data);
    setFile(file);
    setUploadSuccess(false);
    setBlockchainSuccess(false);
  };

  const handleUploadToIPFS = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }
    setIsUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
            pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_API_KEY,
          },
        }
      );
      if (fileData) {
        setFileData({ ...fileData, ipfsCID: res.data.IpfsHash });
      }
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 5000);
    } catch (err) {
      setError("Failed to upload to IPFS.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmitToBlockchain = async () => {
    if (!contract || !fileData) {
      setError("Missing data. Please ensure all fields are ready.");
      return;
    }
    setIsSubmitting(true);
    setError("");

    try {
      const transaction = await contract.addMedia(
        fileData.fileHash,
        Math.floor(new Date(fileData.timestamp).getTime() / 1000),
        Math.round(fileData.latitude * 1e6),
        Math.round(fileData.longitude * 1e6),
        fileData.ipfsCID
      );
      await transaction.wait();
      setTransactionHash(transaction.hash);
      setBlockchainSuccess(true);
    } catch (err) {
      setError("Transaction failed. Check the console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background relative overflow-hidden">
      {/* Large organic blob shapes */}
      <div className="absolute -top-40 -left-40 w-[550px] h-[550px] bg-[#8B5CF6] rounded-[40%_60%_70%_30%/60%_30%_70%_40%] opacity-90"></div>
      <div className="absolute top-[5%] -right-32 w-[500px] h-[500px] bg-[#2DD4BF] rounded-[60%_40%_30%_70%/40%_60%_70%_30%] opacity-90"></div>
      <div className="absolute -bottom-32 left-[10%] w-[600px] h-[600px] bg-[#FACC15] rounded-[30%_70%_70%_30%/30%_30%_70%_70%] opacity-85"></div>
      <div className="absolute bottom-[20%] -right-40 w-[450px] h-[450px] bg-[#FB923C] rounded-[50%_50%_30%_70%/50%_50%_70%_30%] opacity-80"></div>
      <div className="absolute top-[30%] -left-32 w-[400px] h-[400px] bg-[#D946EF] rounded-[70%_30%_50%_50%/60%_40%_60%_40%] opacity-75"></div>
      
      <div className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-foreground mb-4 text-4xl uppercase font-black tracking-tight">
            File Hasher & IPFS Uploader
          </h1>
          <p className="text-muted-foreground mb-6 text-lg">
            Select a file to calculate its SHA256 hash, get
            time/geo-tag, and upload to IPFS.
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] rounded-full text-white shadow-lg font-semibold">
            <Clock size={20} />
            <span>{formatTime(currentTime)}</span>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {uploadSuccess && (
          <Alert className="mb-6 bg-gradient-to-r from-[#2DD4BF]/20 to-[#3B82F6]/20 border-2 border-[#2DD4BF] shadow-lg">
            <CheckCircle className="h-5 w-5 text-[#2DD4BF]" />
            <AlertDescription className="text-foreground font-semibold">
              File uploaded to IPFS successfully!
            </AlertDescription>
          </Alert>
        )}

        {blockchainSuccess && (
          <Alert className="mb-6 bg-gradient-to-r from-[#8B5CF6]/20 to-[#FB923C]/20 border-2 border-[#8B5CF6] shadow-lg">
            <CheckCircle className="h-5 w-5 text-[#8B5CF6]" />
            <AlertDescription className="text-foreground font-semibold">
              Transaction submitted successfully to blockchain!
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-6 max-w-3xl mx-auto">
          <WalletConnection
            onConnectionChange={handleConnectionChange}
          />

          <FileUploader
            onFileData={handleFileData}
            walletConnected={walletConnected}
          />

          {fileData && (
            <MetadataDisplay
              fileData={fileData}
              onUploadToIPFS={handleUploadToIPFS}
              onSubmitToBlockchain={handleSubmitToBlockchain}
              walletConnected={walletConnected}
              isUploading={isUploading}
              isSubmitting={isSubmitting}
            />
          )}

          {blockchainSuccess && fileData && (
            <div className="p-8 bg-card border-2 border-[#8B5CF6] rounded-3xl shadow-2xl shadow-[#8B5CF6]/20 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FACC15]/20 rounded-full blur-2xl"></div>
              <h3 className="text-card-foreground mb-6 font-bold text-2xl uppercase tracking-wide relative z-10">
                Transaction Details
              </h3>
              <div className="space-y-4 relative z-10">
                <div>
                  <p className="text-card-foreground/60 font-semibold mb-1">
                    Transaction Hash
                  </p>
                  <p className="text-card-foreground font-mono break-all bg-card-foreground/5 p-3 rounded-xl">
                    {transactionHash}
                  </p>
                </div>
                <div>
                  <p className="text-card-foreground/60 font-semibold mb-1">
                    File Hash
                  </p>
                  <p className="text-card-foreground font-mono break-all bg-card-foreground/5 p-3 rounded-xl">
                    {fileData.fileHash}
                  </p>
                </div>
                <div>
                  <p className="text-card-foreground/60 font-semibold mb-1">
                    IPFS CID
                  </p>
                  <p className="text-card-foreground font-mono break-all bg-card-foreground/5 p-3 rounded-xl">
                    {fileData.ipfsCID}
                  </p>
                </div>
                <div>
                  <p className="text-card-foreground/60 font-semibold mb-1">
                    Timestamp
                  </p>
                  <p className="text-card-foreground bg-card-foreground/5 p-3 rounded-xl">
                    {new Date(
                      fileData.timestamp,
                    ).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-card-foreground/60 font-semibold mb-1">
                    Location
                  </p>
                  <p className="text-card-foreground bg-card-foreground/5 p-3 rounded-xl">
                    {fileData.latitude.toFixed(6)},{" "}
                    {fileData.longitude.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}