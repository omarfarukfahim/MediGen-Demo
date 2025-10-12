
import React from 'react';
import { FORUM_TOPICS } from '../constants';

const categoryColors: { [key: string]: string } = {
  'Mental Health': 'bg-blue-100 text-blue-800',
  'Nutrition': 'bg-green-100 text-green-800',
  'Fitness': 'bg-purple-100 text-purple-800',
};

export const ForumPage: React.FC = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Community Forum</h1>
        <p className="text-gray-600">Join the conversation. Share, learn, and connect.</p>
      </div>
      <button className="px-6 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors self-start sm:self-center">
        Start New Discussion
      </button>
    </div>
    
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Topic
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Replies
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Activity
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {FORUM_TOPICS.map((topic) => (
              <tr key={topic.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-800 hover:text-teal-700 cursor-pointer">{topic.title}</div>
                  <div className="text-xs text-gray-500">by {topic.author} &bull; {topic.time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[topic.category] || 'bg-gray-100 text-gray-800'}`}>
                    {topic.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                  {topic.replies}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {topic.lastActivity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
