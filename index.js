var express = require('express');
var app = express();
var path = require('path');
var multer = require('multer');
var upload = multer();
var fs = require('fs');
var csv = require('fast-csv');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/color25';



var upload = multer({ dest: 'uploads/' })


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.post('/upload', upload.single('file'),function(req, res, next) {
    
    if (req.file) {
            
/*            var insertDocument = function(db, callback) {
                db.collection('guests').insertOne( data , function(err, result) {
                    assert.equal(err, null);
                    console.log("Inserted a document into the guests collection.");
                    callback(result);
                    });
            };

            MongoClient.connect(url, function(err, db) {
                    assert.equal(null, err);
                    insertDocument(db, function() {
                        db.close();
                });
            });
            */
            
            //var stream = fs.createReadStream(req.file.path);
            
            csv
            .fromPath(req.file.path, {headers : true, objectMode: true})
            .on('data', function(data){
                    console.log(data);
            })
            .on('end', function(){
                console.log('done');
                res.end('Done!');
            });
            
    } else {
        res.send('Error!');
    }
});



var port = process.env.PORT || 8080;
app.listen(port);
console.log('Listen: ' + port);