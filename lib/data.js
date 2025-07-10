import { connectDB } from "./connectDB";

export const getTrafficSigns = async () => {
    try {
        connectDB();
        const trafficSigns = await TrafficSign.find();
        return trafficSigns;
    } catch (error) {
        console.log('Error in getTrafficSigns:', error);
        throw new Error(error);
    }
}