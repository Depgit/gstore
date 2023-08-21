import dotenv from 'dotenv';
import config from './config/config.js';
import singleton from './singletons/index.js';
import express  from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet'
import fileUpload from 'express-fileupload';
import reddis from './cache/provider.js';



// (async () => {
//     try {
        // init env 
        dotenv.config()
        
        // config init
        let Config = config.Config
        
        // logger init
        let log    = await singleton.log.initLogger();
        
        // db init
        await singleton.db.init()

        // // server init
        const app = express()

        // // server setup
        server(app);
        
        // // reddis setup
        let Reddis = reddis
        
//     } catch (err) {
//         console.error('Got error while initializing ', err);
//         process.exit(1);
//     }
// })();


function server(app) {
    app.use(bodyParser.json());
    app.use(fileUpload());
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.use(cookieParser());
    app.use(cors());
    app.use(
        helmet.contentSecurityPolicy({
            directives: {
                "default-src": ["'self'"],
                "base-uri": ["'self'"],
                "font-src": ["'self'", "https:", "data:"],
                "img-src": ["'self'", "data:", "http://res.cloudinary.com"],
                "frame-ancestors": ["'self'"],
                "script-src": ["'self'","https://cdn.jsdelivr.net",],
                "script-src-attr": ["'none'"],
                "style-src": ["'self'", "https:", "'unsafe-inline'"],
            }
        })
    )
    const PORT = Config.Env.PORT
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

}




export default app
