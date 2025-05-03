import React from 'react';
import PropTypes from 'prop-types';
// Using DaisyUI classes for styling

const bgColorMap = {
    'primary': 'bg-primary/20',
    'secondary': 'bg-secondary/20',
    'accent': 'bg-accent/20',
    'neutral': 'bg-neutral/20',
    'base-100': 'bg-base-100/20',
    'base-200': 'bg-base-200/20',
    'base-300': 'bg-base-300/20',
}

const fgColorMap = {
    'primary': 'text-primary',
    'secondary': 'text-secondary',
    'accent': 'text-accent',
    'neutral': 'text-neutral',
    'base-100': 'text-base-100',
    'base-200': 'text-base-200',
    'base-300': 'text-base-300',
}

const borderColorMap = {
    'primary': 'border-primary',
    'secondary': 'border-secondary',
    'accent': 'border-accent',
    'neutral': 'border-neutral',
    'base-100': 'border-base-100',
    'base-200': 'border-base-200',
    'base-300': 'border-base-300',
}

const StatCard = ({ title, value, change, icon, color }) => {
    return (
        <div className={`card shadow-lg compact bg-base-100 border-l-4 ${borderColorMap[color]} hover:shadow-xl transition-shadow duration-200`}>
            <div className="card-body p-3 sm:p-4">
                <div className="flex justify-between items-center">
                    <span className={`text-sm sm:text-base font-semibold text-base-content/60 truncate`}>{title}</span>
                    <div className={`h-8 w-8 sm:h-12 sm:w-12 ${bgColorMap[color]} ${fgColorMap[color]} flex items-center justify-center rounded-lg`}>
                        {icon}
                    </div>
                </div>
                <div className={`py-0 text-2xl sm:text-3xl lg:text-4xl font-bold my-0 sm:my-2 ${fgColorMap[color]}`}>{value}</div>
                <div className={`text-xs sm:text-sm ${change >= 0 ? 'text-success' : 'text-error'}`}>
                    {change >= 0 ? `+${change}` : change}% vs last month
                </div>
            </div>
        </div>
    );
};

StatCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    change: PropTypes.number.isRequired,
    icon: PropTypes.node.isRequired,
};

export default StatCard;
