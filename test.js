const AWS = require('aws-sdk');
const util = require("util");
const fs = require('fs');
const readline = require('readline');
//const gunzip = util.promisify(require("zlib").gunzip);
const zlib = require('zlib');
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const params = {
  Bucket: 'gitlab-log-test',
  Key: 'syslog.3.gz'
};


(async () => {
  let records = [];

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
      })
      .on('close', () => {
        console.log('Finished processing S3 file.');
      });

  } catch (err) {
    console.log(err);
  }

  //await streamS3FileToLocalFile(s3ReadStream);
})();