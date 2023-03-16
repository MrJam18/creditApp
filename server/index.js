const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const sequelize = require('./db');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/errorHandlingMiddleware');
const { clientApi } = require('./utils/adresses');
const {fixture} = require("./fixture");
const deleteCycle = require('./utils/deleteCycle');
const {ExecutiveDocTypes} = require("./models/connections");

Array.prototype.asyncForEach = async function (callback) {
    for(let i = 0;i < this.length; i++) {
        const el = this[i];
        await callback(el, i);
    }
}
Array.prototype.deleteCycle = deleteCycle;

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
        // await fixture();
        app.listen(PORT, () => console.log('server started on port ' + PORT));
    }
    catch(e) {
        console.log(e)
    }
}

start();


// userService.registration('mr.jam18@yandex.ru', '7262dD4600', 'admin', 'Jamil', 'Mamedov', 'admin', 1);

