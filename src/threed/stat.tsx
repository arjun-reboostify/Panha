import React, { useState, useEffect } from 'react';
import { noterFirestore } from '../firebase/index';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface UserData {
  name: string;
  email: string;
  message: string;
  preference: string;
  category: string;
  createdAt: {
    toDate: () => Date;
  };
}

interface ChartData {
  name: string;
  count: number;
}

const PreferenceStats: React.FC = () => {
  const [preferenceStats, setPreferenceStats] = useState<ChartData[]>([]);
  const [categoryStats, setCategoryStats] = useState<ChartData[]>([]);
  const [userData, setUserData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const preferenceLabels: { [key: string]: string } = {
    'breakup_trauma': 'Breakup trauma or toxic relationship',
    'financial_burden': 'Financial burden',
    'family_disputes': 'Family disputes',
    'harassment': 'Harassment or stalking related',
    'lonely_overthinking': 'Lonely and overthinking',
    'academics': 'Academics',
    'other': 'Other',
  };

  const categoryLabels: { [key: string]: string } = {
    'personal': 'Request for advice',
    'business': 'Rant',
    'education': 'Confession',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const submissionsRef = noterFirestore.collection('submissions');
        const snapshot = await submissionsRef.orderBy('createdAt', 'desc').get();
        
        const preferences: { [key: string]: number } = {};
        const categories: { [key: string]: number } = {};
        const users: UserData[] = [];
        
        snapshot.forEach(doc => {
          const data = doc.data() as UserData;
          if (data.preference) {
            preferences[data.preference] = (preferences[data.preference] || 0) + 1;
          }
          if (data.category) {
            categories[data.category] = (categories[data.category] || 0) + 1;
          }
          users.push(data);
        });

        const formattedPreferenceStats = Object.entries(preferences).map(([key, value]) => ({
          name: preferenceLabels[key] || key,
          count: value
        }));

        const formattedCategoryStats = Object.entries(categories).map(([key, value]) => ({
          name: categoryLabels[key] || key,
          count: value
        }));

        setPreferenceStats(formattedPreferenceStats);
        setCategoryStats(formattedCategoryStats);
        setUserData(users);
      } catch (err) {
        setError('Failed to fetch data: ' + (err as Error).message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderBarChart = (data: ChartData[], title: string) => (
    <div className="mb-12">
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="name"
              tick={{ fill: '#9CA3AF' }}
              angle={-45}
              textAnchor="end"
              height={100}
            />
            <YAxis tick={{ fill: '#9CA3AF' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
              labelStyle={{ color: '#fff' }}
              itemStyle={{ color: '#10B981' }}
            />
            <Bar dataKey="count" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
        <p className="text-white">Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Application Usage Statistics</h2>
      
      {/* Preference Statistics Chart */}
      {renderBarChart(preferenceStats, "Application Type Preferences")}

      {/* Category Statistics Chart */}
      {renderBarChart(categoryStats, "Usage Categories")}

      {/* User Registry Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4">User Registry</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  preference
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                other
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
           type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Message
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {userData.map((user, index) => (
                <tr key={index} className="hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {user.createdAt.toDate().toLocaleDateString()}
                  </td>
                 
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {user.email}
                  </td>
                
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {categoryLabels[user.category] || user.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {preferenceLabels[user.preference] || user.preference}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    <div className="max-w-xs truncate">
                      {user.message}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PreferenceStats;