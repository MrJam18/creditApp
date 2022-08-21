const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const sequelize = require('./db');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/errorHandlingMiddleware');
const { clientApi } = require('./utils/adresses');
// const userService = require('./services/userService');



const app = express();


const PORT = process.env.PORT || 5000;
app.use(express.json()); 
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: clientApi
}));
// app.use(fileUpload({}));
app.use('/api', router);// router must be almost last!
app.use(errorHandler)  // middleware must be last!
const start = async () => {
    try {

        await sequelize.authenticate();
        // await sequelize.sync({alter: true});
        app.listen(PORT, () => console.log('server started on port ' + PORT));
    }
    catch(e) {
        console.log(e)

    }
}

start();


// userService.registration('Can.David.Mamedov@icloud.com', '11052013d', 'admin', 'David', 'Mamedov', 'admin', 1);

