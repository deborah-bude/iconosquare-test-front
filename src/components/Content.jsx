import React, {useEffect, useState} from 'react';
import LiveTable from './LiveTable';
import LiveChart from './LiveChart';
import {useLiveChartContext} from "../utils/hooks/useLiveChartContext";
import {createRandomEvent} from "../utils/utils";

const Content = () => {
    const [isPlay, setIsPlay] = useState(true)
    const { dispatch, data } = useLiveChartContext()

    useEffect(() => {
        if (!isPlay) {
                dispatch({
                    type: 'pause',
                    isPlaying: !isPlay
                })
        }
        dispatch({
            type: 'pause',
            isPlaying: isPlay
        })
    }, [isPlay])

    function resetValue () {
        dispatch({
            type: 'reset_events',
        })
    }

    return (
        <div className="mx-auto max-w-7xl px-8">
            <button onClick={() => {
                setIsPlay((value) => !value)
            }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">{isPlay ? "Pause" : 'Play'}</button>
            <button onClick={() => resetValue()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Reset value</button>
            <LiveChart />
            <LiveTable />
        </div>
    )
}

export default Content;