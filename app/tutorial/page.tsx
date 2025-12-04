'use client';

import { useState } from 'react';
import { BookOpen, Code, ExternalLink, ChevronRight, Brain, Database, TrendingUp, Zap } from 'lucide-react';

export default function TutorialPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const tutorials = [
    {
      id: 'intro',
      title: 'Introduction to Machine Learning',
      icon: Brain,
      content: `
        <h3 class="text-xl font-semibold text-white mb-4">What is Machine Learning?</h3>
        <p class="text-gray-300 mb-4">
          Machine Learning is a branch of Artificial Intelligence (AI) that allows computers
          to learn from data without being explicitly programmed. ML systems use statistical
          algorithms to identify patterns in data and make predictions or decisions.
        </p>
        <h4 class="text-lg font-semibold text-yellow-300 mb-2">Types of Machine Learning:</h4>
        <ul class="list-disc list-inside text-gray-300 space-y-2 mb-4">
          <li><strong>Supervised Learning:</strong> Learns from labeled data</li>
          <li><strong>Unsupervised Learning:</strong> Finds hidden patterns in unlabeled data</li>
          <li><strong>Reinforcement Learning:</strong> Learns through trial and error with rewards</li>
        </ul>
      `,
      code: `
# Example of Supervised Learning with Scikit-learn
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

# Load dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Prediction
predictions = model.predict(X_test)

# Evaluation
mse = mean_squared_error(y_test, predictions)
print(f"Mean Squared Error: {mse}")
      `,
    },
    {
      id: 'algorithms',
      title: 'Popular ML Algorithms',
      icon: TrendingUp,
      content: `
        <h3 class="text-xl font-semibold text-white mb-4">Machine Learning Algorithms</h3>
        <div class="space-y-4">
          <div class="bg-white/5 rounded-lg p-4">
            <h4 class="text-lg font-semibold text-yellow-300 mb-2">1. Linear Regression</h4>
            <p class="text-gray-300">
              Used to predict continuous values. Suitable for problems like house price or sales prediction.
            </p>
          </div>
          <div class="bg-white/5 rounded-lg p-4">
            <h4 class="text-lg font-semibold text-yellow-300 mb-2">2. Decision Tree</h4>
            <p class="text-gray-300">
              Makes decisions based on if-else rules. Easy to interpret and suitable for both classification and regression.
            </p>
          </div>
          <div class="bg-white/5 rounded-lg p-4">
            <h4 class="text-lg font-semibold text-yellow-300 mb-2">3. Random Forest</h4>
            <p class="text-gray-300">
              An ensemble of many decision trees. More robust and accurate than a single tree.
            </p>
          </div>
          <div class="bg-white/5 rounded-lg p-4">
            <h4 class="text-lg font-semibold text-yellow-300 mb-2">4. Neural Networks</h4>
            <p class="text-gray-300">
              Mimics how the human brain works. Very powerful for complex problems such as image recognition and NLP.
            </p>
          </div>
        </div>
      `,
      code: `
# Decision Tree Classifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import load_iris

# Load data
iris = load_iris()
X, y = iris.data, iris.target

# Train model
clf = DecisionTreeClassifier(max_depth=3)
clf.fit(X, y)

# Prediction
new_sample = [[5.1, 3.5, 1.4, 0.2]]
prediction = clf.predict(new_sample)
print(f"Predicted class: {iris.target_names[prediction[0]]}")
      `,
    },
    {
      id: 'preprocessing',
      title: 'Data Preprocessing',
      icon: Database,
      content: `
        <h3 class="text-xl font-semibold text-white mb-4">Data Preprocessing</h3>
        <p class="text-gray-300 mb-4">
          Preprocessing is an essential step before training an ML model. Clean and well-structured data
          leads to better model performance.
        </p>
        <h4 class="text-lg font-semibold text-yellow-300 mb-2">Preprocessing Steps:</h4>
        <ul class="list-disc list-inside text-gray-300 space-y-2">
          <li><strong>Handling Missing Values:</strong> Fill or remove missing data</li>
          <li><strong>Encoding Categorical Data:</strong> Convert categories into numeric form</li>
          <li><strong>Feature Scaling:</strong> Normalize or standardize features</li>
          <li><strong>Feature Selection:</strong> Choose the most relevant features</li>
          <li><strong>Train-Test Split:</strong> Split data for training and testing</li>
        </ul>
      `,
      code: `
# Data Preprocessing Pipeline
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.impute import SimpleImputer
import pandas as pd

# Load data
df = pd.read_csv('data.csv')

# Handle missing values
imputer = SimpleImputer(strategy='mean')
df_numeric = imputer.fit_transform(df.select_dtypes(include=['float64', 'int64']))

# Encode categorical
le = LabelEncoder()
df['category_encoded'] = le.fit_transform(df['category'])

# Scale features
scaler = StandardScaler()
df_scaled = scaler.fit_transform(df_numeric)

print("Data preprocessing complete!")
      `,
    },
    {
      id: 'evaluation',
      title: 'Model Evaluation',
      icon: Zap,
      content: `
        <h3 class="text-xl font-semibold text-white mb-4">Evaluating Machine Learning Models</h3>
        <p class="text-gray-300 mb-4">
          Model evaluation is important to understand how well your model performs. 
          Different metrics are used for classification and regression tasks.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white/5 rounded-lg p-4">
            <h4 class="text-lg font-semibold text-yellow-300 mb-2">Classification</h4>
            <ul class="text-gray-300 text-sm space-y-1">
              <li>• Accuracy</li>
              <li>• Precision & Recall</li>
              <li>• F1-Score</li>
              <li>• Confusion Matrix</li>
              <li>• ROC-AUC</li>
            </ul>
          </div>
          <div class="bg-white/5 rounded-lg p-4">
            <h4 class="text-lg font-semibold text-yellow-300 mb-2">Regression</h4>
            <ul class="text-gray-300 text-sm space-y-1">
              <li>• Mean Squared Error (MSE)</li>
              <li>• Root MSE (RMSE)</li>
              <li>• Mean Absolute Error (MAE)</li>
              <li>• R² Score</li>
            </ul>
          </div>
        </div>
      `,
      code: `
# Model Evaluation
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# For Classification
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.2%}")

print("\\nClassification Report:")
print(classification_report(y_test, y_pred))

print("\\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))
      `,
    },
  ];

  const externalResources = [
    {
      title: 'Jupyter Notebook',
      description: 'Create interactive notebooks for ML experimentation',
      link: 'https://jupyter.org',
      icon: ExternalLink,
    },
    {
      title: 'Google Colab',
      description: 'Free Python notebooks in the cloud',
      link: 'https://colab.research.google.com',
      icon: ExternalLink,
    },
    {
      title: 'Kaggle Learn',
      description: 'Free ML tutorials from Kaggle',
      link: 'https://www.kaggle.com/learn',
      icon: ExternalLink,
    },
    {
      title: 'Scikit-learn Docs',
      description: 'Complete documentation for the Python ML library',
      link: 'https://scikit-learn.org',
      icon: ExternalLink,
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <BookOpen className="h-16 w-16 text-yellow-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tutorials & Education
          </h1>
          <p className="text-gray-300 text-lg">
            Learn machine learning concepts and algorithms through interactive explanations
          </p>
        </div>

        {/* Tutorial Sections */}
        <div className="space-y-6 mb-12">
          {tutorials.map((tutorial) => {
            const Icon = tutorial.icon;
            const isExpanded = expandedSection === tutorial.id;
            return (
              <div
                key={tutorial.id}
                className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedSection(isExpanded ? null : tutorial.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <Icon className="h-6 w-6 text-yellow-300" />
                    <h2 className="text-2xl font-semibold text-white">{tutorial.title}</h2>
                  </div>
                  <ChevronRight
                    className={`h-6 w-6 text-gray-400 transition-transform ${
                      isExpanded ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {isExpanded && (
                  <div className="px-6 py-6 border-t border-white/10">
                    <div
                      className="prose prose-invert max-w-none mb-6"
                      dangerouslySetInnerHTML={{ __html: tutorial.content }}
                    />
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <div className="flex items-center justify-between mb-2">
                        <Code className="h-5 w-5 text-gray-400" />
                        <span className="text-sm text-gray-400">Python Code Example</span>
                      </div>
                      <pre className="text-sm text-green-300 font-mono">
                        <code>{tutorial.code}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* External Resources */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center space-x-2">
            <ExternalLink className="h-6 w-6 text-yellow-300" />
            <span>External Resources & Tools</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {externalResources.map((resource, index) => {
              const ResourceIcon = resource.icon;
              return (
                <a
                  key={index}
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 hover:border-yellow-300/50 transition-all group"
                >
                  <div className="flex items-start space-x-3">
                    <ResourceIcon className="h-6 w-6 text-yellow-300 mt-1 group-hover:scale-110 transition-transform" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-yellow-300 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-gray-300 text-sm">{resource.description}</p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Interactive Notebook Section */}
        <div className="mt-8 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-6 border border-purple-500/30">
          <h2 className="text-2xl font-semibold text-white mb-4">Interactive Notebook</h2>
          <p className="text-gray-300 mb-4">
            Use external notebook platforms for more advanced ML experiments:
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://colab.research.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center space-x-2"
            >
              <ExternalLink className="h-5 w-5" />
              <span>Open Google Colab</span>
            </a>
            <a
              href="https://jupyter.org/try"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 transition-all flex items-center space-x-2"
            >
              <ExternalLink className="h-5 w-5" />
              <span>Open Jupyter</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


