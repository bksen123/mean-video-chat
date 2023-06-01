const express = require('express');
const multer = require('multer');
const mkdirp = require('mkdirp');
const app = express();
require('dotenv').config();
var dir = './photos/upload/';
var folderWithFileName = 'upload/';

var URL = process.env.HOST_NAME;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("file========", file)
        URL = 'http://' + req.headers.host + '/'
        console.log("URL========", URL)
        // var fileName = file.originalname.split("###")
        var fileName = file.originalname
        // dir = dir + fileName[1];
        dir = dir;
        console.log("dir========", dir)
        folderWithFileName = folderWithFileName;
        // folderWithFileName = folderWithFileName + fileName[1];
        mkdirp(dir, err => cb(err, dir))
    },
    filename: (req, file, cb) => {
        // var fileName = file.originalname.split("###")
        var fileName = file.originalname
        cb(null, Date.now() + '-' + fileName)
    },
});

const upload = multer({
    storage
});
app.post('/', upload.single('image'), (req, res) => {
    fileUploadPath = `${URL + folderWithFileName}/${req.file.filename}`;
    dir = './photos/upload/';
    folderWithFileName = 'upload/';
    if (req.file) {
        return res.json({
            status: 200,
            message: 'file upload successfully.',
            imgPath: fileUploadPath,
        })
    } else {
        return res.json({
            status: 500,
            message: 'There are some error in uploading file.',
            data: data
        })
    }
})

module.exports = app;