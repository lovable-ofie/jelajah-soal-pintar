import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Wand2, BookOpen, Target, Zap } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'fill-blank' | 'true-false';
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export default function QuizGenerator() {
  const [material, setMaterial] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [questionType, setQuestionType] = useState<'all' | 'multiple-choice' | 'fill-blank' | 'true-false'>('all');
  const [questionCount, setQuestionCount] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState<QuizQuestion[]>([]);
  const [showResults, setShowResults] = useState(false);

  const generateQuiz = async () => {
    setIsGenerating(true);
    setShowResults(false);
    
    // Simulate AI generation - in real app, this would call OpenAI/Claude
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockQuestions: QuizQuestion[] = [
      {
        id: '1',
        question: 'Apa fungsi utama dari fotosintesis pada tumbuhan?',
        type: 'multiple-choice',
        options: [
          'Menghasilkan oksigen dan glukosa',
          'Menyerap air dari tanah',
          'Menghasilkan karbon dioksida',
          'Menyimpan energi dalam bentuk ATP'
        ],
        correctAnswer: 'Menghasilkan oksigen dan glukosa',
        explanation: 'Fotosintesis adalah proses di mana tumbuhan menggunakan energi cahaya matahari untuk mengubah karbon dioksida dan air menjadi glukosa dan oksigen.',
        difficulty: difficulty
      },
      {
        id: '2',
        question: 'Proses _______ memungkinkan tumbuhan membuat makanan sendiri menggunakan energi matahari.',
        type: 'fill-blank',
        correctAnswer: 'fotosintesis',
        explanation: 'Fotosintesis adalah proses fundamental yang memungkinkan tumbuhan untuk menghasilkan energi dari cahaya matahari.',
        difficulty: difficulty
      }
    ];
    
    setGeneratedQuiz(mockQuestions);
    setIsGenerating(false);
    setShowResults(true);
  };

  const difficultyColors = {
    easy: 'bg-success',
    medium: 'bg-warning',
    hard: 'bg-destructive'
  };

  const difficultyLabels = {
    easy: 'Mudah',
    medium: 'Sedang',
    hard: 'Sulit'
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Wand2 className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Generator Soal Kuis</h2>
          </div>
          <p className="text-muted-foreground text-lg">
            Buat soal kuis berkualitas tinggi dengan bantuan AI dalam hitungan detik
          </p>
        </div>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Input Materi Pembelajaran
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="topic">Topik/Judul Materi</Label>
                <Textarea
                  id="topic"
                  placeholder="Contoh: Fotosintesis pada Tumbuhan"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="resize-none"
                  rows={2}
                />
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Tingkat Kesulitan</Label>
                  <Select value={difficulty} onValueChange={(value: 'easy' | 'medium' | 'hard') => setDifficulty(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tingkat kesulitan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-success"></div>
                          Mudah
                        </div>
                      </SelectItem>
                      <SelectItem value="medium">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-warning"></div>
                          Sedang
                        </div>
                      </SelectItem>
                      <SelectItem value="hard">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-destructive"></div>
                          Sulit
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="questionType">Jenis Soal</Label>
                  <Select value={questionType} onValueChange={(value: any) => setQuestionType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis soal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Jenis</SelectItem>
                      <SelectItem value="multiple-choice">Pilihan Ganda</SelectItem>
                      <SelectItem value="fill-blank">Isian</SelectItem>
                      <SelectItem value="true-false">Benar/Salah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="material">Materi Pembelajaran (Opsional)</Label>
              <Textarea
                id="material"
                placeholder="Masukkan teks materi pembelajaran yang ingin dijadikan dasar soal kuis..."
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="min-h-[120px]"
              />
              <p className="text-sm text-muted-foreground">
                Anda bisa memasukkan teks dari buku, artikel, atau materi pembelajaran lainnya
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="count" className="whitespace-nowrap">Jumlah Soal:</Label>
                <Select value={questionCount.toString()} onValueChange={(value) => setQuestionCount(Number(value))}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[3, 5, 10, 15, 20].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                variant="hero" 
                size="lg"
                onClick={generateQuiz}
                disabled={!topic.trim() || isGenerating}
                className="w-full sm:w-auto"
              >
                {isGenerating ? (
                  <>
                    <Zap className="w-4 h-4 animate-pulse" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Target className="w-4 h-4" />
                    Buat Soal Kuis
                  </>
                )}
              </Button>
            </div>

            {isGenerating && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Membuat soal kuis...</span>
                  <span className="font-medium">AI sedang bekerja</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        {showResults && generatedQuiz.length > 0 && (
          <div className="mt-8 space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Kuis Berhasil Dibuat!</h3>
              <p className="text-muted-foreground">
                {generatedQuiz.length} soal siap untuk digunakan
              </p>
            </div>

            <div className="space-y-4">
              {generatedQuiz.map((question, index) => (
                <Card key={question.id} className="shadow-elegant">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">Soal {index + 1}</CardTitle>
                      <Badge variant="secondary" className={`${difficultyColors[question.difficulty]} text-white`}>
                        {difficultyLabels[question.difficulty]}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="font-medium text-foreground">{question.question}</p>
                    
                    {question.options && (
                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => (
                          <div 
                            key={optIndex}
                            className={`p-3 rounded-lg border transition-smooth ${
                              option === question.correctAnswer 
                                ? 'border-success bg-success/5' 
                                : 'border-border bg-muted/50'
                            }`}
                          >
                            <span className="font-medium mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                            {option}
                            {option === question.correctAnswer && (
                              <Badge variant="secondary" className="ml-2 bg-success text-white">
                                Jawaban Benar
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {question.type === 'fill-blank' && (
                      <div className="p-3 rounded-lg border border-success bg-success/5">
                        <span className="font-medium">Jawaban: </span>
                        <span className="font-semibold text-success">{question.correctAnswer}</span>
                      </div>
                    )}

                    <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                      <h4 className="font-semibold text-accent mb-1">Penjelasan:</h4>
                      <p className="text-sm text-muted-foreground">{question.explanation}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button variant="secondary" size="lg">
                <BookOpen className="w-4 h-4" />
                Buat Kuis Baru
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}