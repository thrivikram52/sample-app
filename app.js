let fs = require('fs');
import express from 'express';
import config from './config/index.js';
import user from './routes/User';
import posts from './routes/Posts';
import image from './routes/Image';
import health from './routes/Health';
import bodyParser from 'body-parser';

import * as Auth from './middlewares/Auth';
import * as RequestLogger from './middlewares/RequestLogger';
import * as ResponseLogger from './middlewares/ResponseLogger';
import * as SchemaValidator from './middlewares/SchemaValidator';

let app = express();
app.use(bodyParser.json());

app.use('*',[RequestLogger.reqLog,Auth.checks,SchemaValidator.validate]);
app.use('/v1/health', health);
app.use('/v1/posts', posts);

app.use('/v1/user', user);
app.use('/v1/image/', image);

app.use('*',[ResponseLogger.resSuccessLog,ResponseLogger.resErrorLog]);

module.exports = app
