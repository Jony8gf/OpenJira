import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { FC, useContext } from 'react';
import { UIContext } from '../../context/ui';
import { Entry } from '../../interfaces';

interface Props {
  entry: Entry;
}

export const EntryCard:FC<Props> = ({entry}) => {


  const {startDragging, endDragging}= useContext(UIContext);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', entry._id);
    //e.dataTransfer.effectAllowed = 'move';
    startDragging();
  }

  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    endDragging();
  }

  return (
    <Card sx={{ marginBottom: 1}}
      draggable={true}
      onDragStart={onDragStart}
    >
        <CardActionArea>
            <CardContent>
                <Typography sx={{ whiteSpace: 'pre-line'}}>{entry.description}</Typography>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'end', paddingRight: '2' }}>
                <Typography  variant='body2' >Hace 30 minutos </Typography>
            </CardActions>
        </CardActionArea>
    </Card>
  )
}
