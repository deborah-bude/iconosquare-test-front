import React, {useEffect, useState} from 'react';
import LiveTable from './LiveTable';
import LiveChart from './LiveChart';
import {useLiveChartContext} from "../utils/hooks/useLiveChartContext";
import {createRandomEvent} from "../utils/utils";

const Content = () => {
    const [isPlay, setIsPlay] = useState(true)
    const { dispatch, data } = useLiveChartContext()
    const [navEvents, setNavEvents] = useState(0)

    const nbTotalEvents = data?.events?.length
    const eventsFiltered = data.events.slice(nbTotalEvents - 20 + navEvents, nbTotalEvents + navEvents);

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

    function resetAllValue () {
        dispatch({
            type: 'reset_all_events',
        })
    }

    function resetValue () {
        dispatch({
            type: 'reset_modified_events',
        })
    }

    function prevEvents() {
        if ((nbTotalEvents + navEvents) <= 20) {
            setNavEvents((value) => value + 1)
        }
        setNavEvents((value) => --value)
    }

    function nextEvents() {
        if (navEvents >= 0) {
            setNavEvents(-1)
        }
        setNavEvents((value) => ++value)
    }

    return (
        <div className="mx-auto max-w-7xl px-8">
            <div className="flex flex-row flex-wrap justify-around">
                <button onClick={prevEvents} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50" {...((nbTotalEvents + navEvents) <= 20 && {disabled:true})}>Previous</button>
                <button onClick={() => {
                    setIsPlay((value) => !value)
                }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">{isPlay ? "Pause" : 'Play'}</button>
                <button onClick={() => resetAllValue()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Reset all value</button>
                <button onClick={() => resetValue()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Reset value modified</button>
                <button onClick={nextEvents} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50" {...(navEvents === 0 && {disabled:true})}>Next</button>
            </div>
            <LiveChart data={eventsFiltered} />
            <LiveTable data={eventsFiltered} />
        </div>
    )
}

export default Content;