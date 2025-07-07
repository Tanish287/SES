import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const EvaluationsPage = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  
  const dispatch = useDispatch();

  useEffect(() => {
    // Simulate API call to fetch evaluations
    const fetchEvaluations = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        const mockEvaluations = [
          {
            id: 1,
            examTitle: 'JavaScript Fundamentals Test',
            candidateName: 'John Doe',
            candidateEmail: 'john@example.com',
            submittedAt: '2025-06-01T10:30:00Z',
            status: 'pending',
            score: null,
            totalQuestions: 20
          },
          {
            id: 2,
            examTitle: 'React Development Quiz',
            candidateName: 'Jane Smith',
            candidateEmail: 'jane@example.com',
            submittedAt: '2025-06-02T14:15:00Z',
            status: 'evaluated',
            score: 85,
            totalQuestions: 15
          },
          {
            id: 3,
            examTitle: 'Database Design Test',
            candidateName: 'Mike Johnson',
            candidateEmail: 'mike@example.com',
            submittedAt: '2025-06-03T09:45:00Z',
            status: 'in_progress',
            score: null,
            totalQuestions: 25
          }
        ];
        
        setTimeout(() => {
          setEvaluations(mockEvaluations);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching evaluations:', error);
        setLoading(false);
      }
    };

    fetchEvaluations();
  }, []);

  const filteredEvaluations = evaluations.filter(evaluation => {
    if (filter === 'all') return true;
    return evaluation.status === filter;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
      evaluated: { color: 'bg-green-100 text-green-800', text: 'Evaluated' },
      in_progress: { color: 'bg-blue-100 text-blue-800', text: 'In Progress' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Evaluations</h1>
        <div className="flex space-x-2">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="evaluated">Evaluated</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exam
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEvaluations.map((evaluation) => (
                <tr key={evaluation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {evaluation.candidateName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {evaluation.candidateName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {evaluation.candidateEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{evaluation.examTitle}</div>
                    <div className="text-sm text-gray-500">{evaluation.totalQuestions} questions</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(evaluation.submittedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(evaluation.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {evaluation.score !== null ? `${evaluation.score}%` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/admin/evaluations/${evaluation.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredEvaluations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No evaluations found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvaluationsPage;