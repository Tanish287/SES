import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, User, Mail, FileText, CheckCircle, XCircle } from 'lucide-react';

const EvaluationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        setLoading(true);
        // Simulate API call
        const mockEvaluation = {
          id: parseInt(id),
          examTitle: 'JavaScript Fundamentals Test',
          candidateName: 'John Doe',
          candidateEmail: 'john.doe@example.com',
          candidatePhone: '+1 (555) 123-4567',
          submittedAt: '2025-06-01T10:30:00Z',
          duration: '45 minutes',
          status: 'pending',
          totalQuestions: 5,
          answers: [
            {
              id: 1,
              question: 'What is the difference between let and var in JavaScript?',
              type: 'text',
              answer: 'The main differences are scope and hoisting. let has block scope while var has function scope. let variables are not hoisted, while var variables are hoisted.',
              points: 0,
              maxPoints: 5,
              feedback: ''
            },
            {
              id: 2,
              question: 'Explain event bubbling in JavaScript.',
              type: 'text',
              answer: 'Event bubbling is when an event starts from the most specific element and bubbles up to the least specific element in the DOM hierarchy.',
              points: 0,
              maxPoints: 5,
              feedback: ''
            },
            {
              id: 3,
              question: 'What is a closure in JavaScript?',
              type: 'text',
              answer: 'A closure is a function that has access to variables in its outer scope even after the outer function has returned.',
              points: 0,
              maxPoints: 5,
              feedback: ''
            },
            {
              id: 4,
              question: 'Which of the following is NOT a JavaScript data type?',
              type: 'multiple_choice',
              options: ['string', 'boolean', 'integer', 'undefined'],
              answer: 'integer',
              correctAnswer: 'integer',
              points: 0,
              maxPoints: 3,
              feedback: ''
            },
            {
              id: 5,
              question: 'What does "this" keyword refer to in JavaScript?',
              type: 'text',
              answer: 'The "this" keyword refers to the object that the function is called on, or the global object if not called on any specific object.',
              points: 0,
              maxPoints: 4,
              feedback: ''
            }
          ]
        };

        setTimeout(() => {
          setEvaluation(mockEvaluation);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching evaluation:', error);
        setLoading(false);
      }
    };

    fetchEvaluation();
  }, [id]);

  const updateAnswerPoints = (answerId, points, feedback) => {
    setEvaluation(prev => ({
      ...prev,
      answers: prev.answers.map(answer =>
        answer.id === answerId
          ? { ...answer, points: parseFloat(points) || 0, feedback }
          : answer
      )
    }));
  };

  const calculateTotalScore = () => {
    const totalPoints = evaluation.answers.reduce((sum, answer) => sum + answer.points, 0);
    const maxPoints = evaluation.answers.reduce((sum, answer) => sum + answer.maxPoints, 0);
    return Math.round((totalPoints / maxPoints) * 100);
  };

  const handleSaveEvaluation = async () => {
    try {
      setSaving(true);
      // Simulate API call to save evaluation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setEvaluation(prev => ({ ...prev, status: 'evaluated' }));
      alert('Evaluation saved successfully!');
    } catch (error) {
      console.error('Error saving evaluation:', error);
      alert('Error saving evaluation. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!evaluation) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Evaluation not found.</p>
        <button
          onClick={() => navigate('/admin/evaluations')}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Back to Evaluations
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/evaluations')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Evaluation Details</h1>
        </div>
        <div className="flex space-x-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            evaluation.status === 'evaluated' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {evaluation.status === 'evaluated' ? 'Evaluated' : 'Pending'}
          </span>
        </div>
      </div>

      {/* Candidate & Exam Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Candidate Information</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-gray-900">{evaluation.candidateName}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-gray-600">{evaluation.candidateEmail}</span>
            </div>
            {evaluation.candidatePhone && (
              <div className="flex items-center">
                <span className="text-gray-400 mr-3">📞</span>
                <span className="text-gray-600">{evaluation.candidatePhone}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Exam Information</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-gray-900">{evaluation.examTitle}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-gray-600">Submitted: {formatDate(evaluation.submittedAt)}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 mr-3">⏱️</span>
              <span className="text-gray-600">Duration: {evaluation.duration}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 mr-3">📝</span>
              <span className="text-gray-600">{evaluation.totalQuestions} questions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Score Summary */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Score Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{calculateTotalScore()}%</div>
            <div className="text-sm text-blue-600">Overall Score</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {evaluation.answers.reduce((sum, answer) => sum + answer.points, 0)}
            </div>
            <div className="text-sm text-green-600">Points Earned</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-600">
              {evaluation.answers.reduce((sum, answer) => sum + answer.maxPoints, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Points</div>
          </div>
        </div>
      </div>

      {/* Answers */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Answers</h2>
        <div className="space-y-8">
          {evaluation.answers.map((answer, index) => (
            <div key={answer.id} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-base font-medium text-gray-900">
                  Question {index + 1}: {answer.question}
                </h3>
                <span className="text-sm text-gray-500">
                  Max: {answer.maxPoints} points
                </span>
              </div>

              {answer.type === 'multiple_choice' && answer.options && (
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-2">Options:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {answer.options.map((option, optIndex) => (
                      <li key={optIndex} className={
                        option === answer.correctAnswer ? 'text-green-600 font-medium' : ''
                      }>
                        {option} {option === answer.correctAnswer && '(Correct)'}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Candidate's Answer:</p>
                <p className="text-gray-900">{answer.answer}</p>
                {answer.type === 'multiple_choice' && (
                  <div className="mt-2 flex items-center">
                    {answer.answer === answer.correctAnswer ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${
                      answer.answer === answer.correctAnswer ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {answer.answer === answer.correctAnswer ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Points Awarded
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={answer.maxPoints}
                    step="0.5"
                    value={answer.points}
                    onChange={(e) => updateAnswerPoints(answer.id, e.target.value, answer.feedback)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Feedback (Optional)
                  </label>
                  <textarea
                    value={answer.feedback}
                    onChange={(e) => updateAnswerPoints(answer.id, answer.points, e.target.value)}
                    rows="2"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add feedback for the candidate..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveEvaluation}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-md font-medium flex items-center"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            'Save Evaluation'
          )}
        </button>
      </div>
    </div>
  );
};

export default EvaluationDetailPage;