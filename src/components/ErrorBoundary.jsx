import React, { Component } from 'react';

class ErrorFallback extends Component {
  render() {
    const { error, resetError } = this.props;
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#f9f7f2_0%,#eefbf3_48%,#eef7ff_100%)] flex items-center justify-center px-4 py-16">
        <div className="surface-card max-w-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <h2 className="mt-5 font-display text-2xl text-soil-900">
            Algo no salio como esperabamos
          </h2>
          <p className="mt-3 text-sm leading-7 text-soil-600">
            La aplicacion encontro un error inesperado. Podes intentar recargar la pagina.
            Si el problema persiste, contacta al equipo.
          </p>
          {error && (
            <p className="mt-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-xs text-red-700 font-mono break-all">
              {error.message}
            </p>
          )}
          <button
            type="button"
            onClick={resetError}
            className="btn-primary mt-6"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (typeof console !== 'undefined' && console.error) {
      console.error('ErrorBoundary:', error, errorInfo);
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} resetError={this.resetError} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
