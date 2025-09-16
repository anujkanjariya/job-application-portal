const dotenv = require('dotenv')
dotenv.config();
const app = require('./src/app');

const PORT = process.env.PORT || 3636;

app.listen(PORT, ()=>
    console.log(`server is running on port ${PORT}`)
)