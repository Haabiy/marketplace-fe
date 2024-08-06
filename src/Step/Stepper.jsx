import React, { useState, useEffect, useRef } from 'react';
import WebSocketService from '../WebSocket/Websocket';
import STPDashboard from './StepDasboard';

const steps = ['Collection', 'Cleaning', 'QC', 'Consolidation', 'Referencing', 'Recoding', 'Transcoding'];

const stps = {
  "collection": 1,
  "cleaning": 2,
  "qc": 3,
  "consolidation": 4,
  "referencing": 5,
  "recoding": 6,
  "transcoding": 7
};

const HorizontalStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Initialize EMR websocket service
  const wsUrl = 'ws://localhost:8000/ws/EMRConsumer/';
  const WebSocketInstance = useRef(new WebSocketService()).current;

  function findKeyByValue(obj, value) {
    const keys = Object.keys(obj);
    const key = keys.find(k => obj[k] === value);
    return key;
  }

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    WebSocketInstance.connect(wsUrl);
    return () => {
      WebSocketInstance.close();
    };
  }, [wsUrl]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      WebSocketInstance.socketRef.send(JSON.stringify({
        step: findKeyByValue(stps, currentStep + 2),
      }));
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      WebSocketInstance.socketRef.send(JSON.stringify({
        step: findKeyByValue(stps, currentStep),
      }));
    }
  };

  const renderSteps = () => {
    return steps.map((step, index) => (
      <React.Fragment key={index}>
        <div className="flex-1 flex flex-col items-center">
          <div
            className={`flex items-center justify-center h-10 w-10 rounded-full ${
              index <= currentStep ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'
            }`}
          >
            {index + 1}
          </div>
          <div className="text-center mt-2 text-sm">{step}</div>
        </div>
        {index < steps.length - 1 && (
          <div className={`flex-1 h-0.5 bg-white relative ${isMobile ? 'hidden' : ''}`}>
            <div
              className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-500 ease-in-out"
              style={{ width: index <= currentStep ? '100%' : '0%' }}
            ></div>
          </div>
        )}
      </React.Fragment>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <STPDashboard />
      <div className="max-w-full mx-auto bg-transparent rounded-xl overflow-hidden transition-all duration-300">
        <div className="p-8">
          <div className="w-full py-4">
            {isMobile ? (
              <div className="flex flex-wrap justify-center gap-4 mb-4">
                {renderSteps()}
              </div>
            ) : (
              <div className="flex justify-between items-center mb-4 relative overflow-x-auto">
                {renderSteps()}
              </div>
            )}
            <div className="flex justify-between mt-4">
              <button
                className={`px-4 py-2 rounded ${currentStep === 0 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                Back
              </button>
              <button
                className={`px-4 py-2 rounded ${currentStep === steps.length - 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                onClick={handleNext}
                disabled={currentStep === steps.length - 1}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalStepper;
