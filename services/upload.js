/*
 * Provides multer uploader configured to either upload locally or to S3
 *
 * Uses STORAGE environment variable. Values: local | s3
 */
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('./s3');
const { s3Config } = require('../config');

// Location for files uploaded with local configuration
const LOCAL_DIR = 'public/images/';

// Get environment variable to determine type of storage
const STORAGE_S3 = 's3';
const STORAGE_LOCAL = 'local';

const storageType = process.env.STORAGE || 'local';

// Initialize StorageOptions
let storageOptions = {};

if (storageType === STORAGE_LOCAL) {
    // Set local storage options
    storageOptions = { dest: LOCAL_DIR };

} else if (storageType === STORAGE_S3) {
    // Set S3 storage options
    const storageConfig = {
        s3: s3,
        ...s3Config,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString());
        }
    };
    
    // For S3, the options are additionally wrappered in the multerS3 helper class
    storageOptions = {
        storage: multerS3(storageConfig)
    };
} else {
    throw new Error('Unrecognized storage type: ' + storageType);
}

// Return filepath from request that has passed through Multer middleware
// Handles the different properties Multer stores this in based on storage type
const getFilepath = req => (
    storageType === 'local' ? 
        LOCAL_DIR.replace('public','') + req.file.filename :
        req.file.location
);

// Output configuration to server log
console.log('upload service configured for storage type: ', storageType);

// Create final uploader & add function to return filepath based on storage type
const upload = multer(storageOptions);
upload.getFilepath = getFilepath;

module.exports = upload;