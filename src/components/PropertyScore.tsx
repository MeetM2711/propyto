'use client'
import React from 'react';

interface PropertyScoreProps {
  score: number; // Score out of 100
}

const PropertyScore: React.FC<PropertyScoreProps> = ({ score }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  // Ensure score is between 0 and 100 for calculation
  const validScore = Math.max(0, Math.min(100, score || 0));
  const offset = circumference - (validScore / 100) * circumference;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <div className="flex items-center gap-4 mb-3">
        <div className="relative w-20 h-20 flex-shrink-0">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              className="text-gray-200 stroke-current"
              strokeWidth="10"
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
            ></circle>
            {/* Progress circle */}
            <circle
              className="text-green-500 stroke-current transition-all duration-500 ease-in-out"
              strokeWidth="10"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 50 50)"
            ></circle>
            {/* Center text */}
            <text
              x="50"
              y="50"
              className="text-xl font-bold fill-current text-gray-800"
              dominantBaseline="central"
              textAnchor="middle">
                {`${Math.round(validScore)}%`}
            </text>
          </svg>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">Property Score</h4>
          <p className="text-sm text-gray-600">Better your property score,<br/> greater your visibility</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyScore; 