import mongoose from "mongoose";

export default function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB connected");
            
        })
        connection.on('error', (err) => {
            console.error("Error while connecting to the DB", err);
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong while connecting to DB");
        console.error("Connection Error: ", error);
        
    }
}