const credentials = require("./../AWSCredentials"),
    config = require("./config"),
    AWS = require('aws-sdk'),
    //Prepare S3 Object with AWSCredentials
    s3 = new AWS.S3({
        accessKeyId: credentials.accessKey,
        secretAccessKey: credentials.secretKey
    });

async function main() {

    //Build search parameters
    let searchParams = {
        Bucket: config.bucket,
        Key: config.key
    }

    return await getS3FileContent(searchParams);

    /**
     * Function to get S3 File Content given search Parameters
     * @param  {} searchParams
     */
    async function getS3FileContent(searchParams) {
        return new Promise((resolve, reject) => {
            s3.getObject(searchParams, function (err, data) {
                if (err) {
                    console.log(`Error when trying to retrieve Key: ${searchParams.Key} in Bucket: ${searchParams.Bucket}`);
                    reject(err);
                }
                else {
                    resolve(data.Body.toString('utf-8'));
                }
            })
        });
    }
}

main()
    .then((data) => {
        console.log("start");
        console.log(data);
        console.log("finished");
    })
    .catch(err => {
        console.log(`Error: ${err}`)
    });

