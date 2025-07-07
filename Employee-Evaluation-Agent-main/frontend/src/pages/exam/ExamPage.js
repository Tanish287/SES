import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ExamPage = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  
  const [examData, setExamData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());

  useEffect(() => {
    // Mock exam data - replace with actual API call
    setTimeout(() => {
      const mockExamData = {
        id: sessionId,
        title: 'Mathematics Basic Level',
        duration: 60, // minutes
        questions: [
          {
            id: 1,
            type: 'multiple-choice',
            question: 'What is 2 + 2?',
            options: ['3', '4', '5', '6'],
            marks: 1
          },
          {
            id: 2,
            type: 'multiple-choice',
            question: 'What is the square root of 16?',
            options: ['2', '4', '6', '8'],
            marks: 2
          },
          {
            id: 3,
            type: 'multiple-choice',
            question: 'What is 5 × 7?',
            options: ['30', '35', '40', '45'],
            marks: 1
          },
          {
            id: 4,
            type: 'multiple-choice',
            question: 'What is 100 ÷ 4?',
            options: ['20', '25', '30', '35'],
            marks: 2
          },
          {
            id: 5,
            type: 'multiple-choice',
            question: 'What is 3³ (3 cubed)?',
            options: ['9', '18', '27', '36'],
            marks: 3
          }
        ]
      };
      
      setExamData(mockExamData);
      setTimeRemaining(mockExamData.duration * 60); // Convert to seconds
      setLoading(false);
    }, 1000);
  }, [sessionId]);

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0 && !submitting) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !submitting) {
      handleSubmitExam();
    }
  }, [timeRemaining, submitting]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const toggleFlag = (questionId) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < examData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitExam = async () => {
    if (window.confirm('Are you sure you want to submit your exam? This action cannot be undone.')) {
      setSubmitting(true);
      
      // Mock API call
      setTimeout(() => {
        console.log('Submitting exam:', { sessionId, answers });
        navigate(`/completion/${sessionId}`);
      }, 2000);
    }
  };

  const getQuestionStatus = (questionId) => {
    if (answers[questionId] !== undefined) {
      return 'answered';
    }
    return 'unanswered';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (submitting) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">Submitting your exam...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = examData.questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = examData.questions.length;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{examData.title}</h1>
              <p className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm text-gray-600">Time Remaining</p>
                <p className={`text-lg font-mono ${timeRemaining < 300 ? 'text-red-600' : 'text-gray-900'}`}>
                  {formatTime(timeRemaining)}
                </p>
              </div>
              <button
                onClick={handleSubmitExam}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                Submit Exam
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Navigation Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-4">Questions</h3>
              <div className="grid grid-cols-5 lg:grid-cols-4 gap-2">
                {examData.questions.map((question, index) => {
                  const status = getQuestionStatus(question.id);
                  const isFlagged = flaggedQuestions.has(question.id);
                  const isCurrent = index === currentQuestionIndex;
                  
                  return (
                    <button
                      key={question.id}
                      onClick={() => goToQuestion(index)}
                      className={`
                        relative w-10 h-10 rounded text-sm font-medium transition-colors
                        ${isCurrent 
                          ? 'bg-blue-600 text-white ring-2 ring-blue-300' 
                          : status === 'answered'
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }
                      `}
                    >
                      {index + 1}
                      {isFlagged && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></span>
                      )}
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Answered:</span>
                  <span className="font-medium">{answeredCount}/{totalQuestions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Flagged:</span>
                  <span className="font-medium">{flaggedQuestions.size}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Question Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      Question {currentQuestionIndex + 1}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({currentQuestion.marks} {currentQuestion.marks === 1 ? 'mark' : 'marks'})
                    </span>
                  </div>
                  <h2 className="text-lg font-medium text-gray-900">
                    {currentQuestion.question}
                  </h2>
                </div>
                <button
                  onClick={() => toggleFlag(currentQuestion.id)}
                  className={`
                    px-3 py-1 rounded text-sm font-medium transition-colors
                    ${flaggedQuestions.has(currentQuestion.id)
                      ? 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }
                  `}
                >
                  {flaggedQuestions.has(currentQuestion.id) ? 'Unflag' : 'Flag'}
                </button>
              </div>

              {/* Question Options */}
              {currentQuestion.type === 'multiple-choice' && (
                <div className="space-y-3 mb-8">
                  {currentQuestion.options.map((option, index) => (
                    <label
                      key={index}
                      className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={index}
                        checked={answers[currentQuestion.id] === index}
                        onChange={() => handleAnswerChange(currentQuestion.id, index)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-900">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={previousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                <div className="flex space-x-2">
                  {currentQuestionIndex === examData.questions.length - 1 ? (
                    <button
                      onClick={handleSubmitExam}
                      className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors"
                    >
                      Submit Exam
                    </button>
                  ) : (
                    <button
                      onClick={nextQuestion}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPage;