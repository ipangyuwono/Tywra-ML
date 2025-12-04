'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brain, Home, BarChart3, Database, BookOpen, FileText, Sparkles } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/demo', label: 'Demo AI', icon: Brain },
    { href: '/visualization', label: 'Visualization', icon: BarChart3 },
    { href: '/dataset', label: 'Dataset', icon: Database },
    { href: '/tutorial', label: 'Tutorial', icon: BookOpen },
    { href: '/analysis', label: 'Analysis', icon: FileText },
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <Sparkles className="h-8 w-8 text-yellow-300 group-hover:animate-pulse" />
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              Tywra ML
            </span>
          </Link>
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-white/20 text-yellow-300 shadow-lg'
                      : 'hover:bg-white/10 hover:text-yellow-200'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}



