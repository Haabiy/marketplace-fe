import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TimelineIcon from '@mui/icons-material/Timeline';

import ENIM from './Assets/ENIM-LOGO.png'; // Replace with the correct path
import ENIMsingle from './Assets/Logo-Single.png'
import johnson from './Assets/Johnson_and_Johnson_Logo.svg'; // Replace with the correct path

import DataLibrary from './Home/DataLibrary.jsx';
import SourceForm from './AddList/SourceForm.jsx';
import ListSource from './AddList/ListSource.jsx';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="relative flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out bg-slate-900 text-white w-64 p-5 z-30`}
      >
        <div className="flex justify-between items-center mb-4">
          <div className='flex items-center'>
            <button onClick={toggleSidebar} className="text-white focus:outline-none mr-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                ></path>
              </svg>
            </button>
            <Typography variant="h6" noWrap component="div">
              <div className='flex flex-row gap-2 items-center'>
                <img src={ENIMsingle} alt="ENIM" className='w-10 h-10' />
              </div>
            </Typography>
          </div>
        </div>
        <nav className="mt-10">
          <a href="/main" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            Homepage
          </a>
          <a href="/main" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            All Data Source
          </a>
          <a href="/main" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            Dashboard
          </a>
          <a href="/main" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            Pending
          </a>
          <a href="/main" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            In-Progress
          </a>
          <a href="/main" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            Completed
          </a>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10 relative">
        <div className="absolute top-4 right-32">
          <button
            onClick={handleOpenModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none"
          >
            Add New Data Source
          </button>
        </div>
        <Typography variant="h6" noWrap component="div">
              <div className='flex flex-row gap-2 items-center justify-center relative mt-12 mr-20'>
                <img src={ENIM} alt="ENIM" className='w-64' />
                <TimelineIcon/>
                <img src={johnson} alt="JOHNSON JOHNSON" className='w-48 relative ml-3' />
              </div>
            </Typography>
        {!isOpen && (
          <button
            onClick={toggleSidebar}
            className="fixed top-4 left-4 bg-slate-700 text-white px-4 py-2 rounded-md focus:outline-none z-20"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        )}
        <div className="mt-10">
          <DataLibrary />
          <ListSource/>
        </div>
      </div>

      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        className="flex justify-center items-center"
      >
        <Box>
          <Typography sx={{ mt: 2 }}>
            <SourceForm />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Sidebar;
