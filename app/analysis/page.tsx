'use client';

import { useState } from 'react';
import { FileText, Download, BarChart3, TrendingUp, CheckCircle, FileJson, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function AnalysisPage() {
  const [predictions, setPredictions] = useState<Array<{
    id: number;
    input: string;
    prediction: string | number;
    confidence: number;
    timestamp: string;
  }>>([]);

  // Generate sample predictions
  const generateSampleData = () => {
    const sampleData = [];
    const classes = ['Positif', 'Negatif', 'Netral'];
    for (let i = 1; i <= 10; i++) {
      sampleData.push({
        id: i,
        input: `Sample input data ${i}`,
        prediction: classes[Math.floor(Math.random() * classes.length)],
        confidence: Math.random() * 0.3 + 0.7,
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      });
    }
    setPredictions(sampleData);
  };

  const exportToCSV = () => {
    const csv = [
      ['ID', 'Input', 'Prediction', 'Confidence', 'Timestamp'],
      ...predictions.map(p => [
        p.id,
        p.input,
        p.prediction,
        (p.confidence * 100).toFixed(2) + '%',
        p.timestamp,
      ]),
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Tywra-predictions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    const json = JSON.stringify(predictions, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Tywra-predictions-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      predictions.map(p => ({
        ID: p.id,
        Input: p.input,
        Prediction: p.prediction,
        Confidence: `${(p.confidence * 100).toFixed(2)}%`,
        Timestamp: p.timestamp,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Predictions');
    XLSX.writeFile(wb, `Tywra-predictions-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const generateReport = () => {
    if (predictions.length === 0) return '';

    const total = predictions.length;
    const avgConfidence = predictions.reduce((sum, p) => sum + p.confidence, 0) / total;
    const predictionCounts: { [key: string]: number } = {};
    
    predictions.forEach(p => {
      const pred = String(p.prediction);
      predictionCounts[pred] = (predictionCounts[pred] || 0) + 1;
    });

    const mostCommon = Object.entries(predictionCounts)
      .sort(([, a], [, b]) => b - a)[0];

    return `
Tywra ML - Model Prediction Report
=====================================

Tanggal: ${new Date().toLocaleDateString('id-ID')}
Total Prediksi: ${total}

Statistik:
----------
Rata-rata Confidence: ${(avgConfidence * 100).toFixed(2)}%
Prediksi Paling Umum: ${mostCommon[0]} (${mostCommon[1]} kali)

Distribusi Prediksi:
-------------------
${Object.entries(predictionCounts)
  .map(([pred, count]) => `${pred}: ${count} (${((count / total) * 100).toFixed(1)}%)`)
  .join('\n')}

Detail Prediksi:
---------------
${predictions.map(p => 
  `ID ${p.id}: ${p.prediction} (${(p.confidence * 100).toFixed(1)}%)`
).join('\n')}
    `.trim();
  };

  const exportReport = () => {
    const report = generateReport();
    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Tywra-report-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Calculate statistics
  const stats = predictions.length > 0 ? {
    total: predictions.length,
    avgConfidence: predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length,
    predictionCounts: predictions.reduce((acc, p) => {
      const pred = String(p.prediction);
      acc[pred] = (acc[pred] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number }),
  } : null;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FileText className="h-16 w-16 text-yellow-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Analysis
          </h1>
          <p className="text-gray-300 text-lg">
            Export prediction results and generate model analysis reports
          </p>
        </div>

        {/* Generate Sample Data */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">Prediction Data</h2>
              <p className="text-gray-300">
                {predictions.length === 0 
                  ? 'There is no prediction data yet. Generate sample data to view the reporting feature.'

                  : `${predictions.length} prediksi tersedia untuk dianalisis`}
              </p>
            </div>
            <button
              onClick={generateSampleData}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center space-x-2"
            >
              <TrendingUp className="h-5 w-5" />
              <span>Generate Sample Data</span>
            </button>
          </div>
        </div>

        {predictions.length > 0 && stats && (
          <>
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <BarChart3 className="h-8 w-8 text-blue-400" />
                  <div>
                    <div className="text-sm text-gray-400">Total Predictions</div>
                    <div className="text-3xl font-bold text-white">{stats.total}</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="h-8 w-8 text-green-400" />
                  <div>
                    <div className="text-sm text-gray-400">Avg Confidence</div>
                    <div className="text-3xl font-bold text-white">
                      {(stats.avgConfidence * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircle className="h-8 w-8 text-yellow-400" />
                  <div>
                    <div className="text-sm text-gray-400">Unique Predictions</div>
                    <div className="text-3xl font-bold text-white">
                      {Object.keys(stats.predictionCounts).length}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Prediction Distribution */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Prediction Distribution</h2>
              <div className="space-y-3">
                {Object.entries(stats.predictionCounts)
                  .sort(([, a], [, b]) => b - a)
                  .map(([pred, count]) => {
                    const percentage = (count / stats.total) * 100;
                    return (
                      <div key={pred} className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-300">
                          <span>{pred}</span>
                          <span>{count} ({percentage.toFixed(1)}%)</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Predictions Table */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">List Prediction</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="px-4 py-3 text-white font-semibold">ID</th>
                      <th className="px-4 py-3 text-white font-semibold">Input</th>
                      <th className="px-4 py-3 text-white font-semibold">Prediction</th>
                      <th className="px-4 py-3 text-white font-semibold">Confidence</th>
                      <th className="px-4 py-3 text-white font-semibold">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {predictions.map((pred) => (
                      <tr key={pred.id} className="border-b border-white/10 hover:bg-white/5">
                        <td className="px-4 py-3 text-gray-300">{pred.id}</td>
                        <td className="px-4 py-3 text-gray-300 max-w-xs truncate">{pred.input}</td>
                        <td className="px-4 py-3 text-white font-medium">{pred.prediction}</td>
                        <td className="px-4 py-3 text-gray-300">
                          {(pred.confidence * 100).toFixed(1)}%
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-sm">
                          {new Date(pred.timestamp).toLocaleString('id-ID')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Export Options */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Download className="h-6 w-6 text-yellow-300" />
                <span>Export Data & Report</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={exportToCSV}
                  className="flex flex-col items-center space-y-2 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all"
                >
                  <FileSpreadsheet className="h-8 w-8" />
                  <span className="font-semibold">Export CSV</span>
                </button>
                <button
                  onClick={exportToJSON}
                  className="flex flex-col items-center space-y-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all"
                >
                  <FileJson className="h-8 w-8" />
                  <span className="font-semibold">Export JSON</span>
                </button>
                <button
                  onClick={exportToExcel}
                  className="flex flex-col items-center space-y-2 px-6 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 transition-all"
                >
                  <FileSpreadsheet className="h-8 w-8" />
                  <span className="font-semibold">Export Excel</span>
                </button>
                <button
                  onClick={exportReport}
                  className="flex flex-col items-center space-y-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  <FileText className="h-8 w-8" />
                  <span className="font-semibold">Export Report</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}



