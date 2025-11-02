import Link from 'next/link';
import { Brain, BarChart3, Database, BookOpen, FileText, Sparkles, ArrowRight, Zap } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Brain,
      title: 'Model Demo / Interactive AI',
      description: 'Explore and interact directly with pre-trained machine learning models',
      href: '/demo',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: BarChart3,
      title: 'Data & Model Visualization',
      description: 'View model performance graphs (accuracy, loss, confusion matrix) and data visualization (distribution, PCA)',
      href: '/visualization',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Database,
      title: 'Dataset Management',
      description: 'Upload, preview, clean, and label data directly on the web',
      href: '/dataset',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: BookOpen,
      title: 'Tutorial & Education',
      description: 'Learn ML concepts and algorithms with interactive explanations and integrated notebooks',
      href: '/tutorial',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: FileText,
      title: 'Analysis & Reporting',
      description: 'Export prediction results and generate analytical model reports',
      href: '/analysis',
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Sparkles className="h-16 w-16 text-yellow-300 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
            Tywra ML Platform
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            An interactive and easy-to-use ML & experimentation platform
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/demo"
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Zap className="h-5 w-5" />
              <span>Try Demo</span>
            </Link>
            <Link
              href="/tutorial"
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl"
            >
              <BookOpen className="h-5 w-5" />
              <span>View Tutorial</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Main Features</h2>
            <p className="text-gray-400 text-lg">Explore all the capabilities on this platform</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  href={feature.href}
                  className="group relative bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-105"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-yellow-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{feature.description}</p>
                  <div className="flex items-center text-yellow-300 group-hover:text-yellow-200">
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
