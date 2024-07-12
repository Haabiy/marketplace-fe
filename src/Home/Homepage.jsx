import React from "react";
import data_library from '../Assets/data_library.svg'

function DataUpdateStatus({ section, t1, t2, t3, d1, d2, d3, s1, s2, s3 }){
    return(
        <div className="bg-white border border-gray-100 shadow-sm min-h-8 w-h-extra h-44 rounded-xl p-4 relative top-20 flex flex-col">
            <div className="flex flex-row gap-1 relative left-3 top-1 mb-4 font-satoshi text-sm font-thin"><img src={data_library} alt="" /> {section}</div>
            <div className="relative left-4 top-1 flex flex-row gap-16 font-satoshi">
                <div>{t1}
                    <div className="flex flex-col mt-4 text-sm">
                        <div className="font-thin font-roboto">Past {d1} days</div>
                        <div className="text-blue-600 font-satoshi font-normal">{s1} Sources</div>
                    </div>
                </div>
                <div>{t2}
                <div className="flex flex-col mt-4 text-sm">
                        <div className="font-roboto font-thin ">Past {d2} days</div>
                        <div className="text-blue-600 font-satoshi font-normal">{s2} Sources</div>
                    </div>
                </div>
                <div>{t3}
                <div className="flex flex-col mt-4 text-sm">
                        <div className="font-thin font-roboto">Past {d3} days</div>
                        <div className="text-blue-600 font-satoshi font-normal">{s3} Sources</div>
                    </div>
                </div>
            </div>
            
        </div>
        
    );
}

export default DataUpdateStatus; 