import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Wand2, 
  Clock, 
  Target, 
  BookOpen, 
  CheckCircle, 
  Globe, 
  Zap, 
  Users,
  Award
} from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Wand2,
      title: 'AI Generator Canggih',
      description: 'Teknologi LLM terdepan yang menghasilkan soal berkualitas tinggi sesuai kurikulum Indonesia.',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: Clock,
      title: 'Instant & Efisien',
      description: 'Buat puluhan soal dalam hitungan detik. Hemat waktu untuk fokus pada pengajaran.',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      icon: Target,
      title: '3 Tingkat Kesulitan',
      description: 'Mudah, Sedang, dan Sulit - sesuaikan dengan level pemahaman siswa Anda.',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      icon: BookOpen,
      title: 'Multi Jenis Soal',
      description: 'Pilihan ganda, isian, benar/salah, dan berbagai format soal lainnya.',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      icon: CheckCircle,
      title: 'Feedback Instan',
      description: 'Setiap soal dilengkapi jawaban benar dan penjelasan yang mudah dipahami.',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      icon: Globe,
      title: 'Bahasa Indonesia First',
      description: 'Dirancang khusus untuk pendidik Indonesia dengan konteks budaya yang tepat.',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    }
  ];

  const stats = [
    {
      icon: Users,
      value: '10,000+',
      label: 'Guru Aktif',
      description: 'Dari SD hingga SMA'
    },
    {
      icon: BookOpen,
      value: '50,000+',
      label: 'Soal Dibuat',
      description: 'Setiap bulannya'
    },
    {
      icon: Award,
      value: '98%',
      label: 'Tingkat Akurasi',
      description: 'Soal berkualitas tinggi'
    },
    {
      icon: Zap,
      value: '2.5 detik',
      label: 'Rata-rata Waktu',
      description: 'Untuk satu soal'
    }
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Kenapa Memilih <span className="gradient-hero bg-clip-text text-transparent">QuizGen Indonesia</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Platform terdepan yang dirancang khusus untuk kebutuhan pendidik Indonesia, 
            dari tingkat dasar hingga perguruan tinggi.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-elegant transition-smooth border-border/50 hover:border-border">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-bounce`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-smooth">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="gradient-subtle rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Dipercaya oleh Ribuan Pendidik
            </h3>
            <p className="text-muted-foreground text-lg">
              Bergabunglah dengan komunitas pendidik yang telah merasakan manfaatnya
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-card shadow-elegant flex items-center justify-center group-hover:shadow-glow transition-smooth">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="font-semibold text-foreground mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}