'use client'
import React from 'react';
import { FaCheck } from 'react-icons/fa';

interface Step {
  id: number;
  title: string;
  subtitle: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
  onStepClick: (step: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, completedSteps, onStepClick }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <nav aria-label="Progress">
        <ol role="list" className="space-y-6">
          {steps.map((step, stepIdx) => (
            <li key={step.title} className="relative flex items-start">
              {/* Line connector */}
              {stepIdx !== steps.length - 1 ? (
                <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" aria-hidden="true" />
              ) : null}

              {/* Step status */}
              <button
                type="button"
                onClick={() => onStepClick(step.id)}
                className={`flex items-center w-full text-left group focus:outline-none ${completedSteps.includes(step.id) || step.id <= currentStep ? 'cursor-pointer' : 'cursor-default'}`}
                disabled={!(completedSteps.includes(step.id) || step.id <= currentStep)}
              >
                <span className="flex items-center">
                  {/* Circle/Checkmark */}
                  <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white">
                    {completedSteps.includes(step.id) && step.id < currentStep ? (
                        <FaCheck className="h-5 w-5 text-blue-600" aria-hidden="true" />
                    ) : step.id === currentStep ? (
                         <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                     ) : (
                         <span className="h-2.5 w-2.5 rounded-full bg-transparent" /> // Future step, empty inner circle
                     )}
                  </span>
                  {/* Step title and subtitle */}
                   <span className="ml-4 flex flex-col">
                        <span className={`text-sm font-medium ${step.id === currentStep ? 'text-blue-600' : completedSteps.includes(step.id) ? 'text-gray-900' : 'text-gray-500'}`}>{step.title}</span>
                        <span className="text-xs text-gray-500">{step.subtitle}</span>
                   </span>
                </span>
                {/* Edit link for completed steps */}
                {completedSteps.includes(step.id) && step.id < currentStep && (
                    <span className="ml-auto text-sm font-medium text-blue-600 hover:text-blue-800 group-focus:underline">
                        Edit
                    </span>
                )}
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Stepper; 