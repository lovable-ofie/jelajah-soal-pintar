import React from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import QuizGenerator from '@/components/QuizGenerator';

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <div id="quiz-generator">
        <QuizGenerator />
      </div>
    </main>
  );
};

export default Index;
