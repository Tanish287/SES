import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ExamCompletionPage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [examResult, setExamResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call to get exam results
    setTimeout(() => {
      const mockResult = {
        sessionId: sessionId,
        candidateName: 'John Doe',
        examTitle: 'Mathematics Basic Level',
        submittedAt: new Date().toLocaleString(),
        totalQuestions: 5,
        answeredQuestions: 4,
        correctAnswers: 3,
        totalMarks: 9,
        obtainedMarks: 6,
        percentage: 66.67,
        status: 'Completed',
        timeTaken: '45 minutes',
        results: [
          {
            questionId: 1,
            question: 'What is 2 + 2?',
            userAnswer: 1, // Index of selected option
            correctAnswer: 1,
            isCorrect: true,
            marks: 1
          },
          {
            questionId: 2,
            question: 'What is the square root of 16?',
            userAnswer: 1,
            correctAnswer: 1,
            isCorrect: true,
            marks: 2
          },
          {
            questionId: 3,
            question: 'What is 5 × 7?',
            userAnswer: 0,
            correctAnswer: 1,
            isCorrect: false,
            marks: 0
          },
          {
            questionId: 4,
            question: 'What is 100 ÷ 4?',
            userAnswer: 1,
            correctAnswer: 1,
            isCorrect: true,
            marks: 2
          },
          {
            questionId: 5,
            question: 'What is 3³ (3 cubed)?',
            userAnswer: null, // Not answered
            correctAnswer: 2,
            isCorrect: false,
            marks: 0
          }
        ]
      };
      
      setExamResult(mockResult);
      setLoading(false);
    }, 1500);
  }, [sessionId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-green-600 bg-green-100';
      case 'Failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPercentageColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Processing your exam results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Exam Completed!</h1>
          <p className="text-gray-600">Thank you for taking the exam. Here are your results:</p>
        </div>

        {/* Exam Summary */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-900">{examResult.examTitle}</h2>
            <p className="text-gray-600">Candidate: {examResult.candidateName}</p>
            <p className="text-gray-600">Submitted: {examResult.submittedAt}</p>
            <p className="text-gray-600">Time Taken: {examResult.timeTaken}</p>
          </div>

          {/* Score Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {examResult.answeredQuestions}/{examResult.totalQuestions}
              </div>
              <div className="text-sm text-gray-600">Questions Answered</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {examResult.correctAnswers}
              </div>
              <div className="text-sm text-gray-600">Correct Answers</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {examResult.obtainedMarks}/{examResult.totalMarks}
              </div>
              <div className="text-sm text-gray-600">Marks Obtained</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`text-2xl font-bold ${getPercentageColor(examResult.percentage)}`}>
                {examResult.percentage.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Percentage</div>
            </div>
          </div>

          {/* Status */}
          <div className="flex justify-center">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(examResult.status)}`}>
              Status: {examResult.status}
            </span>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Question-wise Results</h3>
          <div className="space-y-4">
            {examResult.results.map((result, index) => (
              <div key={result.questionId} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">
                    Question {index + 1}: {result.question}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      result.isCorrect 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {result.isCorrect ? 'Correct' : result.userAnswer === null ? 'Not Answered' : 'Incorrect'}
                    </span>
                    <span className="text-sm text-gray-600">
                      {result.marks} marks
                    </span>
                  </div>
                </div>
                
                {result.userAnswer !== null && (
                  <div className="text-sm text-gray-600">
                    Your answer: Option {result.userAnswer + 1}
                  </div>
                )}
                
                {!result.isCorrect && (
                  <div className="text-sm text-green-600">
                    Correct answer: Option {result.correctAnswer + 1}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-x-4">
          <button
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Print Results
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Take Another Exam
          </button>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>These results have been saved to your account.</p>
          <p>Session ID: {sessionId}</p>
        </div>
      </div>
    </div>
  );
};

export default ExamCompletionPage;