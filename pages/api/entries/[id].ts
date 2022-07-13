import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = 
| { message: string }
| IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const {id} = req.query;
    if(!mongoose.isValidObjectId(id)) res.status(400).json({ message: 'El id no existe ' + id })

    switch (req.method) {
        case 'PUT':
            return updateEntry (req, res);
        case 'GET':
                return getEntry (req, res);
        default:
            res.status(400).json({ message: 'Metodo no existe'})
    }

    res.status(200).json({ message: 'Example' })
}


const updateEntry = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const {id} = req.query;
    await db.connect();
    const entryToUpdate = await Entry.findById(id);

    if(!entryToUpdate){
        await db.disconnect();
        res.status(400).json({ message: 'El id no existe ' + id })
    }

    const {
        description = entryToUpdate?.description,
        status = entryToUpdate?.status
    } = req.body;
    
    try{
        const updateEntry = await Entry.findByIdAndUpdate(id.toString(), {description, status}, {runValidators: true, new: true})
        await db.disconnect();
        return res.status(200).json(updateEntry!);
    }
    catch(error: any){
        console.log(error)
        await db.disconnect();
        res.status(400).json({message: error.errors.status.message});
    }
    // console.log(id.toString())  
}

const getEntry = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {id} = req.query;
    await db.connect();
    const entryInDb = await Entry.findById(id);
    await db.disconnect();

    if(!entryInDb){
        res.status(400).json({ message: 'El id no existe ' + id })
    }

    return res.status(200).json(entryInDb!);
}