import React, { useState } from 'react';

function SourceFilter() {
    const [country, setCountry] = useState('');
    const [panel, setPanel] = useState('');
    const [channel, setChannel] = useState('');

    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    };

    return (
        <div className="relative hidden sm:block sm:-mt-smhbar sm:left-0 md:-mt-mdhbar md:left-0 lg:-mt-lghbar lg:left-0 xl:-mt-xlhbar xl:-ml-xlleft xxl:-mt-xxlhbar xxl:left-72 bg-white shadow-sm rounded-lg p-6">
            <div className="flex flex-row gap-8 items-center justify-center">
                <div className="flex flex-col items-center">
                    <label className="text-sm font-semibold text-gray-700 mb-2">Country</label>
                    <select
                        className="border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                        name="country"
                        value={country}
                        onChange={handleChange(setCountry)}
                    >
                        <option value="">All</option>
                        <option value="Germany">Germany</option>
                        <option value="England">England</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="USA">USA</option>
                        <option value="Canada">Canada</option>
                    </select>
                </div>
                <div className="flex flex-col items-center">
                    <label className="text-sm font-semibold text-gray-700 mb-2">Panel</label>
                    <select
                        className="border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                        name="panel"
                        value={panel}
                        onChange={handleChange(setPanel)}
                    >
                        <option value="">All</option>
                        <option value="Panel 1">DKM</option>
                        <option value="Panel 2">GPI</option>
                        <option value="Panel 3">NPA</option>
                        <option value="Panel 4">PharmaScope</option>
                    </select>
                </div>
                <div className="flex flex-col items-center">
                    <label className="text-sm font-semibold text-gray-700 mb-2">Channel</label>
                    <select
                        className="border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                        name="channel"
                        value={channel}
                        onChange={handleChange(setChannel)}
                    >
                        <option value="">All</option>
                        <option value="Online">Hospital</option>
                        <option value="Offline">Retail</option>
                        <option value="In-Store">Others</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default SourceFilter;
