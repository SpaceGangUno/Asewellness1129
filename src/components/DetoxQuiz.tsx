import React, { useState } from 'react';
import { Sparkles, Battery, Brain, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const questions = [
  {
    id: 1,
    question: "What's your main wellness goal?",
    options: [
      { text: "Boost Energy", icon: Battery },
      { text: "Mental Clarity", icon: Brain },
      { text: "Digestive Health", icon: Heart },
      { text: "Overall Detox", icon: Sparkles }
    ]
  },
  {
    id: 2,
    question: "How would you describe your current lifestyle?",
    options: [
      { text: "Always on the go", icon: Battery },
      { text: "Mostly sedentary", icon: Brain },
      { text: "Balanced but need boost", icon: Heart },
      { text: "Stressed and tired", icon: Sparkles }
    ]
  },
  {
    id: 3,
    question: "What's your experience with detox programs?",
    options: [
      { text: "First timer", icon: Battery },
      { text: "Occasional", icon: Brain },
      { text: "Regular", icon: Heart },
      { text: "Expert", icon: Sparkles }
    ]
  }
];

const recommendations = {
  "Boost Energy-Always on the go-First timer": {
    name: "Energize & Revive Program",
    description: "A gentle introduction to detoxing with focus on natural energy boosters.",
    products: [
      { name: "Morning Sunrise Juice", price: 9.99 },
      { name: "Green Energy Blend", price: 8.99 },
      { name: "Citrus Boost Tea", price: 7.99 }
    ]
  },
  "Mental Clarity-Mostly sedentary-Occasional": {
    name: "Mind & Body Reset",
    description: "Perfect for mental focus and gentle cleansing.",
    products: [
      { name: "Brain Boost Elixir", price: 10.99 },
      { name: "Clarity Tea Blend", price: 8.99 },
      { name: "Focus Factor Juice", price: 9.99 }
    ]
  }
};

export default function DetoxQuiz() {
  const { addToCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [recommendation, setRecommendation] = useState<any>(null);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const key = newAnswers.join("-");
      setRecommendation(recommendations[key as keyof typeof recommendations] || {
        name: "Custom Wellness Program",
        description: "A personalized program tailored to your unique needs.",
        products: [
          { name: "Premium Detox Blend", price: 11.99 },
          { name: "Wellness Tea", price: 8.99 },
          { name: "Recovery Juice", price: 9.99 }
        ]
      });
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setRecommendation(null);
    setAddedToCart(false);
  };

  const handleAddToCart = () => {
    recommendation.products.forEach((product: { name: string; price: number }) => {
      addToCart({ name: product.name, price: product.price, quantity: 1 });
    });
    setAddedToCart(true);
  };

  return (
    <div className="mt-8">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="btn-primary bg-natural-gradient shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <Sparkles className="h-5 w-5 mr-2 animate-pulse-soft" />
          <span>Find Your Perfect Detox</span>
        </button>
      )}

      {isOpen && (
        <div className="glass-effect rounded-2xl p-8 max-w-xl animate-fade-in shadow-2xl border border-white/20">
          {!recommendation ? (
            <div>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-natural-gradient mb-6">
                {questions[currentQuestion].question}
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {questions[currentQuestion].options.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.text}
                      onClick={() => handleAnswer(option.text)}
                      className="group flex flex-col items-center p-6 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="p-3 rounded-lg bg-natural-gradient mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <span className="text-white text-lg font-medium">{option.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center animate-fade-in">
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-natural-gradient mb-4">
                {recommendation.name}
              </h3>
              <p className="text-white/90 text-lg mb-8">{recommendation.description}</p>
              <div className="space-y-4 mb-8">
                {recommendation.products.map((product: { name: string; price: number }, index: number) => (
                  <div 
                    key={product.name} 
                    className="bg-white/10 p-4 rounded-lg flex justify-between items-center transform hover:scale-102 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="text-white text-lg">{product.name}</span>
                    <span className="text-xl font-semibold text-transparent bg-clip-text bg-natural-gradient">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex space-x-6 justify-center">
                <button
                  onClick={resetQuiz}
                  className="px-8 py-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  Start Over
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  className={`flex items-center space-x-3 px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                    addedToCart
                      ? 'bg-emerald-200/20 text-emerald-200 cursor-not-allowed'
                      : 'bg-natural-gradient text-white hover:opacity-90'
                  }`}
                >
                  <ShoppingCart className={`h-5 w-5 ${addedToCart ? '' : 'animate-pulse-soft'}`} />
                  <span>{addedToCart ? 'Added to Cart' : 'Add All to Cart'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
