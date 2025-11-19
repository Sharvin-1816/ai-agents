const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const connDb = require('./config/db');
const authRoutes = require('./routes/authRoute');
const demoRoutes = require('./routes/demoRoute');
const excelUploadRoutes = require('./routes/excelRoute')

dotenv.config();

app.use(express.json());
app.use(cors());
connDb();
app.listen(process.env.PORT_NO,()=>{
    console.log(`Server running on port no ${process.env.PORT_NO}`);
})

app.get('/',(req,res)=>{
    res.json({
        message:"Hello There"
    })
})
app.use('/auth',authRoutes);
app.use('/api',demoRoutes);
app.use('/api',excelUploadRoutes);