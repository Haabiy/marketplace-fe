import React, { useEffect, useState, useRef } from 'react';
import AddedSource from './AddDataSource.jsx'; 
import NetworkError from "../Error/NetworkError.jsx";

import WebSocketService from '../WebSocket/Websocket.jsx';

const ListSource = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    //const navigate = useNavigate()
    const wsUrl = 'ws://localhost:8000/ws/read_source/'
    const WebSocketInstance = useRef(new WebSocketService()).current;

    useEffect(() => {
      WebSocketInstance.connect(wsUrl);
  
      WebSocketInstance.addCallbacks((parsedData) => {
        setData(parsedData.data);
      });
  
      return () => {
        WebSocketInstance.close();
      };
    }, [wsUrl]);
  
    if (error) {
        return <NetworkError retry={() => window.location.reload()} />;
    }
  
  return (
        <>
        <div className='flex justify-center items-center min-h-16 lg:-mt-42 xl:-mr-0 lg:-mr-96 xxl:-mt-60'>
        <div className='grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 xl:grid xl:grid-cols-4 xl:relative xl:right-5 xxl:grid xxl:grid-cols-5'>
        {data.map((x, index) => (
            <AddedSource
            key={index}
            id={x.id} // to update the data
            title={x.country}
            data_vendor={x.data_vendor}
            panel={x.panel}
            panel_group={x.panel_group}
            scope = {x.scope_of_subscription}
            data_type = {x.data_type}
            granularity={x.granularity}
            end_date={x.end_date}
            current_update={x.current_update}
            next_update={x.next_status}
            period='Monthly'
            username={x.created_by}
            status = {x.status}
            datadelivery_status = {x.datadelivery_status}
            />
        ))}
        </div>
        </div>
        </>
  );
};

export default ListSource;
