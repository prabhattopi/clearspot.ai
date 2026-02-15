import { useState, useEffect, useRef, useCallback } from 'react';
import type { WebSocketMessage, WebSocketHook } from '../types/websocket';

const generateMockAlarm = () => ({
  event: 'alarm.created',
  data: {
    id: `alarm-${Date.now()}`,
    siteId: `site-${Math.floor(Math.random() * 5) + 1}`,
    severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
    message: ['Inverter Fault', 'Grid Instability', 'Panel Degradation', 'Connection Timeout'][Math.floor(Math.random() * 4)],
    status: 'active',
    timestamp: Date.now(),
  }
});

export const useWebSocket = <T = unknown>(url: string): WebSocketHook<T> => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage<T> | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const simulationIntervalRef = useRef<number | undefined>(undefined);

  const connect = useCallback(() => {
    // SIMULATION MODE
    if (url.includes('mock')) {
      setTimeout(() => {
        setIsConnected(true);
        simulationIntervalRef.current = window.setInterval(() => {
          setLastMessage(generateMockAlarm() as unknown as WebSocketMessage<T>);
        }, 5000);
      }, 1000);
      return;
    }

    // REAL MODE (Fallback code)
    const ws = new WebSocket(url);
    ws.onopen = () => setIsConnected(true);
    ws.onmessage = (e) => setLastMessage(JSON.parse(e.data));
    ws.onclose = () => setIsConnected(false);
    socketRef.current = ws;
  }, [url]);

  useEffect(() => {
    connect();
    return () => {
      if (simulationIntervalRef.current) clearInterval(simulationIntervalRef.current);
      if (socketRef.current) socketRef.current.close();
    };
  }, [connect]);

  const sendMessage = useCallback((event: string, data: unknown) => {
    console.log('Mock send:', event, data);
  }, []);

  return { isConnected, lastMessage, sendMessage, reconnect: connect };
};