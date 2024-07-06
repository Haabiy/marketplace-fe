import React from 'react';

function NetworkError({ retry }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 md:p-8 max-w-md w-full mx-4">
        <div className="flex flex-col items-center">
          <div className="text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="mt-4 text-xl md:text-2xl font-semibold text-gray-800">Network Error</h2>
          <p className="mt-2 text-xl md:text-sm font-thin text-gray-800">Backend is down</p>
          <p className="mt-2 text-gray-600 text-center">An error occurred while trying to fetch data. Please check your internet connection and try again.</p>
          <button
            onClick={retry}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}

export default NetworkError;
