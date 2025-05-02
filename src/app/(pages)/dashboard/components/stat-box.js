import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export default function StatBox({
    title,
    value,
    description,
    icon,
    trend = 'neutral',
    className = '',
    children,
    color = 'base',
    chartData = [],
}) {
    const trendColors = {
        up: 'text-success flex items-center gap-1 before:content-["↑"]',
        down: 'text-error flex items-center gap-1 before:content-["↓"]',
        neutral: 'text-info',
    };


    const bgColors = {
        primary: 'border-primary',
        secondary: 'border-secondary',
        accent: 'border-accent',
        info: 'border-info',
        success: 'border-success',
        warning: 'border-warning',
        error: 'border-error',
        base: 'border-base-300',
    };

    const iconColors = {
        primary: 'text-primary bg-primary/20',
        secondary: 'text-secondary bg-secondary/20',
        accent: 'text-accent bg-accent/20',
        info: 'text-info bg-info/20',
        success: 'text-success bg-success/20',
        warning: 'text-warning bg-warning/20',
        error: 'text-error bg-error/20',
        base: 'text-base-content bg-base-200',
    };

    return (
        <div
            className={twMerge(
                'card bg-white shadow-md border-l-4 transition-all duration-300 hover:shadow-md overflow-hidden relative',
                bgColors[color],
                className,
            )}
        >
            {chartData.length > 0 && (
                <div className="absolute inset-0 opacity-60 overflow-hidden"></div>
            )}
            <div className="card-body p-6 gap-3 z-10">
                <div className="flex justify-between items-center">
                    <h2 className="card-title text-sm font-medium opacity-80">{title}</h2>
                    <div className={twMerge('p-3 rounded-md flex items-center justify-center', iconColors[color],)}>
                        {icon}
                    </div>
                </div>
                <div>
                    <h2 className="text-5xl font-bold tracking-tight">{value}</h2>
                    {description && (
                        <p className={twMerge('text-xs mt-1 font-medium', trend !== 'neutral' && trendColors[trend],)}>
                            {description}
                        </p>
                    )}
                    {children}
                </div>
            </div>
        </div>
    );
}
