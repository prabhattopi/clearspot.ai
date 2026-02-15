import { useState, useEffect } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import type { Alarm } from '../types/alarm';
import { AlertTriangle, CheckCircle, Wifi, WifiOff } from 'lucide-react';
import { clsx } from 'clsx'; // Utility for conditional classes

// Mock WebSocket URL (Replace with real one in production)
const WS_URL = 'wss://api.mock-clearspot.ai/ws/alarms';

export const LiveAlarmDashboard = () => {
  const { isConnected, lastMessage } = useWebSocket<{ event: string, data: Alarm }>(WS_URL);
  const [alarms, setAlarms] = useState<Alarm[]>([]);

  // Task 2.2: Handle incoming messages
  useEffect(() => {
    if (lastMessage && lastMessage.event === 'alarm.created') {
      const newAlarm = lastMessage.data;
      
      // Add new alarm to the top of the list
      setAlarms((prev:any) => [
        { ...newAlarm, timestamp: Date.now() }, 
        ...prev
      ]);
    }
  }, [lastMessage]);

  // Helper function for severity colors
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 border-red-500 text-red-700';
      case 'high': return 'bg-orange-100 border-orange-500 text-orange-800';
      case 'medium': return 'bg-yellow-50 border-yellow-400 text-yellow-800';
      default: return 'bg-gray-50 border-gray-300 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 max-w-2xl">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <AlertTriangle className="text-red-500" />
          Live Alarms
        </h2>
        
        {/* Connection Status Indicator */}
        <div className={clsx(
          "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium",
          isConnected ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        )}>
          {isConnected ? <Wifi size={16} /> : <WifiOff size={16} />}
          {isConnected ? 'Live Stream Active' : 'Disconnected'}
        </div>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {alarms.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <CheckCircle className="mx-auto mb-2 h-10 w-10 opacity-50" />
            <p>System Normal. No active alarms.</p>
          </div>
        ) : (
          alarms.map((alarm) => (
            <div 
              key={alarm.id}
              className={clsx(
                "p-4 border-l-4 rounded shadow-sm animate-in fade-in slide-in-from-top-2 duration-300",
                getSeverityColor(alarm.severity)
              )}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold">{alarm.message}</h4>
                  <p className="text-xs opacity-75 mt-1">
                    Site: {alarm.siteId} | ID: {alarm.id}
                  </p>
                </div>
                <span className="text-xs font-mono bg-white/50 px-2 py-1 rounded">
                  {new Date(alarm.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};