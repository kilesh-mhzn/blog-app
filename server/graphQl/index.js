import express from 'express';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema.js';
import connectDB from './config/db.js';

dotenv.config();

const port = process.env.GRAPHQL_PORT || 8000;

const app = express();

//db connection
connectDB();
app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: process.env.Node_ENV === 'development',
    })
);

app.listen(port, console.log(`GraphQL Server is running on port ${port}`));
