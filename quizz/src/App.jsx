import React, { useState, useEffect, createContext } from 'react';
import { Clock, Zap, SkipForward, Trophy, RotateCcw, Play } from 'lucide-react';

// Quiz data structure
const quizData = {
  Tech: [
    {
      question: "What is React?",
      options: ["A library", "A framework", "A language", "A database"],
      answer: "A library"
    },
    {
      question: "Which company developed JavaScript?",
      options: ["Microsoft", "Netscape", "Google", "Apple"],
      answer: "Netscape"
    },
    {
      question: "What does CSS stand for?",
      options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
      answer: "Cascading Style Sheets"
    },
    {
      question: "Which of these is not a programming language?",
      options: ["Python", "Java", "HTML", "C++"],
      answer: "HTML"
    },
    {
      question: "What is the latest version of HTTP?",
      options: ["HTTP/1.1", "HTTP/2", "HTTP/3", "HTTP/4"],
      answer: "HTTP/3"
    },
    {
      question: "Which database is known as NoSQL?",
      options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
      answer: "MongoDB"
    },
    {
      question: "What does API stand for?",
      options: ["Application Programming Interface", "Automated Program Integration", "Advanced Programming Instructions", "Application Process Integration"],
      answer: "Application Programming Interface"
    },
    {
      question: "Which is not a JavaScript framework?",
      options: ["Angular", "Vue.js", "Django", "React"],
      answer: "Django"
    },
    {
      question: "What is Git used for?",
      options: ["Database management", "Version control", "Web hosting", "Code compilation"],
      answer: "Version control"
    },
    {
      question: "Which company owns GitHub?",
      options: ["Google", "Microsoft", "Facebook", "Amazon"],
      answer: "Microsoft"
    }
  ],
  Science: [
    {
      question: "What is the chemical symbol for gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      answer: "Au"
    },
    {
      question: "How many bones are in an adult human body?",
      options: ["206", "208", "210", "212"],
      answer: "206"
    },
    {
      question: "What is the speed of light in vacuum?",
      options: ["299,792,458 m/s", "300,000,000 m/s", "299,000,000 m/s", "301,000,000 m/s"],
      answer: "299,792,458 m/s"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars"
    },
    {
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
      answer: "Mitochondria"
    },
    {
      question: "What is the hardest natural substance?",
      options: ["Gold", "Iron", "Diamond", "Platinum"],
      answer: "Diamond"
    },
    {
      question: "How many chambers does a human heart have?",
      options: ["2", "3", "4", "5"],
      answer: "4"
    },
    {
      question: "What gas do plants absorb from the atmosphere?",
      options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
      answer: "Carbon dioxide"
    },
    {
      question: "What is the study of earthquakes called?",
      options: ["Geology", "Seismology", "Meteorology", "Oceanography"],
      answer: "Seismology"
    },
    {
      question: "Which blood type is known as the universal donor?",
      options: ["A", "B", "AB", "O"],
      answer: "O"
    }
  ],
  Movies: [
    {
      question: "Who directed the movie 'Inception'?",
      options: ["Steven Spielberg", "Christopher Nolan", "Martin Scorsese", "Quentin Tarantino"],
      answer: "Christopher Nolan"
    },
    {
      question: "Which movie won the Academy Award for Best Picture in 2020?",
      options: ["1917", "Joker", "Parasite", "Once Upon a Time in Hollywood"],
      answer: "Parasite"
    },
    {
      question: "In which movie did Leonardo DiCaprio finally win his first Oscar?",
      options: ["The Wolf of Wall Street", "The Revenant", "Inception", "Titanic"],
      answer: "The Revenant"
    },
    {
      question: "What is the highest-grossing film of all time?",
      options: ["Titanic", "Avatar", "Avengers: Endgame", "Star Wars: The Force Awakens"],
      answer: "Avatar"
    },
    {
      question: "Who played the character of Jack Sparrow?",
      options: ["Orlando Bloom", "Johnny Depp", "Geoffrey Rush", "Keira Knightley"],
      answer: "Johnny Depp"
    },
    {
      question: "Which movie features the line 'May the Force be with you'?",
      options: ["Star Trek", "Star Wars", "Guardians of the Galaxy", "Interstellar"],
      answer: "Star Wars"
    },
    {
      question: "Who composed the music for 'The Lion King'?",
      options: ["John Williams", "Hans Zimmer", "Danny Elfman", "Alan Menken"],
      answer: "Hans Zimmer"
    },
    {
      question: "Which actress played Hermione Granger in Harry Potter?",
      options: ["Emma Stone", "Emma Watson", "Emma Roberts", "Emily Blunt"],
      answer: "Emma Watson"
    },
    {
      question: "What is the name of the coffee shop in 'Friends'?",
      options: ["Starbucks", "Central Perk", "The Coffee House", "Bean There"],
      answer: "Central Perk"
    },
    {
      question: "Which movie won the first ever Academy Award for Best Picture?",
      options: ["Wings", "Sunrise", "The Jazz Singer", "7th Heaven"],
      answer: "Wings"
    }
  ]
};

// Context for global state management
const QuizContext = createContext();

// Confetti component for celebrations
const Confetti = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
      {[...Array(50)].map((_, i) => (
        <div
          key={i + 50}
          className="absolute w-2 h-2 bg-blue-400 animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

// Progress Bar Component
const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
      <div 
        className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

// Timer Component
const Timer = ({ timeLeft, totalTime }) => {
  const percentage = (timeLeft / totalTime) * 100;
  const isUrgent = timeLeft <= 5;
  
  return (
    <div className={`flex items-center space-x-2 ${isUrgent ? 'text-red-500 animate-pulse' : 'text-gray-600'}`}>
      <Clock className="w-5 h-5" />
      <div className="flex items-center space-x-2">
        <span className="font-mono text-lg font-bold">{timeLeft}s</span>
        <div className="w-20 bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ${isUrgent ? 'bg-red-500' : 'bg-green-500'}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

// Lifeline Component
const Lifelines = ({ onFiftyFifty, onSkip, fiftyFiftyUsed, skipsRemaining }) => {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        onClick={onFiftyFifty}
        disabled={fiftyFiftyUsed}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
          fiftyFiftyUsed 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
        }`}
      >
        <Zap className="w-4 h-4" />
        <span>50/50</span>
        {fiftyFiftyUsed && <span className="text-xs">(Used)</span>}
      </button>
      
      <button
        onClick={onSkip}
        disabled={skipsRemaining === 0}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
          skipsRemaining === 0
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-purple-500 hover:bg-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
        }`}
      >
        <SkipForward className="w-4 h-4" />
        <span>Skip ({skipsRemaining})</span>
      </button>
    </div>
  );
};

// Start Screen Component
const StartScreen = ({ onSelectCategory }) => {
  const categories = Object.keys(quizData);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="mb-8">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Master</h1>
          <p className="text-gray-600">Test your knowledge across different categories!</p>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Choose a Category:</h2>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Rules:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 10 questions per quiz</li>
            <li>• 15 seconds per question</li>
            <li>• Use lifelines wisely!</li>
            <li>• Score 80%+ for confetti celebration!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Quiz Screen Component
const QuizScreen = ({ 
  category, 
  currentQuestion, 
  questions, 
  selectedAnswer, 
  showResult, 
  timeLeft, 
  onSelectAnswer, 
  onNextQuestion,
  onUseFiftyFifty,
  onSkip,
  fiftyFiftyUsed,
  skipsRemaining,
  hiddenOptions,
  score
}) => {
  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-gray-800">{category} Quiz</h2>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                {currentQuestion + 1}/{questions.length}
              </span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Score</div>
              <div className="text-2xl font-bold text-blue-600">{score}/{questions.length}</div>
            </div>
          </div>
          
          <ProgressBar current={currentQuestion + 1} total={questions.length} />
          
          <div className="flex justify-between items-center">
            <Timer timeLeft={timeLeft} totalTime={15} />
            <Lifelines 
              onFiftyFifty={onUseFiftyFifty}
              onSkip={onSkip}
              fiftyFiftyUsed={fiftyFiftyUsed}
              skipsRemaining={skipsRemaining}
            />
          </div>
        </div>
        
        {/* Question */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
            {question.question}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {question.options.map((option, index) => {
              const isHidden = hiddenOptions.includes(index);
              const isSelected = selectedAnswer === option;
              const isCorrect = option === question.answer;
              
              let buttonClass = "p-4 rounded-xl font-medium text-left transition-all duration-300 transform hover:scale-105 ";
              
              if (isHidden) {
                buttonClass += "bg-gray-200 text-gray-400 cursor-not-allowed opacity-50";
              } else if (showResult) {
                if (isCorrect) {
                  buttonClass += "bg-green-500 text-white shadow-lg";
                } else if (isSelected && !isCorrect) {
                  buttonClass += "bg-red-500 text-white shadow-lg";
                } else {
                  buttonClass += "bg-gray-100 text-gray-700";
                }
              } else if (isSelected) {
                buttonClass += "bg-blue-500 text-white shadow-lg";
              } else {
                buttonClass += "bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-md hover:shadow-lg";
              }
              
              return (
                <button
                  key={index}
                  onClick={() => !isHidden && !showResult && onSelectAnswer(option)}
                  disabled={isHidden || showResult}
                  className={buttonClass}
                >
                  <span className="font-semibold mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
          
          {showResult && (
            <div className="text-center">
              <button
                onClick={onNextQuestion}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {isLastQuestion ? 'View Results' : 'Next Question'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Results Screen Component
const ResultsScreen = ({ score, total, category, onRestart, onBackToStart }) => {
  const percentage = Math.round((score / total) * 100);
  const showConfetti = percentage >= 80;
  
  const getScoreMessage = () => {
    if (percentage >= 90) return "Outstanding! You're a quiz master! 🏆";
    if (percentage >= 80) return "Excellent work! Well done! 🌟";
    if (percentage >= 70) return "Good job! Keep it up! 👏";
    if (percentage >= 60) return "Not bad! Room for improvement! 📚";
    return "Keep practicing! You'll get better! 💪";
  };
  
  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 flex items-center justify-center p-4">
      <Confetti isActive={showConfetti} />
      
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h1>
        <h2 className="text-xl text-gray-600 mb-6">{category} Category</h2>
        
        <div className="mb-8">
          <div className={`text-6xl font-bold mb-2 ${getScoreColor()}`}>
            {score}/{total}
          </div>
          <div className={`text-2xl font-semibold mb-4 ${getScoreColor()}`}>
            {percentage}%
          </div>
          <p className="text-lg text-gray-700 font-medium">
            {getScoreMessage()}
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={onRestart}
            className="w-full flex items-center justify-center space-x-2 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Try Again</span>
          </button>
          
          <button
            onClick={onBackToStart}
            className="w-full flex items-center justify-center space-x-2 py-3 px-6 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Play className="w-5 h-5" />
            <span>New Category</span>
          </button>
        </div>
        
        {showConfetti && (
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
            <p className="text-yellow-800 font-medium">
              🎉 Congratulations! You scored over 80%! 🎉
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  // Game states
  const [gameState, setGameState] = useState('start'); // 'start', 'quiz', 'results'
  const [selectedCategory, setSelectedCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  
  // Lifeline states
  const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState(false);
  const [skipsRemaining, setSkipsRemaining] = useState(2);
  const [hiddenOptions, setHiddenOptions] = useState([]);
  
  // Timer effect
  useEffect(() => {
    if (gameState === 'quiz' && !showResult && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp();
    }
  }, [timeLeft, gameState, showResult]);
  
  // Handle category selection
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setQuestions(shuffleArray([...quizData[category]]).slice(0, 10));
    setGameState('quiz');
    resetQuestionState();
  };
  
  // Shuffle array utility
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  // Reset question-specific state
  const resetQuestionState = () => {
    setSelectedAnswer('');
    setShowResult(false);
    setTimeLeft(15);
    setHiddenOptions([]);
  };
  
  // Handle answer selection
  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };
  
  // Handle time up
  const handleTimeUp = () => {
    setShowResult(true);
    // Don't increment score if time runs out
  };
  
  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      resetQuestionState();
    } else {
      setGameState('results');
    }
  };
  
  // Handle 50/50 lifeline
  const handleFiftyFifty = () => {
    if (fiftyFiftyUsed || showResult) return;
    
    const currentQ = questions[currentQuestion];
    const correctIndex = currentQ.options.indexOf(currentQ.answer);
    const incorrectIndices = currentQ.options
      .map((_, index) => index)
      .filter(index => index !== correctIndex);
    
    // Randomly select 2 incorrect answers to hide
    const toHide = incorrectIndices
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    
    setHiddenOptions(toHide);
    setFiftyFiftyUsed(true);
  };
  
  // Handle skip lifeline
  const handleSkip = () => {
    if (skipsRemaining === 0 || showResult) return;
    
    setSkipsRemaining(skipsRemaining - 1);
    handleNextQuestion();
  };
  
  // Handle restart
  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setFiftyFiftyUsed(false);
    setSkipsRemaining(2);
    setQuestions(shuffleArray([...quizData[selectedCategory]]).slice(0, 10));
    setGameState('quiz');
    resetQuestionState();
  };
  
  // Handle back to start
  const handleBackToStart = () => {
    setGameState('start');
    setCurrentQuestion(0);
    setScore(0);
    setFiftyFiftyUsed(false);
    setSkipsRemaining(2);
    setSelectedCategory('');
    resetQuestionState();
  };
  
  // Render appropriate screen based on game state
  if (gameState === 'start') {
    return <StartScreen onSelectCategory={handleSelectCategory} />;
  }
  
  if (gameState === 'quiz') {
    return (
      <QuizScreen
        category={selectedCategory}
        currentQuestion={currentQuestion}
        questions={questions}
        selectedAnswer={selectedAnswer}
        showResult={showResult}
        timeLeft={timeLeft}
        onSelectAnswer={handleSelectAnswer}
        onNextQuestion={handleNextQuestion}
        onUseFiftyFifty={handleFiftyFifty}
        onSkip={handleSkip}
        fiftyFiftyUsed={fiftyFiftyUsed}
        skipsRemaining={skipsRemaining}
        hiddenOptions={hiddenOptions}
        score={score}
      />
    );
  }
  
  if (gameState === 'results') {
    return (
      <ResultsScreen
        score={score}
        total={questions.length}
        category={selectedCategory}
        onRestart={handleRestart}
        onBackToStart={handleBackToStart}
      />
    );
  }
  
  return null;
};

export default App;