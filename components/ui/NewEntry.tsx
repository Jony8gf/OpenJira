import { Button, TextField, Box } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import { ChangeEvent, useContext, useState } from 'react';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';


export const NewEntry = () => {


    const {addNewEntry} = useContext(EntriesContext);
    const {isAddingEntry, setIsAddingEntry} = useContext(UIContext);

    // const [isAdding, setIsAdding] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isTouch, setIsTouch] = useState(false);

    const onTextChanged = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    }

    const onSave = () => {
        if(inputValue.length === 0) return;
        addNewEntry(inputValue);
        setIsAddingEntry(false);
        setIsTouch(false);
        setInputValue("");
    }

  return (
    <Box sx={{marginBottom: 2, paddingX: 2}}>

        {isAddingEntry ? (
            <>
                <TextField 
                    fullWidth
                    sx={{marginTop: 2, marginBottom: 2}} 
                    placeholder='Descripción' 
                    autoFocus
                    multiline
                    label='Nueva entrada'
                    helperText={inputValue.length <= 0 && isTouch && 'Ingrese un valor'}
                    error={inputValue.length <= 0 && isTouch}
                    value={inputValue}
                    onChange={onTextChanged}
                    onBlur={() => setIsTouch(true)}
                >

                </TextField>

                <Box display="flex" justifyContent="space-between">
                    <Button variant='outlined' color='error' onClick={ () => {setIsAddingEntry(false), setInputValue(""), setIsTouch(false)}}>
                        Cancelar
                    </Button>
                    <Button variant='outlined' color='secondary' endIcon={<SaveIcon/>} onClick={onSave}>
                        Guardar
                    </Button>
                </Box>
            </>
        ) : (
            <Button
                startIcon={<AddIcon />}
                fullWidth
                variant='outlined'
                onClick={ () => setIsAddingEntry(true)}
            >
                Agregar tarea
            </Button>

        )}
        
        
    </Box>
  )
}
