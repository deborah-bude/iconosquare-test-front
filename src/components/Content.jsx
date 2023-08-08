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

    return (
        <div className="mx-auto max-w-7xl px-8">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => {
                isPlayState((value) => !value)
            }}>{isPlay ? "Pause" : 'Play'}</button>
            <LiveChart />
            <LiveTable />
        </div>
    )
}

export default Content;