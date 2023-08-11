import React, { useContext, useReducer, createContext } from 'react';
import { createRandomEvent } from '../utils';

const LiveChartContext = createContext();

const initialEvents = Array.from(Array(50)).map((_, ix) => createRandomEvent(ix));

const initialData = {
    events: initialEvents,
    isPlaying: true
}

const liveChartReducer = (state, action) => {
    switch (action.type) {
        case 'new_event':
            if (!state.isPlaying) {
                return {
                    events: [...state.events],
                    isPlaying: state.isPlaying
                }
            }
            return {
                events: [...state.events, action.payload],
                isPlaying: state.isPlaying
            }
        case 'pause':
            return {
                events: [...state.events],
                isPlaying: action.isPlaying
            }
        case 'update_event':
            const index = state.events.findIndex((element) => element.index === action.index)
            state.events[index][action.value] = action.newValue
            return {
                events: [...state.events],
                isPlaying: state.isPlaying
            }
        case 'reset_events':
            return {
                events: initialData.events,
                isPlaying: state.isPlaying
            }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};

const LiveChartProvider = ({ children }) => {
    const [data, dispatch] = useReducer(liveChartReducer, initialData);
    return (
        <LiveChartContext.Provider
            value={{
                data,
                dispatch
            }}>
            {children}
        </LiveChartContext.Provider>
    );
};

const useLiveChartContext = () => {
    const context = useContext(LiveChartContext);
    if (!context) {
        throw new Error('useLiveChartContext should be used within an LiveChartProvider');
    }

    return context;
};

export { LiveChartProvider, useLiveChartContext };
