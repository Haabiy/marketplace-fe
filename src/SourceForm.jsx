import React, { useState } from 'react';
import axios from 'axios';
import { XIcon } from '@heroicons/react/outline';

const SourceForm = ({ isEditMode, source }) => {
  // If there is a date filled out then, make it appear while editing the form otherwise it is an empty data so, use next_status.
  try{
    var nextUpdateField = source.next_update ? source.next_update : source.next_status;}
  catch (error) {
      console.error('next_update error:', error);
      // Optionally handle error, e.g., show an error message
  }
  const initialFormData = isEditMode
  ? {
      created_by: source.username,
      country: source.title,
      data_vendor: source.data_vendor,
      panel: source.panel,
      panel_group: source.panel_group,
      scope_of_subscription: source.scope,
      data_type: source.data_type,
      granularity: source.granularity,
      end_date: source.end_date,
      current_update: source.current_update,
      next_update: nextUpdateField,
      data_upload: null,
  }
  : {
      created_by: '',
      country: '',
      data_vendor: '',
      panel: '',
      panel_group: '',
      scope_of_subscription: '',
      data_type: '',
      granularity: '',
      end_date: '',
      current_update: '',
      next_update: '',
      data_upload: null,
  };

  /*
      const initialFormData = {
        created_by: source.created_by || '',
        country: source.title || '',
        data_vendor: source.data_vendor || '',
        panel: source.panel || '',
        panel_group: source.panel_group || '',
        scope_of_subscription: source.scope || '',
        data_type: source.data_type || '',
        granularity: source.granularity || '',
        end_date: source.end_date || '',
        current_update: source.current_update || '',
        next_update: source.next_update || '',
        data_upload: source.data_upload || null,
    };
  */

  const [formData, setFormData] = useState(initialFormData);
  const [showForm, setShowForm] = useState(true); // Set to true initially to show the modal for testing

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, data_upload: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formPayload = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          formPayload.append(key, formData[key]);
          //console.log(formData[key]);
        }
      });

      if(isEditMode){
        await axios.put(`http://localhost:8000/api/update-source/${source.id}/`, formPayload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      else{
        await axios.post('http://localhost:8000/api/add-source/', formPayload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        //console.log(response.data)
      }
      // Optionally handle success, e.g., show a success message or redirect
      setShowForm(false);
      window.location.reload();

    } catch (error) {
      console.error('Error:', error);
      // Optionally handle error, e.g., show an error message
    }
  };

  const closeForm = () => {
    setShowForm(false);
    window.location.reload();
  };

  return (
    <>
    <div className="container mx-auto p-6">
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none md:mt-16 xl:mt-16 ">
          <div className="relative w-full max-w-lg bg-white shadow-lg rounded-lg">
            {/* Header with close button */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <div className="text-lg font-semibold text-gray-800">Add New Source</div>
              <button onClick={closeForm} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                <XIcon className="h-7 w-7" />
              </button>
            </div>
            {/* Scrollable Form content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Form inputs */}
                <div className="flex flex-row gap-8 md:-mt-2">
                  <div className="flex flex-col">
                    <label htmlFor="created_by" className="font-medium">Created By:</label>
                    <input
                      type="text"
                      id="created_by"
                      name="created_by"
                      value={formData.created_by}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="country" className="font-medium">Country:</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-8">
                  <div className="flex flex-col">
                    <label htmlFor="data_vendor" className="font-medium">Data Vendor:</label>
                    <input
                      type="text"
                      id="data_vendor"
                      name="data_vendor"
                      value={formData.data_vendor}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="panel" className="font-medium">Panel:</label>
                    <input
                      type="text"
                      id="panel"
                      name="panel"
                      value={formData.panel}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="panel_group" className="font-medium">Panel Group:</label>
                  <select
                    id="panel_group"
                    name="panel_group"
                    value={formData.panel_group}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                  >
                    <option value="DKM">DKM</option>
                    <option value="PharmaScope">PharmaScope</option>
                    <option value="GPI">GPI</option>
                  </select>
                </div>
                <div className="flex flex-row gap-8">
                  <div className="flex flex-col">
                    <label htmlFor="scope_of_subscription" className="font-medium">Scope of Subscription:</label>
                    <input
                      type="text"
                      id="scope_of_subscription"
                      name="scope_of_subscription"
                      value={formData.scope_of_subscription}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="data_type" className="font-medium">Data Type:</label>
                    <input
                      type="text"
                      id="data_type"
                      name="data_type"
                      value={formData.data_type}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="granularity" className="font-medium">Granularity:</label>
                  <select
                    id="granularity"
                    name="granularity"
                    value={formData.granularity}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                  >
                    <option value="National">National</option>
                    <option value="Regional">Regional</option>
                    <option value="Local">Local</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="end_date" className="font-medium">End Date:</label>
                  <input
                    type="date"
                    id="end_date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex flex-row gap-8">
                  <div className="flex flex-col">
                    <label htmlFor="current_update" className="font-medium">Current Update:</label>
                    <input
                      type="date"
                      id="current_update"
                      name="current_update"
                      value={formData.current_update}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="next_update" className="font-medium">Next Update:</label>
                    <input
                      type="date"
                      id="next_update"
                      name="next_update"
                      value={formData.next_update}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="data_upload" className="font-medium">Data Upload:</label>
                  <input
                    type="file"
                    id="data_upload"
                    name="data_upload"
                    onChange={handleFileChange}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button type="submit" className="bg-blue-800 text-white font-medium rounded-lg px-5 py-2.5 focus:outline-none">{isEditMode ? 'Update Source' : 'Add Source'}</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default SourceForm;
