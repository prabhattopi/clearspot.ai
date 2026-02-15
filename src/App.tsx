import { useState } from 'react';
import { SiteList } from './components/SiteList';
import { LiveAlarmDashboard } from './components/LiveAlarmDashboard';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LayoutDashboard, Server } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'sites' | 'alarms'>('sites');

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">ClearSpot.ai <span className="text-gray-400 font-normal">| AgenticMesh</span></h1>
          </div>
          <div className="text-sm text-gray-500">
            Frontend Assessment Stage 2
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-8 max-w-md">
          <button
            onClick={() => setActiveTab('sites')}
            className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all
              ${activeTab === 'sites' 
                ? 'bg-white text-blue-700 shadow' 
                : 'text-gray-600 hover:bg-white/[0.12] hover:text-blue-600'
              }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Server size={18} />
              Site Management
            </div>
          </button>
          <button
            onClick={() => setActiveTab('alarms')}
            className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all
              ${activeTab === 'alarms' 
                ? 'bg-white text-blue-700 shadow' 
                : 'text-gray-600 hover:bg-white/[0.12] hover:text-blue-600'
              }`}
          >
            <div className="flex items-center justify-center gap-2">
              <LayoutDashboard size={18} />
              Live Alarms
            </div>
          </button>
        </div>

        {/* Global Error Boundary Wrap */}
        <ErrorBoundary>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {activeTab === 'sites' ? (
              <div className="lg:col-span-2">
                <SiteList />
              </div>
            ) : (
              <div className="lg:col-span-2">
                <LiveAlarmDashboard />
              </div>
            )}

            {/* Sidebar / Info Panel */}
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="font-semibold text-blue-900 mb-2">Assessment Notes</h3>
                <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
                  <li>API Client with JWT handling implemented.</li>
                  <li>Real-time WebSocket connection active.</li>
                  <li>Optimistic updates on Site Capacity.</li>
                  <li>Global Error Boundary acts as safety net.</li>
                </ul>
              </div>
            </div>
          </div>
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;