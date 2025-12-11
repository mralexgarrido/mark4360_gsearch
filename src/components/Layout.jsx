import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Target, Megaphone, CheckCircle, HelpCircle } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/campaign', label: 'Campaign', icon: LayoutDashboard },
    { path: '/targeting', label: 'Targeting', icon: Target },
    { path: '/ads', label: 'Ads', icon: Megaphone },
    { path: '/review', label: 'Review', icon: CheckCircle },
  ];

  return (
    <div className="flex h-screen bg-google-bg overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col z-10">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <img
            src="https://www.gstatic.com/android/keyboard/image_search/google_logo.png"
            alt="Google"
            className="h-6 mr-2 opacity-80"
            style={{filter: 'grayscale(100%)'}}
          />
          <span className="text-gray-600 font-medium text-lg">Ads Simulator</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-google-blue border-r-4 border-google-blue'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-google-blue' : 'text-gray-400'}`} />
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center text-xs text-gray-500">
            <HelpCircle className="w-4 h-4 mr-2" />
            <span>Educational Mode</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-0">
          <h2 className="text-xl text-gray-800 font-normal">
            {navItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
          </h2>
          <div className="text-sm text-gray-500">
            MARK 4360 Class Project
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-4xl mx-auto pb-20">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
