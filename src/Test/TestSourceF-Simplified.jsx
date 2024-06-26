import React, { useState } from 'react';
import axios from 'axios';

const SourceForm = () => {
  const [formData, setFormData] = useState({
    created_by: '',
    country: '',
    data_vendor: '',
    panel: '',
    panel_group: '',
    scope_of_subscription: '',
    data_type: '',
    granularity: 'national',
    end_date: '',
    current_update: '',
    next_update: '',
    data_upload: null,
  });

  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
    //console.log({...formData, [name]: value})
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, data_upload: e.target.files[0], });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/add-source/', formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Server response:', response.data);
      // Optionally handle success, e.g., show a success message or redirect
    } catch (error) {
      console.error('Error:', error);
      // Optionally handle error, e.g., show an error message
    }};

    /*
      const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post('http://localhost:8000/api/add-source/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(function(response) {
        console.log('Server response:', response.data);
        // Optionally handle success, e.g., update UI, show success message
  
      })
      .catch(function(error) {
        console.error('Error:', error);
        // Optionally handle error, e.g., show error message to user
      });
  };
    */

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="container mx-auto p-6">
      <button onClick={toggleForm} className="bg-blue-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none mb-4">
        Add New Data Source
      </button>
      {showForm && (
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-lg font-semibold mb-4">Add New Source</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="created_by" className="font-medium">Created By:</label>
              <input type="text" id="created_by" name="created_by" value={formData.created_by} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="country" className="font-medium">Country:</label>
              <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="data_vendor" className="font-medium">Data Vendor:</label>
              <input type="text" id="data_vendor" name="data_vendor" value={formData.data_vendor} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="panel" className="font-medium">Panel:</label>
              <input type="text" id="panel" name="panel" value={formData.panel} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="panel_group" className="font-medium">Panel Group:</label>
              <select id="panel_group" name="panel_group" value={formData.panel_group} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500">
                <option value="national">DKM</option>
                <option value="regional">PharmaScope</option>
                <option value="local">GPI</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="scope_of_subscription" className="font-medium">Scope of Subscription:</label>
              <input type="text" id="scope_of_subscription" name="scope_of_subscription" value={formData.scope_of_subscription} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="data_type" className="font-medium">Data Type:</label>
              <input type="text" id="data_type" name="data_type" value={formData.data_type} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="granularity" className="font-medium">Granularity:</label>
              <select id="granularity" name="granularity" value={formData.granularity} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500">
                <option value="national">National</option>
                <option value="regional">Regional</option>
                <option value="local">Local</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="end_date" className="font-medium">End Date:</label>
              <input type="datetime-local" id="end_date" name="end_date" value={formData.end_date} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="current_update" className="font-medium">Current Update:</label>
              <input type="datetime-local" id="current_update" name="current_update" value={formData.current_update} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="next_update" className="font-medium">Next Update:</label>
              <input type="datetime-local" id="next_update" name="next_update" value={formData.next_update} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="data_upload" className="font-medium">Data Upload:</label>
              <input type="file" id="data_upload" name="data_upload" onChange={handleFileChange} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
            </div>
            <button type="submit" className="bg-blue-800 text-white font-medium rounded-lg px-5 py-2.5 focus:outline-none">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SourceForm;
