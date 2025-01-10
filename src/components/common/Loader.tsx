import React from 'react';

const LoaderComponent = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white-100 bg-opacity-50 z-50">
            <div className="flex flex-col items-center">
                {/* Icon Animation */}
                <svg
                    className="animate-spin h-16 w-16 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
                {/* Optional Loading Text */}
                <span className="mt-4 font-medium text-lg text-gray-600  bg-opacity-20">Loading...</span>
            </div>
        </div>

    );
};

export default LoaderComponent;
