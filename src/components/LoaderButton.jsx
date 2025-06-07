import React from 'react';

const LoaderButton = ({ text = "Loading..." }) => {
  return (
    <button
      disabled
      className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-red-600 text-white font-semibold text-lg shadow-lg cursor-not-allowed transition-all duration-300 animate-pulse"
    >
      <svg
        className="animate-spin h-5 w-5 text-white"
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
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        ></path>
      </svg>
      {text}
    </button>
  );
};

export default LoaderButton;