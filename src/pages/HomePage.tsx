import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Shield, FileUp, CheckCircle, Globe } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: FileUp,
      title: 'File Hashing',
      description: 'Generate SHA256 hashes for your files with automatic timestamp and geo-tagging',
      color: 'bg-gradient-to-br from-[#8B5CF6] to-[#2DD4BF]',
      bgShape: 'bg-[#FACC15]/20',
    },
    {
      icon: Globe,
      title: 'IPFS Storage',
      description: 'Upload files and metadata to the InterPlanetary File System for distributed storage',
      color: 'bg-gradient-to-br from-[#2DD4BF] to-[#3B82F6]',
      bgShape: 'bg-[#FB923C]/20',
    },
    {
      icon: Shield,
      title: 'Blockchain Verification',
      description: 'Submit file hashes to blockchain for immutable proof of ownership and integrity',
      color: 'bg-gradient-to-br from-[#FB923C] to-[#8B5CF6]',
      bgShape: 'bg-[#3B82F6]/20',
    },
    {
      icon: CheckCircle,
      title: 'Media Verification',
      description: 'Verify file authenticity and retrieve metadata using file hash lookup',
      color: 'bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6]',
      bgShape: 'bg-[#2DD4BF]/20',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background relative overflow-hidden">
      {/* Large organic blob shapes */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#FACC15] rounded-[40%_60%_70%_30%/60%_30%_70%_40%] opacity-90"></div>
      <div className="absolute -top-20 left-[20%] w-[500px] h-[500px] bg-[#8B5CF6] rounded-[60%_40%_30%_70%/40%_60%_70%_30%] opacity-90"></div>
      <div className="absolute top-[10%] -right-40 w-[550px] h-[550px] bg-[#2DD4BF] rounded-[30%_70%_70%_30%/30%_30%_70%_70%] opacity-90"></div>
      <div className="absolute -bottom-40 -left-40 w-[650px] h-[650px] bg-[#D946EF] rounded-[70%_30%_50%_50%/60%_40%_60%_40%] opacity-80"></div>
      <div className="absolute bottom-[5%] right-[15%] w-[450px] h-[450px] bg-[#3B82F6] rounded-[50%_50%_30%_70%/50%_50%_70%_30%] opacity-85"></div>
      <div className="absolute top-[40%] left-[5%] w-[400px] h-[400px] bg-[#0F0F1A] rounded-[40%_60%_60%_40%/50%_50%_50%_50%] opacity-70"></div>
      <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] bg-[#FB923C] rounded-[65%_35%_45%_55%/55%_45%_65%_35%] opacity-75"></div>
      
      <div className="container mx-auto px-4 py-20 max-w-6xl relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-foreground mb-6 text-5xl md:text-6xl uppercase font-black tracking-tight">
            Secure File Verification & IPFS Storage
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg">
            A decentralized application for hashing files, uploading to IPFS, and verifying 
            data integrity through blockchain technology. Ensure authenticity and ownership 
            of your digital assets.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              onClick={() => onNavigate('upload')}
              className="bg-primary hover:bg-primary/90 text-white px-10 py-6 text-lg rounded-full shadow-lg shadow-primary/30 font-semibold lowercase"
            >
              get started
            </Button>
            <Button
              onClick={() => onNavigate('verify')}
              className="bg-secondary hover:bg-secondary/90 text-background px-10 py-6 text-lg rounded-full shadow-lg shadow-secondary/30 font-semibold lowercase"
            >
              verify file
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-8 border-2 border-border/50 hover:shadow-2xl hover:shadow-primary/10 transition-all hover:-translate-y-1 bg-card relative overflow-hidden">
                <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full ${feature.bgShape} blur-2xl`}></div>
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-4 shadow-lg relative z-10`}>
                  <Icon className="text-white" size={32} />
                </div>
                <h3 className="text-card-foreground mb-3 text-xl font-bold">{feature.title}</h3>
                <p className="text-card-foreground/70">{feature.description}</p>
              </Card>
            );
          })}
        </div>

        {/* How It Works */}
        <Card className="p-10 bg-card border-2 border-border/50 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#3B82F6]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#FB923C]/20 rounded-full blur-3xl"></div>
          <h2 className="text-card-foreground mb-10 text-center uppercase font-black text-3xl tracking-wide relative z-10">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-10 relative z-10">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2DD4BF] to-[#3B82F6] text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-2xl shadow-lg">
                1
              </div>
              <h4 className="text-card-foreground mb-3 font-bold text-lg">Connect Wallet</h4>
              <p className="text-card-foreground/70">Connect your MetaMask wallet to authenticate and enable blockchain features</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8B5CF6] to-[#FB923C] text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-2xl shadow-lg">
                2
              </div>
              <h4 className="text-card-foreground mb-3 font-bold text-lg">Upload & Hash</h4>
              <p className="text-card-foreground/70">Select your file to generate hash, get geo-tags, and upload to IPFS network</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FB923C] to-[#FACC15] text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-2xl shadow-lg">
                3
              </div>
              <h4 className="text-card-foreground mb-3 font-bold text-lg">Verify & Secure</h4>
              <p className="text-card-foreground/70">Submit to blockchain for verification and retrieve metadata anytime</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
