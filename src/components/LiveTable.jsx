import React, {useEffect, useState} from 'react';
import { useLiveChartContext } from '../utils/hooks/useLiveChartContext';
import {createRandomEvent} from "../utils/utils";

const LiveTable = (eventsFiltered) => {
    const { dispatch, data } = useLiveChartContext();
    //const nbTotalEvents = data?.events?.length
    //const eventsFiltered = data.events.slice(nbTotalEvents - 20, nbTotalEvents);

    const [editValue, setValueModify] = useState(false)
    const [valueEdit, setValueEdit] = useState()
    const [valueNumberEdit, setValueNumberEdit] = useState()
    const [indexCell, setIndexCell] = useState(0)

    function updateValue(e, index) {
        setValueModify(true)
        setValueEdit(e.target.innerText)
        setValueNumberEdit(e.target.classList[0])
        setIndexCell(index)
    }

    function sendValue() {
        dispatch({
            type: 'update_event',
            payload: data,
            index: indexCell,
            newValue: valueEdit,
            value: valueNumberEdit
        })
        setValueModify(false)
    }

    return (
        <>
            {editValue &&
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="edit">Edit value</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" id="edit" name="Edit value" value={valueEdit} onChange={(e) => setValueEdit(e.target.value)}/>
                    <button onClick={sendValue} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Submit</button>
                    <button onClick={() => setValueModify(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Close</button>
                </div>
            }
            <div className="flex border border-gray-300 rounded">
                <div>
                    <div className="p-2">Index</div>
                    <div className="p-2 border-t border-gray-300">Value 1</div>
                    <div className="p-2 border-t border-gray-300">Value 2</div>
                </div>
                {eventsFiltered.data.map((event) => (
                    <div key={event.index} className="border-l border-gray-300 flex-1">
                        <div className="p-2">{event.index}</div>
                        <div onClick={(e) => {updateValue(e, event.index)}} className="value1 p-2 border-t border-gray-300">{event.value1}</div>
                        <div onClick={(e) => {updateValue(e, event.index)}} className="value2 p-2 border-t border-gray-300">{event.value2}</div>
                    </div>
                ))}
            </div>
        </>
    );
};

LiveTable.propTypes = {
    
};

export default LiveTable;