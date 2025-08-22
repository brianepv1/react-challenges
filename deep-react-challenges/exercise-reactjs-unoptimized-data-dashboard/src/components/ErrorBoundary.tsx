import * as React from 'react';
import type { ReactNode, ErrorInfo } from 'react';

interface Props {
    fallback: ReactNode // Recibe un componente
    children: ReactNode // Acepta un componente interior
}

interface ComponentState {
    hasError: boolean
}

class ErrorBoundary extends React.Component<Props, ComponentState> {

    constructor(props: Props){
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ComponentState {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log("Uncaugh Error: ", error, errorInfo.componentStack, React.captureOwnerStack);
    }

    render(): ReactNode {
        if(this.state.hasError){
            // Renderiza el componente que le pasaste como fallback UI
            return this.props.fallback
        }

        // Si todo bien entonces solo rendereriza el componente
        return this.props.children
    }
}

export default ErrorBoundary;