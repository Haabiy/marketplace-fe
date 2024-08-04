import React, {useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import Details from './steps';
import WebSocketService from '../WebSocket/Websocket';

const STPDashboard = (source) => {
    const { id } = useParams();
    const data = Details[0].data; // Access the data object from the array

    /*
    const [data, setData] = useState([]);
    const wsUrl = 'ws://localhost:8000/ws/filter_source/'
    const WebSocketInstance = useRef(new WebSocketService()).current;

    useEffect(() => {
        WebSocketInstance.connect(wsUrl);
        console.log('connected')
        // Send the id to the WebSocket server
        WebSocketInstance.socketRef.send(JSON.stringify({
            action: 'filter_by_id',
            source_id: id,
        }));

        return () => {
            WebSocketInstance.close();
        };
    }, [wsUrl, id]);

    */

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -skew-y-6"></div>
              <h1 className="text-4xl font-bold relative z-10">Data Source Dashboard</h1>
              <p className="mt-2 text-blue-100 relative z-10">Comprehensive overview of your data source</p>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Data Overview */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">Data Overview</h2>
                <ul className="space-y-3">
                  {[
                    { label: "ID", value: data.id },
                    { label: "Created At", value: new Date(data.created_at).toLocaleString() },
                    { label: "Updated At", value: new Date(data.updated_at).toLocaleString() },
                    { label: "Created By", value: data.created_by },
                    { label: "Country", value: data.country },
                    { label: "Status", value: data.status, special: true }
                  ].map((item, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span className="font-medium text-gray-600">{item.label}:</span>
                      {item.special ? (
                        <span className={`font-semibold px-3 py-1 rounded-full ${item.value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {item.value}
                        </span>
                      ) : (
                        <span className="text-gray-800">{item.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
      
              {/* Data Details */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">Data Details</h2>
                <ul className="space-y-3">
                  {[
                    { label: "Next Status", value: data.next_status },
                    { label: "Data Vendor", value: data.data_vendor },
                    { label: "Panel", value: data.panel },
                    { label: "Panel Group", value: data.panel_group },
                    { label: "Scope of Subscription", value: data.scope_of_subscription },
                    { label: "Data Type", value: data.data_type },
                    { label: "Granularity", value: data.granularity },
                    { label: "End Date", value: data.end_date },
                    { label: "Current Update", value: data.current_update },
                    { label: "Next Update", value: data.next_update ? new Date(data.next_update).toLocaleString() : 'N/A' },
                    { label: "Delivery Status", value: data.datadelivery_status },
                    { label: "Data Upload", value: data.data_upload ? 'Uploaded' : 'Not Uploaded', special: true }
                  ].map((item, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span className="font-medium text-gray-600">{item.label}:</span>
                      {item.special ? (
                        <span className={`font-semibold px-3 py-1 rounded-full ${item.value === 'Uploaded' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {item.value}
                        </span>
                      ) : (
                        <span className="text-gray-800">{item.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
  };  

export default STPDashboard;
