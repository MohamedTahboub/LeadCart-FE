import React, { Component } from 'react';
import ErrorPage from './ErrorPage';
class ErrorBoundary extends Component {
  constructor (props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError (error) {
    // Update state so the next render will show the fallback UI.
    if (process.env.NODE_ENV === 'production') return { hasError: true };
  }

  componentDidCatch (error, info) {
    // You can also log the error to an error reporting service
    console.log({ error, info });
  }

  render () {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorPage />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
