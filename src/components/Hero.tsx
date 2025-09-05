import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Users, BookOpen, Target } from 'lucide-react';
import heroImage from '@/assets/hero-education.jpg';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen gradient-subtle flex items-center py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">Powered by AI Technology</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Buat Soal Kuis
                <span className="gradient-hero bg-clip-text text-transparent block">
                  dalam Hitungan Detik
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Platform AI terdepan untuk pendidik Indonesia. Hasilkan soal pilihan ganda, 
                isian, dan berbagai jenis kuis berkualitas tinggi dengan mudah dan cepat.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-card/60 backdrop-blur-sm border border-border/50">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">10,000+</p>
                  <p className="text-sm text-muted-foreground">Pendidik</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-lg bg-card/60 backdrop-blur-sm border border-border/50">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="font-semibold">50,000+</p>
                  <p className="text-sm text-muted-foreground">Soal Dibuat</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-lg bg-card/60 backdrop-blur-sm border border-border/50">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold">98%</p>
                  <p className="text-sm text-muted-foreground">Akurasi</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="xl" 
                onClick={() => navigate('/generate-quiz')}
                className="flex-1 sm:flex-none"
              >
                Mulai Buat Soal
                <ArrowRight className="w-5 h-5" />
              </Button>
              
              <Button variant="outline" size="xl" className="flex-1 sm:flex-none">
                Lihat Contoh Soal
              </Button>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>✨ Gratis untuk memulai</span>
              <span>•</span>
              <span>🇮🇩 Dibuat untuk Indonesia</span>
              <span>•</span>
              <span>🤖 Teknologi AI Terkini</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-glow">
              <img 
                src={heroImage} 
                alt="Pendidik Indonesia menggunakan teknologi AI untuk membuat soal kuis"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-4 -left-4 p-3 bg-card rounded-lg shadow-elegant border border-border/50 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success animate-pulse"></div>
                <span className="text-sm font-medium">AI Aktif</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 p-3 bg-card rounded-lg shadow-elegant border border-border/50 backdrop-blur-sm">
              <div className="text-center">
                <p className="text-lg font-bold text-primary">2.5 detik</p>
                <p className="text-xs text-muted-foreground">Rata-rata waktu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}