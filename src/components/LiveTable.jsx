import React, {useEffect, useState} from 'react';
import { useLiveChartContext } from '../utils/hooks/useLiveChartContext';
import {createRandomEvent} from "../utils/utils";

const LiveTable = props => {
    const { dispatch, data } = useLiveChartContext();
    const nbTotalEvents = data?.events?.length
    const eventsFiltered = data.events.slice(nbTotalEvents - 20, nbTotalEvents);
    const [valueEdit, valueEditState] = useState()
    //let newData = data.map()

    function updateValue(e, index) {
        valueEditState(e.target.innerText)
        const dataValue = e.target.classList
        //const newValue= data[index].value1 = valueEdit
    }

    function sendValue() {
        /*dispatch({
            type: 'update_event',
            payload: createRandomEvent(data),
        })*/
    }

    return (
        <>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="edit">Edit value</label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" id="edit" name="Edit value" value={valueEdit} onChange={(e) => valueEditState(e.target.value)}/>
                <button onClick={sendValue} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Submit</button>
            </div>
            <div className="flex border border-gray-300 rounded">
                <div>
                    <div className="p-2">Index</div>
                    <div className="p-2 border-t border-gray-300">Value 1</div>
                    <div className="p-2 border-t border-gray-300">Value 2</div>
                </div>
                {eventsFiltered.map((event) => (
                    <div key={event.index} className="border-l border-gray-300 flex-1">
                        <div className="p-2">{event.index}</div>
                        <div onClick={(e) => {updateValue(e, event.index)}} className="value-1 p-2 border-t border-gray-300">{event.value1}</div>
                        <div onClick={(e) => {updateValue(e, event.index)}} className="value-2 p-2 border-t border-gray-300">{event.value2}</div>
                    </div>
                ))}
            </div>
        </>
    );
};

LiveTable.propTypes = {
    
};

export default LiveTable;