import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar, Award, FileText, Clock, TrendingUp } from 'lucide-react';

const CandidateDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);
  const [examHistory, setExamHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidateDetails = async () => {
      try {
        setLoading(true);
        // Simulate API call for candidate details
        const mockCandidate = {
          id: parseInt(id),
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+1 (555) 123-4567',
          department: 'Software Engineering',
          position: 'Senior Developer',
          registeredAt: '2025-05-15T10:30:00Z',
          status: 'active',
          address: '123 Main St, New York, NY 10001',
          experience: '5 years',
          education: 'Bachelor of Computer Science',
          skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
          totalExams: 3,
          averageScore: 85.5,
          highestScore: 92,
          lowestScore: 78,
          totalTimeSpent: '4h 30m'
        };

        const mockExamHistory = [
          {
            id: 1,
            examTitle: 'JavaScript Fundamentals Test',
            date: '2025-06-01T14:30:00Z',
            duration: '45 minutes',
            score: 85,
            totalQuestions: 20,
            correctAnswers: 17,
            status: 'completed',
            timeSpent: '42 minutes'
          },
          {
            id: 2,
            examTitle: 'React Development Quiz',
            date: '2025-05-28T11:15:00Z',
            duration: '60 minutes',
            score: 92,
            totalQuestions: 25,
            correctAnswers: 23,
            status: 'completed',
            timeSpent: '55 minutes'
          },
          {
            id: 3,
            examTitle: 'Database Design Test',
            date: '2025-05-20T16:45:00Z',
            duration: '90 minutes',
            score: 78,
            totalQuestions: 30,
            correctAnswers: 23,
            status: 'completed',
            timeSpent: '87 minutes'
          }
        ];

        setTimeout(() => {
          setCandidate(mockCandidate);
          setExamHistory(mockExamHistory);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching candidate details:', error);
        setLoading(false);
      }
    };

    fetchCandidateDetails();
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 80) return 'bg-blue-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Candidate not found.</p>
        <button
          onClick={() => navigate('/admin/candidates')}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Back to Candidates
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
            onClick={() => navigate('/admin/candidates')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Candidate Details</h1>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          candidate.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
        </span>
      </div>

      {/* Candidate Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-2 bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-6">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
              <span className="text-xl font-bold text-white">
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-gray-900">{candidate.name}</h2>
              <p className="text-gray-600">{candidate.position}</p>
              <p className="text-gray-500">{candidate.department}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{candidate.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{candidate.phone}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">Registered: {formatDate(candidate.registeredAt)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Professional Details</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">Experience:</span>
                  <p className="text-gray-900">{candidate.experience}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Education:</span>
                  <p className="text-gray-900">{candidate.education}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Address:</span>
                  <p className="text-gray-900">{candidate.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Card */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Performance Overview</h3>
          
          <div className="space-y-6">
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-6 w-6 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-800">Average Score</span>
              </div>
              <div className="text-3xl font-bold text-blue-600">{candidate.averageScore}%</div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Exams</span>
                <span className="font-medium text-gray-900">{candidate.totalExams}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Highest Score</span>
                <span className={`font-medium ${getScoreColor(candidate.highestScore)}`}>
                  {candidate.highestScore}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Lowest Score</span>
                <span className={`font-medium ${getScoreColor(candidate.lowestScore)}`}>
                  {candidate.lowestScore}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Time Spent</span>
                <span className="font-medium text-gray-900">{candidate.totalTimeSpent}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center text-sm text-gray-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                Performance Trending Up
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exam History */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Exam History</h3>
          <span className="text-sm text-gray-500">{examHistory.length} exams completed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exam
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Questions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Spent
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {examHistory.map((exam) => (
                <tr key={exam.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {exam.examTitle}
                        </div>
                        <div className="text-sm text-gray-500">
                          {exam.status}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(exam.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {exam.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreBgColor(exam.score)} ${getScoreColor(exam.score)}`}>
                        {exam.score}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {exam.correctAnswers}/{exam.totalQuestions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      {exam.timeSpent}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {examHistory.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No exam history</h3>
            <p className="mt-1 text-sm text-gray-500">
              This candidate hasn't taken any exams yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateDetailPage;