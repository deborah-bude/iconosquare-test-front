import React, {useEffect, useState} from 'react';
import LiveTable from './LiveTable';
import LiveChart from './LiveChart';
import {useLiveChartContext} from "../utils/hooks/useLiveChartContext";
import {createRandomEvent} from "../utils/utils";

const Content = () => {
    const [isPlay, isPlayState] = useState(true)
    const { dispatch, data } = useLiveChartContext()

    useEffect(() => {
        if (!isPlay) {
            const intervalId = setInterval(() => {
                dispatch({
                    type: 'pause',
                    payload: createRandomEvent(data),
                })
            }, 10)
            return () => clearInterval(intervalId)
        }
    }, [isPlay])

    function resetValue () {
        dispatch({
            type: 'reset_events',
        })
    }

    return (
        <div className="mx-auto max-w-7xl px-8">
            <button onClick={() => {
                isPlayState((value) => !value)
            }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">{isPlay ? "Pause" : 'Play'}</button>
            <button onClick={() => resetValue()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Reset value</button>
            <LiveChart />
            <LiveTable />
        </div>
    )
}

export default Content;