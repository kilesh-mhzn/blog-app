import mongoose from "mongoose"

const connectDB =(url) => {
    mongoose.connect(url).catch((e)=>{
        console.log(e)
    })
}

export default connectDB