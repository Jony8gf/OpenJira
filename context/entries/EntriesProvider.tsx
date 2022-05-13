import { createContext, FC, useReducer } from 'react';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';
import { v4 as uuidv4 } from 'uuid';

export interface EntriesState{
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Pending: Entry 1',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            _id: uuidv4(),
            description: 'Progress: Entry 2',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            _id: uuidv4(),
            description: 'Finish: Entry 3',
            status: 'finished',
            createdAt: Date.now() - 10000,
        },
        {
            _id: uuidv4(),
            description: 'Finish: Entry 4',
            status: 'finished',
            createdAt: Date.now() - 1000,
        },
    ],
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

    return (
        <EntriesContext.Provider value={{
            ...state,

            //Metodos
            addNewEntry,
        }}>
            {children}
        </EntriesContext.Provider>
    )
}