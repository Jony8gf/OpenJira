import { createContext, FC, useEffect, useReducer } from 'react';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';
import { entriesApi } from '../../apis';

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
    
    const addNewEntry = async (description: string) => {
        // const newEntry: Entry = {
        //     _id: uuidv4(),
        //     description: description,
        //     createdAt: Date.now(),
        //     status: 'pending'
        // }
        const {data} = await entriesApi.post<Entry>('/entries', {description: description});
        dispatch({type: '[Entry] Add-Entry', payload: data})
    } 

    const updateEntry = async ({_id, description, status}:Entry) => {
        try{
            const {data} = await entriesApi.put<Entry>(`/entries/${_id}`, {description: description, status: status});
            dispatch({type: '[Entry] Update-Entry', payload: data})
        }catch(error){
            console.log({error});
        }
    }

    const refreshEntries = async () => {
        const {data} = await entriesApi.get<Entry[]>('/entries');
        // console.log(resp)
        dispatch({type: '[Entry] Refresh-Data', payload: data });
    }

    useEffect(() => {
        refreshEntries();
    },[]);

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