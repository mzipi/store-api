import express, { json, urlencoded } from "express";

import cartsRouter from "./routes/carts-router.js";
import ordersRouter from "./routes/orders-router.js";
import productsRouter from "./routes/products-router.js";
import usersRouter from "./routes/users-router.js";
import missingRoutes from './routes/missing-routes-router.js';
import loginRouter from './routes/login-router.js';
import logoutRouter from './routes/logout-router.js';
import signupRouter from './routes/signup-router.js';
import failLoginRouter from './routes/fail-login-router.js';
import failSignupRouter from './routes/fail-signup-router.js';

import sessionHandler from './app/middlewares/session-middleware.js';
// import { passportMiddleware, passportSessionHandler } from "./middlewares/passport-middleware.js";

const app = express();

app.use(json());
app.use(urlencoded({extended: true}));
app.use(express.static('src/static'));
app.use(sessionHandler);
// app.use(passportMiddleware);
// app.use(passportSessionHandler);
app.use('/api/shoppingcartproducts', cartsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/signup', signupRouter);
app.use('/faillogin', failLoginRouter);
app.use('/failsignup', failSignupRouter);
app.use('*', missingRoutes);

export default app;