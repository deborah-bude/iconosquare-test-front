import React, {useState} from 'react';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { useLiveChartContext } from '../utils/hooks/useLiveChartContext';

const LiveChart = (eventsFiltered) => {
    const { dispatch, data } = useLiveChartContext();
    //const nbTotalEvents = data?.events?.length
    //const eventsFiltered = data.events.slice(nbTotalEvents - 20, nbTotalEvents);

    const [valueEdit, setValueEdit] = useState("")
    const [editValue, setValueModify] = useState(false)
    const [indexCell, setIndexCell] = useState(0)

    function sendValue () {
        dispatch({
            type: 'update_event',
            payload: data,
            index: indexCell,
            newValue: valueEdit,
            value: "value1"
        })
        setValueModify(false)
    }

    return (
        <div className="mb-8">
            {editValue &&
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="edit">Edit value 1</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" id="edit" name="Edit value" value={valueEdit} onChange={(e) => setValueEdit(e.target.value)}/>
                    <button onClick={sendValue} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Submit</button>
                    <button onClick={() => setValueModify(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Close</button>
                </div>
            }
            <ResponsiveContainer height={250}>
                <AreaChart
                    onClick={(e) => {
                        if(e === null) {
                            return
                        }
                        setValueModify(true)
                        setValueEdit(e.activePayload[0].payload.value1)
                        setIndexCell(e.activeLabel)
                        console.log(e.activeTooltipIndex)
                    }}
                    data={eventsFiltered.data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="index" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="value1"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#colorUv)"
                    />
                    <Area
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="value2"
                        stroke="#82ca9d"
                        fillOpacity={1}
                        fill="url(#colorPv)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

LiveChart.propTypes = {
    
};

export default LiveChart;