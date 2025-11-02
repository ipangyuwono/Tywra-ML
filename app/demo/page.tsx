'use client';

import { useState } from 'react';
import { Brain, Loader2, CheckCircle } from 'lucide-react';

export default function DemoPage() {
  const [inputText, setInputText] = useState('');
  const [inputNumber, setInputNumber] = useState('');
  const [prediction, setPrediction] = useState<string | number | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [modelType, setModelType] = useState('sentiment');

  // Simulated model prediction
  const handlePredict = async () => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (modelType === 'sentiment') {
      // Sentiment analysis simulation
      const sentiment = Math.random() > 0.5 ? 'Positive' : 'Negative';
      const conf = Math.random() * 0.3 + 0.7; // 70–100%
      setPrediction(sentiment);
      setConfidence(conf);
    } else if (modelType === 'classification') {
      // Classification simulation
      const classes = ['Cat', 'Dog', 'Bird', 'Rabbit'];
      const randomClass = classes[Math.floor(Math.random() * classes.length)];
      const conf = Math.random() * 0.2 + 0.8; // 80–100%
      setPrediction(randomClass);
      setConfidence(conf);
    } else {
      // Regression simulation
      const value = parseFloat(inputNumber) * 2.5 + Math.random() * 10;
      setPrediction(parseFloat(value.toFixed(2)));
      setConfidence(0.95);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Brain className="h-16 w-16 text-yellow-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Model Demo / Interactive AI
          </h1>
          <p className="text-gray-300 text-lg">
            Explore and interact directly with machine learning models
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-6">Input & Configuration</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Select Model</label>
                <select
                  value={modelType}
                  onChange={(e) => {
                    setModelType(e.target.value);
                    setPrediction(null);
                    setConfidence(null);
                  }}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
                >
                  <option value="sentiment">Sentiment Analysis</option>
                  <option value="classification">Image Classification</option>
                  <option value="regression">Price Prediction (Regression)</option>
                </select>
              </div>

              {modelType === 'regression' ? (
                <div>
                  <label className="block text-gray-300 mb-2">Numeric Input</label>
                  <input
                    type="number"
                    value={inputNumber}
                    onChange={(e) => setInputNumber(e.target.value)}
                    placeholder="Enter a numeric value..."
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-gray-300 mb-2">
                    {modelType === 'sentiment' ? 'Enter Text' : 'Image URL'}
                  </label>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={
                      modelType === 'sentiment'
                        ? 'Enter text for sentiment analysis...'
                        : 'Enter an image URL or description...'
                    }
                    rows={6}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 resize-none"
                  />
                </div>
              )}

              <button
                onClick={handlePredict}
                disabled={loading || (modelType === 'regression' ? !inputNumber : !inputText)}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Brain className="h-5 w-5" />
                    <span>Predict</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-6">Prediction Result</h2>
            
            {prediction !== null ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg p-6 border border-purple-500/30">
                  <div className="flex items-center space-x-2 mb-4">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                    <span className="text-gray-300">Prediction Successful</span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {typeof prediction === 'string' ? prediction : prediction.toFixed(2)}
                  </div>
                  {confidence !== null && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-300 mb-2">
                        <span>Confidence Score</span>
                        <span>{(confidence * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${confidence * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-2">Model Explanation</h3>
                  <p className="text-gray-300 text-sm">
                    {modelType === 'sentiment'
                      ? 'This model uses deep learning to analyze the sentiment of input text. The output indicates whether the text expresses a positive or negative sentiment.'
                      : modelType === 'classification'
                      ? 'The classification model uses a Convolutional Neural Network (CNN) to categorize images into appropriate classes.'
                      : 'The regression model applies a trained linear regression algorithm to predict numerical values based on input data.'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-gray-400">
                <Brain className="h-16 w-16 mb-4 opacity-50" />
                <p>Enter data and click &quot;Predict&quot; to view results</p>
              </div>
            )}
          </div>
        </div>

        {/* Model Information */}
        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-semibold text-white mb-4">Model Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Model Type</div>
              <div className="text-lg font-semibold text-white">
                {modelType === 'sentiment' ? 'NLP' : modelType === 'classification' ? 'CNN' : 'Regression'}
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Training Accuracy</div>
              <div className="text-lg font-semibold text-white">
                {(Math.random() * 0.15 + 0.85).toFixed(2)}
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Status</div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-lg font-semibold text-white">Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  