const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');


const app = express();

require('./config/sqlite')(app);
// require('./routerHandler')(app);


app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/api',(req, res) => {
    res.json({
        message: 'Ananymous developers'

    });
});



const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{console.log(`Server is runing on ${PORT}`)});
