import mongoose from "mongoose";
import config from "../config/config";

// database init
async function init(){
    try {
        console.log("configuring DB ");
        await mongoose.connect(config.Config.Databases.Main.Host, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("mongo connected");
    } catch (err) {
        console.error("got eror while initialzing db ",err);
        process.exit(1);
    }    
}

export default {
    init
}
