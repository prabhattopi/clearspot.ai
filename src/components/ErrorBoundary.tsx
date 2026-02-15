import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertOctagon, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // Here you would log to a service like Sentry or Datadog
  }

  public handleRetry = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload(); // Simple recovery strategy
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-gray-50 rounded-lg border border-gray-200">
          <div className="bg-red-100 p-4 rounded-full mb-4">
            <AlertOctagon className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 max-w-md mb-6">
            We encountered an unexpected error. Our team has been notified.
          </p>
          
          <div className="bg-white p-4 rounded border border-gray-200 w-full max-w-lg mb-6 text-left overflow-auto max-h-32">
            <code className="text-xs text-red-500 font-mono">
              {this.state.error?.message}
            </code>
          </div>

          <button
            onClick={this.handleRetry}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}