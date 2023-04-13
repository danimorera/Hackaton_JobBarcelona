const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { mongoConnect } = require('../db/db.config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.path = {
            auth: '/api/auth',
            users: '/api/users'
        };
        this.connectDB();
        this.middlewares();
        this.routes();
    }

    async connectDB() {
        await mongoConnect();
    }

    middlewares() {
        //TODO check the cors origin
        this.app.use(cors({ origin: "*" }));
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes(){
        this.app.use(this.path.auth, require('../routes/auth.routes'));
        this.app.use(this.path.users, require('../routes/users.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running in port ', this.port)
        })
    }
}

module.exports = Server;