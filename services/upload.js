const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('./s3');
const { s3Config } = require('../config');

const STORAGE_S3 = 's3';
const STORAGE_LOCAL = 'local';
const LOCAL_DIR = 'public/images/';

const storageType = process.env.STORAGE || 'local';
let storageOptions = {};

if (storageType === STORAGE_LOCAL) {
    storageOptions = { dest: LOCAL_DIR };
} else if (storageType === STORAGE_S3) {
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
    
    storageOptions = {
        storage: multerS3(storageConfig)
    };
} else {
    throw new Error('Unrecognized storage type: ' + storageType);
}

const getFilepath = req => (
    storageType === 'local' ? 
        LOCAL_DIR.replace('public','') + req.file.filename :
        req.file.location
);

console.log('upload service configured for storage type: ', storageType);
const upload = multer(storageOptions);
upload.getFilepath = getFilepath;

module.exports = upload;