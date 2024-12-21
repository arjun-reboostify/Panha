import React, { useState, useEffect } from 'react';
import { noterFirestore } from '../firebase/index';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface UserData {
  name: string;
  no:string;
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
  value: number;
}

const PreferenceStats: React.FC = () => {
  const [preferenceStats, setPreferenceStats] = useState<ChartData[]>([]);
  const [categoryStats, setCategoryStats] = useState<ChartData[]>([]);
  const [userData, setUserData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Vibrant color palette for the pie charts
  const COLORS = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
    '#FFEEAD', '#D4A5A5', '#9B6B6B', '#CE96B4',
    '#4EA5D9', '#FF9F1C', '#2EC4B6', '#E71D36'
  ];

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
          value
        }));

        const formattedCategoryStats = Object.entries(categories).map(([key, value]) => ({
          name: categoryLabels[key] || key,
          value
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

  const renderPieChart = (data: ChartData[], title: string) => (
    <div className="mb-12">
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={140}
              paddingAngle={5}
              dataKey="value"
              label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
              labelLine={{ stroke: '#ffffff', strokeWidth: 0.5 }}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  stroke="#1F2937"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: 'none',
                borderRadius: '8px',
                padding: '10px'
              }}
              itemStyle={{ color: '#ffffff' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => (
                <span style={{ color: '#9CA3AF' }}>{value}</span>
              )}
            />
          </PieChart>
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
      <h2 className="text-2xl font-bold text-white mb-6">User Statistics</h2>
      
      {/* Preference Statistics Pie Chart */}
      {renderPieChart(preferenceStats, "Problem Preferences")}

      {/* Category Statistics Pie Chart */}
      {renderPieChart(categoryStats, "Types of Submissions")}

      {/* User Registry Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4">User Data (Scroll Right)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Phone No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">problem</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Other</th>
               
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {userData.map((user, index) => (
                <tr key={index} className="hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {user.createdAt.toDate().toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.no}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {categoryLabels[user.category] || user.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {preferenceLabels[user.preference] || user.preference}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.name}</td>
            
                  <td className="px-6 py-4 text-sm text-gray-300">
                    <div className="max-w-xs truncate">{user.message}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {userData.map((user, index) => (
  <div key={index} className="px-6 py-4 text-2xl text-gray-300 max-h-40 overflow-y-auto">
    <div className="whitespace-pre-wrap break-words">{user.message}</div>
  </div>
))}
        </div>
      </div>
    </div>
  );
};

export default PreferenceStats;