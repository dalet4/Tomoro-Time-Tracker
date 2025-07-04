
export interface TimeLog {
  user_name: string;
  client_name: string;
  start_time: string; // ISO 8601
  end_time: string; // ISO 8601
  duration_seconds: number; // Duration in seconds
}
