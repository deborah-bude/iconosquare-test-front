import React, { useContext, useReducer, createContext } from 'react';
import { createRandomEvent } from '../utils';

const LiveChartContext = createContext();

const initialEvents = Array.from(Array(50)).map((_, ix) => createRandomEvent(ix));

const initialData = {
    events: [...initialEvents],
    initialData: [...initialEvents],
    isPlaying: true
}

const liveChartReducer = (state, action) => {
    switch (action.type) {
        case 'new_event':
            if (!state.isPlaying) {
                return {
                    events: [...state.events],
                    initialData: [...state.initialData],
                    isPlaying: state.isPlaying
                }
            }
            return {
                events: [...state.events, action.payload],
                initialData: [...state.initialData, action.payload],
                isPlaying: state.isPlaying
            }
        case 'pause':
            console.log(state)
            return {
                events: [...state.events],
                initialData: [...state.initialData],
                isPlaying: action.isPlaying
            }
        case 'update_event':
            const index = state.events.findIndex((element) => element.index === action.index)
            console.log(state.initialData)
            state.events[index][action.value] = action.newValue
            return {
                events: [...state.events],
                initialData: [...state.initialData],
                isPlaying: state.isPlaying
            }
        case 'reset_all_events':
            return {
                events: [...initialData.events],
                isPlaying: state.isPlaying
            }
        case 'reset_modified_events':
            console.log(state)
            return {
                events: [...state.initialData],
                initialData: [...state.initialData],
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
