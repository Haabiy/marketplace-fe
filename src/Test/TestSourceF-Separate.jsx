import { useState } from "react";
import axios from "axios";

function TestForm(){
    const [created_by, setCreatedBy] = useState('');
    const [country, setCountry] = useState('');
    const [data_vendor, setDataVendor] = useState('');
    const [panel, setPanel] = useState('');
    const [panel_group, setPanelGroup] = useState('');
    const [scope_of_subscription, setScopeOfSubscription] = useState('');
    const [data_type, setDataType] = useState('');
    const [granularity, setGranularity] = useState('national');
    const [end_date, setEndDate] = useState(null);
    const [current_update, setCurrentUpdate] = useState(null);
    const [next_update, setNextUpdate] = useState(null);
    const [data_upload, setDataUpload] = useState(null);

    const handleform= (e)=>{
        e.preventDefault()
        axios.post('http://localhost:8000/api/add-source/', {
            created_by: created_by,
            country: country,
            data_vendor: data_vendor,
            panel: panel,
            panel_group: panel_group,
            scope_of_subscription: scope_of_subscription,
            data_type: data_type,
            granularity: granularity,
            end_date: end_date,
            current_update: current_update,
            next_update: next_update,
            data_upload: data_upload,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        
    }
    return (
        <div className="container mx-auto p-6">
          <button className="bg-blue-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none mb-4">
            Add New Data Source
          </button>
            <div className="bg-white shadow-md rounded-lg p-8">
              <h2 className="text-lg font-semibold mb-4">Add New Source</h2>
              <form onSubmit={handleform} className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="created_by" className="font-medium">Created By:</label>
                  <input type="text" id="created_by" name="created_by" value={created_by} onChange={e=>setCreatedBy(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" required />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="country" className="font-medium">Country:</label>
                  <input type="text" id="country" name="country" value={country} onChange={e=>setCountry(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" required />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="data_vendor" className="font-medium">Data Vendor:</label>
                  <input type="text" id="data_vendor" name="data_vendor" value={data_vendor} onChange={e=>setDataVendor(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" required />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="panel" className="font-medium">Panel:</label>
                  <input type="text" id="panel" name="panel" value={panel} onChange={e=>setPanel(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" required />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="panel_group" className="font-medium">Panel Group:</label>
                  <select id="panel_group" name="panel_group" value={panel_group} onChange={e=>setPanelGroup(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500">
                    <option value="national">DKM</option>
                    <option value="regional">PharmaScope</option>
                    <option value="local">GPI</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="scope_of_subscription" className="font-medium">Scope of Subscription:</label>
                  <input type="text" id="scope_of_subscription" name="scope_of_subscription" value={scope_of_subscription} onChange={e=>setScopeOfSubscription(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="data_type" className="font-medium">Data Type:</label>
                  <input type="text" id="data_type" name="data_type" value={data_type} onChange={e=>setDataType(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" required />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="granularity" className="font-medium">Granularity:</label>
                  <select id="granularity" name="granularity" value={granularity} onChange={e=>setGranularity(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500">
                    <option value="national">National</option>
                    <option value="regional">Regional</option>
                    <option value="local">Local</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="end_date" className="font-medium">End Date:</label>
                  <input type="datetime-local" id="end_date" name="end_date" value={end_date} onChange={e=>setEndDate(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="current_update" className="font-medium">Current Update:</label>
                  <input type="datetime-local" id="current_update" name="current_update" value={current_update} onChange={e=>setCurrentUpdate(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="next_update" className="font-medium">Next Update:</label>
                  <input type="datetime-local" id="next_update" name="next_update" value={next_update} onChange={e=>setNextUpdate(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="data_upload" className="font-medium">Data Upload:</label>
                  <input type="file" id="data_upload" name="data_upload" onChange={e=>setDataUpload(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
                </div>
                <button type="submit" className="bg-blue-800 text-white font-medium rounded-lg px-5 py-2.5 focus:outline-none">Submit</button>
              </form>
            </div>
        </div>
      );
    };


export default TestForm;