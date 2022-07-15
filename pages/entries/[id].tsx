import React, { ChangeEvent, useMemo, useState } from 'react'
import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from '@mui/material'
import { Layout } from '../../components/layouts'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { EntryStatus } from '../../interfaces';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

export const EntryPage = () => {

    const [inputValue, setInputValue] = useState('');
    const [status, setStatus] = useState<EntryStatus>('pending');
    const [touched, setTouched] = useState(false);

    const isNotValid = useMemo(() => inputValue.length <=0 && touched, [inputValue, touched]);

    const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    }

    const onStatusChanged =  (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        //console.log(event.target.value)
        setStatus(event.target.value as EntryStatus);

    }

    const onSave = () => {
        console.log({inputValue , status})
    }


  return (
    <Layout title='.... .... ...'>
        <Grid
            container
            justifyContent='center'
            sx={{marginTop: 2}}
        >
            <Grid 
                item 
                xs={12} sm={8} md={6}
                >
                    <Card>
                        <CardHeader 
                            title={`Entrada: ${inputValue}`}
                            subheader={`Crada hace ... minutos`}
                        />
                        <CardContent>
                            <TextField
                                sx={{marginTip:2, marginBottom:1}}
                                fullWidth
                                autoFocus
                                multiline
                                label="Nueva Entrada"
                                placeholder='Nueva Entrada'
                                value={inputValue}
                                onChange={onTextFieldChanged}
                                helperText={isNotValid && 'Ingrese un valor'}
                                error={isNotValid}
                                onBlur={() => setTouched(true)}
                            />
                            
                            <FormControl>
                                <FormLabel>Estado:</FormLabel>
                                <RadioGroup
                                    row
                                    onChange={onStatusChanged} 
                                    value={status}
                                >
                                    {validStatus.map(x => (
                                        <FormControlLabel 
                                            key={x}
                                            value={x}
                                            control={<Radio/>}
                                            label={capitalize(x)}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>

                            <CardActions>
                                <Button
                                    startIcon={<SaveOutlinedIcon/>}
                                    variant="contained"
                                    fullWidth
                                    onClick={onSave}
                                    disabled={inputValue.length <= 0}
                                >
                                    Save
                                </Button>
                            </CardActions>
                        </CardContent>
                    </Card>

            </Grid>

        </Grid>

        <IconButton
            sx={{
                position:'fixed',
                bottom:30,
                right:30,
                backgroundColor: 'red'
            }} 
        >
            <DeleteOutlineOutlinedIcon />
        </IconButton>

    </Layout>
  )
}

export default EntryPage