const path = require("path")
const express = require("express")
const app = express();
const cors = require("cors")
const mongoose = require("mongoose");
const colors = require("colors")
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json()); 

const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URI)
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connect: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

connectDB();

app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/noteRoute"))


app.listen(port, function() {
    console.log(`listening on port ${port}`)
})

