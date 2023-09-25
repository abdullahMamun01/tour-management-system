const express =  require("express")
const {globalErrorHandler,notFound} = require("./utils/globalError")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const connectDB = require("./db/db")
const routes = require("./routes/index")
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use(routes)

app.get("/" , (req,res,next) =>{
    res.json({message: "Tour management system"})
})
app.use(notFound)
app.use(globalErrorHandler)



connectDB('mongodb://127.0.0.1:27017/tour-management')
.then(async () =>{
    console.log('database connected successfully')
    app.listen(4000,() =>{
        console.log("server listening from 4000 port")
    })
})
.catch(e =>console.log(e))