import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '../../database';
import {Entry} from '../../models';

type Data = {
    msg: string
}

export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {

    if(process.env.NODE_ENV === 'production') {
        return res.status(401).json({ msg: 'Not allowed in production' });
    }

    await db.connect();

    //Carga forzada de seeds de prueba
    await Entry.deleteMany();
    await Entry.insertMany(seedData.entries)

    await db.disconnect();

    res.status(200).json({ msg: 'Proceso realizado correctamente' })
}