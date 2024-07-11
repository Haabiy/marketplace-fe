import React from "react";
import data_library from '../Assets/data_library.svg'

function DataUpdateStatus(x){
    return(
        <>
        <div className="bg-white border border-gray-100 shadow-sm min-h-8 w-h-extra h-44 rounded-xl p-4 relative top-20 flex flex-col">
            <div className="flex flex-row gap-1 relative left-3 top-1 mb-4 font-satoshi text-sm font-thin"><img src={data_library} alt="" /> {x.section}</div>
            <div className="relative left-4 top-1 flex flex-row gap-16 font-satoshi">
                <div>{x.t1}
                    <div className="flex flex-col mt-4 text-sm">
                        <div className="font-thin font-roboto">Past {x.d1} days</div>
                        <div className="text-blue-600 font-satoshi font-normal">{x.s1} Sources</div>
                    </div>
                </div>
                <div>{x.t2}
                <div className="flex flex-col mt-4 text-sm">
                        <div className="font-roboto font-thin ">Past {x.d2} days</div>
                        <div className="text-blue-600 font-satoshi font-normal">{x.s2} Sources</div>
                    </div>
                </div>
                <div>{x.t3}
                <div className="flex flex-col mt-4 text-sm">
                        <div className="font-thin font-roboto">Past {x.d3} days</div>
                        <div className="text-blue-600 font-satoshi font-normal">{x.s3} Sources</div>
                    </div>
                </div>
            </div>
        </div>
        </>
        
    );
}

export default DataUpdateStatus; 