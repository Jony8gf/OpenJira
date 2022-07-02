import { createContext, FC, useReducer } from 'react';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';
import { v4 as uuidv4 } from 'uuid';

export interface EntriesState{
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}

interface Props {
    children?: React.ReactNode | undefined,
}

export const EntriesProvider:FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)
    
    const addNewEntry = (description: string) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description: description,
            createdAt: Date.now(),
            status: 'pending'
        }
        dispatch({type: '[Entry] Add-Entry', payload: newEntry})
    } 

    const updateEntry = (entry: Entry) => {
        dispatch({type: '[Entry] Update-Entry', payload: entry})
    }

    return (
        <EntriesContext.Provider value={{
            ...state,

            //Metodos
            addNewEntry,
            updateEntry
        }}>
            {children}
        </EntriesContext.Provider>
    )
}