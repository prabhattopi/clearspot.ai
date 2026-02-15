export interface ApiClientConfig {
    baseUrl: string;
    timeout?: number;
    headers?: Record<string, string>;
  }
  
  export interface ApiClient {
    setToken(token: string): void;
    get<T>(endpoint: string, params?: Record<string, unknown>): Promise<T>;
    post<T>(endpoint: string, data?: unknown): Promise<T>;
    put<T>(endpoint: string, data?: unknown): Promise<T>;
    delete<T>(endpoint: string): Promise<T>;
  }
  
  // Standardized Error format for the app
  export interface ApiError {
    message: string;
    code: string;
    status?: number;
  }