import { mongoDBConnect } from '@/middleware/mongoDbConnect';

import { LogModel } from './logModel';
import { Log, LogWithId } from './logType';

// Get all Logs
export async function findAllLogs(): Promise<LogWithId[]> {
    await mongoDBConnect();
    return await LogModel.find();
}

// Get Log by ID
export async function findLogById(id: string): Promise<LogWithId | null> {
    await mongoDBConnect();
    return await LogModel.findById(id);
}

// Create a new Log
export async function createLog(LogData: Log): Promise<LogWithId> {
    await mongoDBConnect();
    return await LogModel.create(LogData);
}

// Update Log by ID
export async function updateLogById(id: string, updatedData: Partial<Log>): Promise<LogWithId | null> {
    await mongoDBConnect();
    return await LogModel.findByIdAndUpdate(id, updatedData, { new: true });
}

// Delete Log by ID
export async function deleteLogById(id: string): Promise<void | null> {
    await mongoDBConnect();
    return await LogModel.findByIdAndDelete(id);
}
