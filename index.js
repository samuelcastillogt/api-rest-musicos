const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require('body-parser');
app.set("port", process.env.PORT || 3000)
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use(require("./routes"))

app.listen(app.get("port"), ()=>{
    console.log("Hola")
})


