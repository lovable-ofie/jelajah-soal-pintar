import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  BookOpen, 
  Upload, 
  Youtube, 
  FileText, 
  Target, 
  Zap, 
  Download,
  ArrowLeft,
  Plus,
  Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuestionConfig {
  id: string;
  type: 'multiple-choice' | 'essay' | 'fill-blank' | 'true-false';
  quantity: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'essay' | 'fill-blank' | 'true-false';
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export default function GenerateQuiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState<QuizQuestion[]>([]);
  
  // Step 1: Topic/Title
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  // Step 2: Learning Materials
  const [materialText, setMaterialText] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  // Step 3: Question Configuration
  const [questionConfigs, setQuestionConfigs] = useState<QuestionConfig[]>([
    { id: '1', type: 'multiple-choice', quantity: 5, difficulty: 'medium' }
  ]);

  const questionTypeLabels = {
    'multiple-choice': 'Pilihan Ganda',
    'essay': 'Esai',
    'fill-blank': 'Isian',
    'true-false': 'Benar/Salah'
  };

  const difficultyLabels = {
    easy: 'Mudah',
    medium: 'Sedang',
    hard: 'Sulit'
  };

  const difficultyColors = {
    easy: 'bg-success',
    medium: 'bg-warning',
    hard: 'bg-destructive'
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const addQuestionConfig = () => {
    const newId = (questionConfigs.length + 1).toString();
    setQuestionConfigs(prev => [...prev, {
      id: newId,
      type: 'multiple-choice',
      quantity: 5,
      difficulty: 'medium'
    }]);
  };

  const removeQuestionConfig = (id: string) => {
    setQuestionConfigs(prev => prev.filter(config => config.id !== id));
  };

  const updateQuestionConfig = (id: string, field: keyof QuestionConfig, value: any) => {
    setQuestionConfigs(prev => prev.map(config => 
      config.id === id ? { ...config, [field]: value } : config
    ));
  };

  const generateQuiz = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
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
        difficulty: 'medium'
      },
      {
        id: '2',
        question: 'Jelaskan peran klorofil dalam proses fotosintesis dan mengapa daun berwarna hijau.',
        type: 'essay',
        correctAnswer: 'Klorofil berperan menyerap energi cahaya matahari, terutama cahaya merah dan biru, sementara memantulkan cahaya hijau sehingga daun tampak hijau.',
        explanation: 'Klorofil adalah pigmen hijau yang terdapat dalam kloroplas dan berperan penting dalam fotosintesis.',
        difficulty: 'hard'
      }
    ];
    
    setGeneratedQuiz(mockQuestions);
    setIsGenerating(false);
    setStep(4);
  };

  const exportToPDF = (includeAnswers: boolean) => {
    console.log(`Exporting to PDF ${includeAnswers ? 'with' : 'without'} answers`);
    // Implement PDF export logic here
  };

  const totalQuestions = questionConfigs.reduce((sum, config) => sum + config.quantity, 0);

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Generator Soal Kuis</h1>
            <p className="text-muted-foreground">
              Buat soal kuis berkualitas tinggi dengan bantuan AI
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-smooth ${
                  step >= stepNum 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 4 && (
                  <div className={`w-8 h-0.5 mx-2 transition-smooth ${
                    step > stepNum ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Topic/Material Title */}
        {step === 1 && (
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Langkah 1: Judul & Deskripsi Materi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Judul Materi *</Label>
                <Input
                  id="title"
                  placeholder="Contoh: Fotosintesis pada Tumbuhan"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi Materi (Opsional)</Label>
                <Textarea
                  id="description"
                  placeholder="Berikan deskripsi singkat tentang topik yang akan dibahas..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => setStep(2)}
                  disabled={!title.trim()}
                >
                  Lanjutkan
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Learning Materials */}
        {step === 2 && (
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Langkah 2: Materi Pembelajaran
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Text Input */}
              <div className="space-y-2">
                <Label htmlFor="materialText">Teks Materi</Label>
                <Textarea
                  id="materialText"
                  placeholder="Masukkan teks materi pembelajaran yang ingin dijadikan dasar soal kuis..."
                  value={materialText}
                  onChange={(e) => setMaterialText(e.target.value)}
                  className="min-h-[150px]"
                />
              </div>

              <Separator />

              {/* File Upload */}
              <div className="space-y-4">
                <Label>Upload Dokumen</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-smooth">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="fileUpload"
                  />
                  <label htmlFor="fileUpload" className="cursor-pointer">
                    <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">
                      Klik untuk upload atau drag & drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, DOC, DOCX, PPT, PPTX, TXT (max 10MB)
                    </p>
                  </label>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span className="text-sm">{file.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              {/* YouTube URL */}
              <div className="space-y-2">
                <Label htmlFor="youtubeUrl">URL Video YouTube</Label>
                <div className="flex gap-2">
                  <Youtube className="w-5 h-5 text-destructive mt-2" />
                  <Input
                    id="youtubeUrl"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Kembali
                </Button>
                <Button 
                  onClick={() => setStep(3)}
                  disabled={!materialText.trim() && uploadedFiles.length === 0 && !youtubeUrl.trim()}
                >
                  Lanjutkan
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Question Configuration */}
        {step === 3 && (
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Langkah 3: Konfigurasi Soal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {questionConfigs.map((config, index) => (
                  <div key={config.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Tipe Soal {index + 1}</h4>
                      {questionConfigs.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuestionConfig(config.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Jenis Soal</Label>
                        <Select 
                          value={config.type} 
                          onValueChange={(value: any) => updateQuestionConfig(config.id, 'type', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="multiple-choice">Pilihan Ganda</SelectItem>
                            <SelectItem value="essay">Esai</SelectItem>
                            <SelectItem value="fill-blank">Isian</SelectItem>
                            <SelectItem value="true-false">Benar/Salah</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Jumlah Soal</Label>
                        <Select 
                          value={config.quantity.toString()} 
                          onValueChange={(value) => updateQuestionConfig(config.id, 'quantity', Number(value))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 5, 10, 15, 20].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Tingkat Kesulitan</Label>
                        <Select 
                          value={config.difficulty} 
                          onValueChange={(value: any) => updateQuestionConfig(config.id, 'difficulty', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
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
                    </div>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  onClick={addQuestionConfig}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Tipe Soal
                </Button>
              </div>

              <div className="p-4 bg-accent/10 rounded-lg">
                <h4 className="font-medium mb-2">Ringkasan Konfigurasi</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Total {totalQuestions} soal akan dibuat
                </p>
                <div className="space-y-1">
                  {questionConfigs.map((config) => (
                    <div key={config.id} className="flex items-center gap-2 text-sm">
                      <Badge variant="secondary" className={`${difficultyColors[config.difficulty]} text-white`}>
                        {difficultyLabels[config.difficulty]}
                      </Badge>
                      <span>{config.quantity} {questionTypeLabels[config.type]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Kembali
                </Button>
                <Button 
                  variant="hero"
                  onClick={generateQuiz}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Zap className="w-4 h-4 animate-pulse mr-2" />
                      Membuat Soal...
                    </>
                  ) : (
                    <>
                      <Target className="w-4 h-4 mr-2" />
                      Buat {totalQuestions} Soal
                    </>
                  )}
                </Button>
              </div>

              {isGenerating && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Memproses materi pembelajaran...</span>
                    <span className="font-medium">AI sedang bekerja</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 4: Generated Quiz Results */}
        {step === 4 && generatedQuiz.length > 0 && (
          <div className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Kuis Berhasil Dibuat!
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => exportToPDF(false)}>
                      <Download className="w-4 h-4 mr-2" />
                      Soal Saja
                    </Button>
                    <Button variant="secondary" onClick={() => exportToPDF(true)}>
                      <Download className="w-4 h-4 mr-2" />
                      Soal + Kunci Jawaban
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {generatedQuiz.length} soal siap untuk digunakan berdasarkan materi "{title}"
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {generatedQuiz.map((question, index) => (
                <Card key={question.id} className="shadow-elegant">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">Soal {index + 1}</CardTitle>
                      <div className="flex gap-2">
                        <Badge variant="outline">
                          {questionTypeLabels[question.type]}
                        </Badge>
                        <Badge variant="secondary" className={`${difficultyColors[question.difficulty]} text-white`}>
                          {difficultyLabels[question.difficulty]}
                        </Badge>
                      </div>
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

                    {question.type === 'essay' && (
                      <div className="p-3 rounded-lg border border-success bg-success/5">
                        <span className="font-medium">Contoh Jawaban: </span>
                        <p className="text-sm mt-1">{question.correctAnswer}</p>
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
              <Button variant="secondary" size="lg" onClick={() => {
                setStep(1);
                setTitle('');
                setDescription('');
                setMaterialText('');
                setYoutubeUrl('');
                setUploadedFiles([]);
                setQuestionConfigs([{ id: '1', type: 'multiple-choice', quantity: 5, difficulty: 'medium' }]);
                setGeneratedQuiz([]);
              }}>
                <BookOpen className="w-4 h-4 mr-2" />
                Buat Kuis Baru
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}