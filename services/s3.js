/**
 * Provides configured AWS S3 client
 */
const aws = require('aws-sdk');
const { awsConfig } = require('../config');
const {promisify} = require('util');

aws.config.update(awsConfig);

const s3 = new aws.S3();

s3.getSignedUrl = promisify(s3.getSignedUrl);

module.exports = s3;