'use strict'

const AWS = require('aws-sdk');
const readline = require('readline');
const zlib = require('zlib');
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

function sendToES(data) {
  // send to elasticsearch
}


function sendToMySQL(data) {
  // send to mysql
}

module.exports.logProcessor = async event => {

  const bucketname = event.Records[0].s3.bucket.name;
  const filename = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
  console.log(bucketname, filename);


  let records = [];


  const params = {
    Bucket: bucketname,
    Key: filename
  };

  try {
    // unzip object create
    const unzip = zlib.createGunzip();
    // read a file from bucket and uzip the file 
    const readStream = s3.getObject(params).createReadStream().pipe(unzip);
    const lineReader = readline.createInterface({ input: readStream });

    lineReader
      .on('line', line => {
        console.log(line);
        records.push(line);
        // file read line by line
        // data processing
      })
      .on('close', () => {
        console.log('Finished processing S3 file.');
      });

  } catch (err) {
    console.log(err);
  }



};

