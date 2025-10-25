import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ModelErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('3D Model Error:', error);
        console.error('Error Info:', errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="p-4 border border-red-500 rounded bg-red-50">
                    <h3 className="text-red-700 font-medium">3D Viewer Error</h3>
                    <p className="text-red-600 text-sm mt-2">
                        {this.state.error?.message || 'An error occurred while loading the 3D viewer.'}
                    </p>
                </div>
            );
        }

        return this.props.children;
    }
}