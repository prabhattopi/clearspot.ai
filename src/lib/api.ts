import axios, { type AxiosInstance, AxiosError, type InternalAxiosRequestConfig } from 'axios';
import type { ApiClient, ApiClientConfig } from '../types/api';

export class AxiosApiClient implements ApiClient {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor(config: ApiClientConfig) {
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    this.setupInterceptors();
  }

  public setToken(token: string): void {
    this.token = token;
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response.data,
      async (error: AxiosError) => {
        return Promise.reject(this.normalizeError(error));
      }
    );
  }

  private normalizeError(error: AxiosError | any) {
    return {
      message: error.response?.data?.message || error.message || 'An unexpected error occurred',
      status: error.response?.status,
      code: error.code,
    };
  }

  public async get<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
    return this.client.get<T, T>(endpoint, { params });
  }

  public async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.client.post<T, T>(endpoint, data);
  }

  public async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.client.put<T, T>(endpoint, data);
  }

  public async delete<T>(endpoint: string): Promise<T> {
    return this.client.delete<T, T>(endpoint);
  }
}

export const api = new AxiosApiClient({
  baseUrl: 'https://api.mock-clearspot.ai/v1',
});