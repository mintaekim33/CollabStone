import * as prioritiesAPI from '../api/priorities'

export async function submitPriority(priorityData: any) {
    const data = await prioritiesAPI.createPriority(priorityData);
    return data;
}