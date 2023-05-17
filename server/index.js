import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';

import schema from './graphQl/schema/schema.js';

import connectDB from './db/config.js';
import userRoutes from './Routes/Dashboard/users.js';
import dashboardPostRoutes from './Routes/Dashboard/posts.js';
import publicPostRoutes from './Routes/Public/posts.js';
import authRoutes from './Routes/auth.js';
import cors from 'cors';

dotenv.config();

const app = express();

// app.use(express.json());

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(
    cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    })
);
app.get('/', (req, res) => {
    res.send('hello world');
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/dashboard/post', dashboardPostRoutes);
app.use('/post', publicPostRoutes);
app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: process.env.Node_ENV === 'development',
    })
);

const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_DB_URI);
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
        console.log(`Connected to Mongoose Database`);
    } catch (e) {
        console.log(e);
    }
};
start();
