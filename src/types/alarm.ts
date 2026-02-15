export type AlarmSeverity = 'critical' | 'high' | 'medium' | 'low';
export type AlarmStatus = 'active' | 'acknowledged' | 'resolved';

export interface Alarm {
  id: string;
  siteId: string;
  severity: AlarmSeverity;
  message: string;
  status: AlarmStatus;
  timestamp: number;
}