import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import type { NextPage } from 'next'
import { Layout } from '../components/layouts';
import { EntryList, NewEntry } from '../components/ui';

const HomePage: NextPage = () => {
  return (
    <>
      {/* <Typography variant='h1' color='primary'>Hola Mundo</Typography> */}
      <Layout title='Home - OpenJira'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card sx={{height: 'calc(100vh - 100px)'}}>
              <CardHeader title="Pendientes"/>
              <CardContent>
                {/* Agregar una nueva entrada*/}
                {/* Estado de las entradas*/}
                <NewEntry />
                <EntryList status='pending'/>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{height: 'calc(100vh - 100px)'}}>
              <CardHeader title="En Progreso"/>
              <CardContent>
                <EntryList status='in-progress'/>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{height: 'calc(100vh - 100px)'}}>
              <CardHeader title="Terminadas"/>
              <CardContent>
                <EntryList status='finished'/>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Layout>
    </>
  )
}

export default HomePage;
