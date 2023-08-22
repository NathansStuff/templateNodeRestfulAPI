import mongoose, { Mongoose } from 'mongoose';

import { MONGO_URI } from '@/constants';

let cachedConn: Mongoose | null = null;

export async function mongoDBConnect(): Promise<Mongoose> {
    if (cachedConn) {
        return cachedConn;
    }

    const opts = {
        bufferCommands: true,
    };

    const conn = await mongoose.connect(MONGO_URI, opts);
    cachedConn = conn;

    return conn;
}
