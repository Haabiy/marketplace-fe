import axios from "axios";
import React, { useEffect, useState } from 'react';
import AddedSource from '../AddDataSource.jsx'; // Import your AddedSource component
import PersistentDrawerLeft from '../Window.jsx'; // Assuming you have a Dashboard component
import NetworkError from "../NetworkError.jsx";
const ListSource = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchAuthenticatedData = async () => {
        // Retrieve username and possibly token from your authenticated session
        const username = sessionStorage.getItem('username'); 
        const password = sessionStorage.getItem('password'); 

        if (username && password) {
          const authHeader = `Basic ${btoa(`${username}:${password}`)}`;
  
          try {
            const response = await axios.get('http://localhost:8000/api/read-source/', {
              headers: {
                Authorization: authHeader,
              },
            });
            setData(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
            setError(error);
          }
        } else {
          console.error('No authentication credentials found.');
        }
      };
  
      fetchAuthenticatedData();
    }, []);
  
    if (error) {
        return <NetworkError retry={() => window.location.reload()} />;
    }
  
  return (
        <>
        <PersistentDrawerLeft/>
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
