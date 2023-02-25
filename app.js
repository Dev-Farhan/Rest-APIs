import express from 'express';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
import userRouter from "./routes/userRouter.js"
app.use("/user",userRouter)

app.listen(3001);
console.log("Server Running On POrt 3001");