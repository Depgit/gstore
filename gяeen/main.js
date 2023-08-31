import dotenv from 'dotenv';
import config from './config/config.js';
import singleton from './singletons/index.js';
import express  from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet'
import fileUpload from 'express-fileupload';
import cacheProvider from './cache/provider.js';
import auth from './services/auth/index.js'
import AdminAuthMiddleware from './middleware/adminAuthMiddleware.js';
import s3Store from './singletons/aws.js';
import product from './services/product/index.js';

// (async () => {
//     try {
        // init env 
        dotenv.config()
        
        // config init
        let Config = config.Config
        
        // logger init
        // let log    = singleton.log;
        
        // db init
        await singleton.db.init()

        // // server init
        const app = express()

        // server setup
        server(app);
        
        // reddis setup
        cacheProvider.Init()

        // aws init
        await s3Store.Init();

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

    // Heartbeat route
    app.get('/', (req, res) => {
        res.status(200).json(Heartbeat());
    });
    
    // Common routes
    const commonRoutes = express.Router();
    addV1Routes(commonRoutes); 
    app.use('/v1', commonRoutes);
    
    // User routes with AuthMiddleware
    // const userRoutes = express.Router();
    // userRoutes.use(AuthMiddleware());
    // addV1UserRoutes(userRoutes);
    // app.use('/v1/user', userRoutes);
    
    // // Admin routes with AdminAuthMiddleware
    const adminRoutes = express.Router();
    adminRoutes.use(AdminAuthMiddleware);
    addV1AdminRoutes(adminRoutes);
    app.use('/v1/admin', adminRoutes);
    
    // // Admin protected routes with BearerTokenMiddleware
    // const adminProtectedRoutes = express.Router();
    // adminProtectedRoutes.use(BearerTokenMiddleware());
    // addV1AdminRoutes(adminProtectedRoutes);
    // app.use('/v1/admin/protected', adminProtectedRoutes);
    
    // // Bearer token protected routes
    // const bearerTokenProtectedRoutes = express.Router();
    // bearerTokenProtectedRoutes.use(BearerTokenMiddleware());
    // addV1BearerTokenRoutes(bearerTokenProtectedRoutes);
    // app.use('/v1/internal', bearerTokenProtectedRoutes);
    
    // Set environment mode
    app.set('env', process.env.env === 'prod' ? 'production' : 'development');


    const PORT = Config.Env.PORT
    app.listen(PORT, () => singleton.log.info(`[main]`,`Server started on port ${PORT}`));

}

let startTime = new Date();

// Heartbeat returns details of the instance running
function Heartbeat() {
  const uptime = new Date() - startTime;
  const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
  const formattedUptime = new Date(uptime).toISOString().substr(11, 8);
  return `${days} days ${formattedUptime}`;
}

function addV1Routes(r){
    r.post("/auth/singup",auth.SignUp)
    r.post("/auth/login",auth.Login)
	r.post("/auth/otp/validate", auth.ValidateOtp)
	r.get("/auth/logout", auth.Logout)
	// r.post("/auth/get", auth.CheckToken)

}

function addV1AdminRoutes(r){
    r.post("add/product",product.AddProduct)
    
}

// function test(req,res){
//     console.log({res});
//     return null;
// }




export default app
