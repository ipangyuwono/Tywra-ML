'use client';

import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart3, TrendingUp, Activity } from 'lucide-react';

export default function VisualizationPage() {
  // Sample data untuk accuracy dan loss
  const [epochs] = useState([...Array(20)].map((_, i) => i + 1));
  const accuracyData = epochs.map(epoch => ({
    epoch,
    training: 0.5 + (epoch / 20) * 0.4 + Math.random() * 0.05,
    validation: 0.5 + (epoch / 20) * 0.35 + Math.random() * 0.05,
  }));

  const lossData = epochs.map(epoch => ({
    epoch,
    training: 1.5 - (epoch / 20) * 1.2 + Math.random() * 0.1,
    validation: 1.5 - (epoch / 20) * 1.1 + Math.random() * 0.1,
  }));

  // Confusion Matrix data
  const confusionMatrix = [
    { name: 'Kucing', TP: 85, FN: 10, FP: 5, TN: 100 },
    { name: 'Anjing', TP: 90, FN: 5, FP: 8, TN: 97 },
    { name: 'Burung', TP: 78, FN: 12, FP: 10, TN: 100 },
    { name: 'Kelinci', TP: 88, FN: 7, FP: 6, TN: 99 },
  ];

  // PCA data
  const pcaData = [...Array(100)].map(() => ({
    pc1: (Math.random() - 0.5) * 10,
    pc2: (Math.random() - 0.5) * 10,
    class: Math.floor(Math.random() * 4),
  }));

  // Distribution data
  const distributionData = [
    { range: '0-10', count: 12 },
    { range: '10-20', count: 28 },
    { range: '20-30', count: 45 },
    { range: '30-40', count: 38 },
    { range: '40-50', count: 32 },
    { range: '50-60', count: 25 },
    { range: '60-70', count: 18 },
    { range: '70-80', count: 12 },
  ];

  const getConfusionMatrixColor = (value: number, type: string) => {
    const max = Math.max(...confusionMatrix.map(m => Math.max(m.TP, m.TN, m.FP, m.FN)));
    const intensity = value / max;
    if (type === 'TP' || type === 'TN') {
      return `rgba(34, 197, 94, ${0.3 + intensity * 0.7})`;
    }
    return `rgba(239, 68, 68, ${0.3 + intensity * 0.7})`;
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <BarChart3 className="h-16 w-16 text-yellow-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Visualization Data & Model
          </h1>
          <p className="text-gray-300 text-lg">
            View model performance graphics and data representation interactively
          </p>
        </div>

        {/* Accuracy & Loss Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-6 w-6 text-green-400" />
              <h2 className="text-2xl font-semibold text-white">Model Accuration</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={accuracyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="epoch" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" domain={[0, 1]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#F3F4F6' }}
                />
                <Legend />
                <Line type="monotone" dataKey="training" stroke="#10B981" strokeWidth={2} name="Training" />
                <Line type="monotone" dataKey="validation" stroke="#3B82F6" strokeWidth={2} name="Validation" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="h-6 w-6 text-red-400" />
              <h2 className="text-2xl font-semibold text-white">Loss Function</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lossData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="epoch" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#F3F4F6' }}
                />
                <Legend />
                <Line type="monotone" dataKey="training" stroke="#EF4444" strokeWidth={2} name="Training" />
                <Line type="monotone" dataKey="validation" stroke="#F59E0B" strokeWidth={2} name="Validation" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Confusion Matrix */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Confusion Matrix</h2>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-5 gap-4 min-w-[600px]">
              <div className="font-semibold text-gray-300"></div>
              <div className="text-center font-semibold text-green-400">True Positive</div>
              <div className="text-center font-semibold text-red-400">False Negative</div>
              <div className="text-center font-semibold text-red-400">False Positive</div>
              <div className="text-center font-semibold text-green-400">True Negative</div>
              
              {confusionMatrix.map((item) => (
                <>
                  <div className="font-semibold text-white py-2">{item.name}</div>
                  <div 
                    className="p-4 rounded-lg text-center text-white font-bold"
                    style={{ backgroundColor: getConfusionMatrixColor(item.TP, 'TP') }}
                  >
                    {item.TP}
                  </div>
                  <div 
                    className="p-4 rounded-lg text-center text-white font-bold"
                    style={{ backgroundColor: getConfusionMatrixColor(item.FN, 'FN') }}
                  >
                    {item.FN}
                  </div>
                  <div 
                    className="p-4 rounded-lg text-center text-white font-bold"
                    style={{ backgroundColor: getConfusionMatrixColor(item.FP, 'FP') }}
                  >
                    {item.FP}
                  </div>
                  <div 
                    className="p-4 rounded-lg text-center text-white font-bold"
                    style={{ backgroundColor: getConfusionMatrixColor(item.TN, 'TN') }}
                  >
                    {item.TN}
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>

        {/* PCA & Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">PCA Visualization</h2>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" dataKey="pc1" name="PC1" stroke="#9CA3AF" />
                <YAxis type="number" dataKey="pc2" name="PC2" stroke="#9CA3AF" />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#F3F4F6' }}
                />
                <Scatter name="Data Points" data={pcaData} fill="#8B5CF6" />
              </ScatterChart>
            </ResponsiveContainer>
            <p className="text-gray-400 text-sm mt-4">
              Principal Component Analysis shows the distribution of data in the reduced dimensions
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">Data Distribution</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={distributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="range" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#F3F4F6' }}
                />
                <Bar dataKey="count" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-gray-400 text-sm mt-4">
              Data distribution shows the spread of values in the dataset
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

