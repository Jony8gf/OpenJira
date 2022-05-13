import { List, Paper } from '@mui/material'
import { FC, useContext, useMemo } from 'react';
import { EntriesContext } from '../../context/entries';
import { EntryStatus } from '../../interfaces'
import { EntryCard } from './EntryCard'

interface Props {
  status: EntryStatus;
}

export const EntryList:FC<Props> = ({status}) => {

  const { entries } = useContext(EntriesContext);

  const entryByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries])

  return (
    <div>
        <Paper sx={{ height: 'calc(100 - 180px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '1px 5px' }}>
            <List sx={{opacity: 1}}>
                {
                  entryByStatus.map(entry => (
                    <EntryCard key={entry._id} entry={entry} />
                  ))
                }
            </List>    
        </Paper>
    </div>
  )
}
