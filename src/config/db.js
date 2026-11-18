const mongoose =require("mongoose")

const connectDB= async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongodb connected succesfully")
    } catch (error) {
        console.log("failed during connect with DB")
        process.exit(1);
    }
}

module.exports = connectDB ;