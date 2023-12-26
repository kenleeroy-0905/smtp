import React from "react";
import ErrorHandler from "./ErrorHandler";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error caught!");
    console.error(error);
    console.error(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // return this.props.fallback || <ErrorHandler />;
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
