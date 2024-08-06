import React, {useState, useEffect, useRef} from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import SourceForm from './SourceForm';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axiosInstance from '../Auth/axiosInstance';
import WebSocketService from '../WebSocket/Websocket';
import SourceFilter from './SourceFilter';
import { useNavigate } from 'react-router-dom';
import STPDashboard from '../Step/StepDasboard';

function AddedSource(source) {
    const [editMode, setEditMode] = useState(false);
    // set it false and use effect to change the value whenever there is a change in source.status column
    const [clickVI, setClickVI] = useState(false);
    
    const navigate = useNavigate()
    const sourceDetail = () => {
        navigate(`/step/${source.id}`); // Pass the id as a URL parameter
    };

    // Initialize WebSocketService for the path
    const wsUrl = 'ws://localhost:8000/ws/data_source_activation/';
    const WebSocketInstance = useRef(new WebSocketService()).current;
    useEffect(() => {
        WebSocketInstance.connect(wsUrl);
        setClickVI(source.status === 'inactive'); // Set initial state based on source status

        // Add WebSocket callback for data updates
        WebSocketInstance.addCallbacks((data) => {
            if (data.id === source.id) {
                setClickVI(data.status === 'inactive');
            }
        });

        return () => {
            WebSocketInstance.close(); // Clean up WebSocket connection on unmount
        };
    }, [source.status]);

    const handleActivation = () => {
        const action = clickVI ? 'activate' : 'deactivate';
        WebSocketInstance.socketRef.send(JSON.stringify({
            action: action,
            source_id: source.id,
        }));
        setClickVI(!clickVI); 
    };

    let buttonBgColor;
    if (source.datadelivery_status === 'awaiting') 
        {buttonBgColor = 'bg-orange-500'; } 
    else if (source.datadelivery_status === 'received') 
        {buttonBgColor = 'bg-green-600'; } 
    else 
        {buttonBgColor = 'bg-red-600'; }
    
    const handleDelete = async () => {
        try {
            const response = await axiosInstance.delete(`/delete-source/${source.id}/`);
            console.log('Delete response:', response.data);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting data:', error);
        }};
    
    return (
        <div onClick={!editMode ? sourceDetail : undefined} className='cursor-pointer'>
        <div className="flex justify-center items-start min-h-screen md:justify-start md:items-center -mb-smxtra sm:-mb-smxtra md:ml-12 md:-mb-mdxtra lg:-mb-lgxtra xl:-mb-xlxtra xxl:-mb-xxlxtra">
            <div className="bg-slate-100 flex flex-col h-72 w-80 mt-32 rounded-xl shadow-lg p-6 hover:bg-slate-200 hover:shadow-xl transition-all duration-100">
            {/* Edit Button */}
            <div className='flex flex-row gap-1'>
                <button
                    className="relative ml-eye top-1 text-gray-600 hover:text-gray-500 cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        setClickVI(!clickVI);
                        handleActivation();
                        setEditMode(false); // Hide edit button when eye icon is clicked
                    }}
                    >
                    {clickVI ? <VisibilityOffIcon size={14} /> : <VisibilityIcon size={14} />}
                </button>
            </div>
            {/* Delete Button */}
            <div className='flex flex-row gap-2'>
            <div className="text-xl font-semibold -mt-4">{source.title}</div>
            <div className={`relative -left-3 text-white px-2 -top-4 py-1 rounded-md text-xs ml-2 ${buttonBgColor}`}>
                {source.datadelivery_status}
            </div>
            {!clickVI && (
                    <button
                        className="relative -ml-pencil -top-5 text-gray-600 hover:text-gray-500 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setEditMode(!editMode)
                        }}
                    >
                        <FaPencilAlt size={14} />
                    </button>
                )}
            </div>
            <div className="text-sm text-gray-600">End Period: {source.end_date}</div>
                <div className="flex flex-col justify-start items-start relative font-roboto font-light space-y-4">
                    <div className="flex flex-row gap-2 mt-2 border-t border-gray-200 pt-2">
                        <button className="py-1 px-3 bg-x text-white rounded shadow-sm hover:bg-blue-600">{source.data_vendor}</button>
                        <button className="py-1 px-3 bg-y text-white rounded shadow-sm hover:bg-blue-600">{source.granularity}</button>
                        <button className="py-1 px-3 bg-z text-white rounded shadow-sm hover:bg-blue-600">{source.panel}</button>
                    </div>
                    <div className="flex flex-row gap-2 mt-4">
                        <button className="py-1 px-3 bg-a text-white rounded shadow-sm hover:bg-blue-600">{source.panel_group}</button>
                        <button className="py-1 px-3 bg-b text-white rounded shadow-sm hover:bg-blue-600">{source.period}</button>
                    </div>
                    <div className="flex flex-col gap-2 border-t">
                    <div className="text-sm text-gray-600 mt-3">Next Update: {source.next_update}</div>
                    <div className="text-sm text-gray-600">User : {source.username}</div>
                    {!clickVI &&( <button
                        className="relative left-64 -top-4 text-gray-500 hover:text-gray-500 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete();
                        }}
                        >
                        <FaTrash size={16} />
                    </button>)}
                    {editMode ? (
                            <SourceForm  source={source} isEditMode={true} 
                            />
                        ) : (
                            <>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default AddedSource;
