import mongoose from "mongoose";

/**
 * 0 = Dissconnected
 * 1 = Connected
 * 2 = Connecting
 * 3 = Disconnecting
 */


const mongooConncection = {
    isConnected: 0
}


export const connect = async () => {

    if(mongooConncection.isConnected) {
        return;
    }

    if(mongoose.connections.length > 0) {
        mongooConncection.isConnected = mongoose.connections[0].readyState;

        if(mongooConncection.isConnected === 1) {
            return;
        }

        await mongoose.disconnect();
    }

    await mongoose.connect(process.env.MONGO_URL || '');
    mongooConncection.isConnected = 1;
    console.log('MongoDB connected');

}

export const disconnect = async () => {

    if (mongooConncection.isConnected === 0 ){
        await mongoose.disconnect();
        mongooConncection.isConnected = 0;
        console.log('MongoDB disconnected');
    }
    
}

