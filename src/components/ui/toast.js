'use client';

import { createContext, useEffect, useState } from "react";

const ToastContext = createContext({
    toasts: [],
    addToast: () => { },
    removeToast: () => { },
});

export const Toast = ({
    id,
    title,
    description,
    variant = 'default',
    onClose,
}) => {
    useEffect(() => {
        // Auto-dismiss after 5 seconds
        const timer = setTimeout(() => {
            onClose(id);
        }, 5000);

        return () => clearTimeout(timer);
    }, [id, onClose]);

    const getVariantStyle = () => {
        switch (variant) {
            case 'destructive':
                return 'bg-error text-white border-error';
            case 'success':
                return 'bg-success text-white border-success';
            case 'warning':
                return 'bg-warning text-white border-warning';
            case 'info':
                return 'bg-info text-white border-info';
            default:
                return 'bg-background border-border';
        }
    };

    const getIconByVariant = () => {
        switch (variant) {
            case 'destructive':
                return (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                );
            case 'success':
                return (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                );
            case 'warning':
                return (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                );
            case 'info':
                return (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
        }
    };

    return (
        <div
            className={`relative flex items-center w-full max-w-md overflow-hidden rounded-md shadow-lg border ${getVariantStyle()} p-4 my-2`}
            role="alert"
            data-test-id="toast"
        >
            <div className="flex-shrink-0 mr-3">
                {getIconByVariant()}
            </div>
            <div className="flex-1">
                {title && (
                    <div className="font-medium">{title}</div>
                )}
                {description && (
                    <div className="text-sm opacity-90">{description}</div>
                )}
            </div>
            <button
                onClick={() => onClose(id)}
                className="ml-4 rounded-full p-1 hover:bg-background-muted flex-shrink-0"
                aria-label="Close"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (toast) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prevToasts) => [...prevToasts, { id, ...toast }]);
        return id;
    };

    const removeToast = (id) => {
        setToasts((prevToasts) => prevToasts.filter(toast => toast.id !== id));
    };

    const contextValue = {
        toasts,
        addToast,
        removeToast,
    };

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            <div className="fixed top-4 right-4 z-50 flex flex-col items-end space-y-2">
                {toasts.map(toast => (
                    <Toast
                        key={toast.id}
                        id={toast.id}
                        title={toast.title}
                        description={toast.description}
                        variant={toast.variant}
                        onClose={removeToast}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export { ToastContext };