import DataUpdateStatus from '../Home/Homepage.jsx';
import React, {useState, useEffect} from 'react';
import NetworkError from '../Error/NetworkError.jsx';
import WebSocketService from '../WebSocket/Websocket.jsx'; 
import ListSource from '../AddList/ListSource.jsx';
import Testclass from './TestSocket.jsx';

function Sample(){
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  
  const path = 'ws://localhost:8000/ws/data_library/'
  const x = new Testclass()

  x.connect(path).then((data) => {
    console.log('data received: ', data);
}).catch((error) => {
    console.error('WebSocket error:', error);
});

/*/
  x.getData(path).then((data) => {
    console.log('Received data:', data);
}).catch((error) => {
    console.error('Error receiving data:', error);
});
/*

  /*
  const wsUrl = 'ws://localhost:8000/ws/data_library/'
  const WebSocketInstance = new WebSocketService();

  useEffect(() => {
    WebSocketInstance.connect(wsUrl);

    WebSocketInstance.addCallbacks((parsedData) => {
      setData(parsedData.data);
    });

    return () => {
      WebSocketInstance.close();
    };
  }, [wsUrl]);

  */


  if (error) {
      return <NetworkError retry={() => window.location.reload()} />;
  }
    return(
        <>
        <div className='flex flex-col justify-center items-center -mt-12'>
          <div className="flex justify-center items-center font-satoshi text-3xl relative top-16 mb-8 font-medium md">
            <div>Data Library Update Status</div>
            <div className="flex flex-row items-center relative right-0 bg-green-100 text-green-500 text-xs font-bold px-2.5 py-0.5 rounded-full dark:bg-white dark:text-green-300">
              <div className="w-2 h-2 me-1 bg-green-500 rounded-full"></div>
              Live
            </div>
          </div>
          <div className='flex flex-col justify-center items-center gap-3 lg:flex lg:flex-row xl:flex xl:flex-row'>
            {data.map((x, index) => (
              <DataUpdateStatus
                key={index}
                id={x.id} 
                section={x.section}
                t1={x.t1}
                t2={x.t2}
                t3={x.t3}
                d1={x.d1}
                d2={x.d2}
                d3={x.d3}
                s1={x.s1}
                s2={x.s2}
                s3={x.s3}
              />
            ))}
          </div>
        </div>
        <ListSource/>
        </>
    );
}

export default Sample;