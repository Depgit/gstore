import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import config from '../config/config';

class S3Store {
    constructor() {
        this.client = null;
    }

    async Init() {
        console.log("configuring aws");
        const conf = {
            zone: config.Config.FileStore.S3.Region,
            accessId: config.Config.FileStore.S3.ApiKey,
            secretKey: config.Config.FileStore.S3.SecretKey,
        };
    
        const clientConfig = new S3Store({
            region: conf.zone,
            credentials: {
                accessKeyId: conf.accessId, 
                secretAccessKey: conf.secretKey, 
            },
        });
    
        this.client = new S3Client(clientConfig);
        console.log("aws configure done");
    }

    async add(sd, bucket) {
        try {
            let output;
            if (this.client === null) {
                throw new Error("S3 adapter has not been initialized");
            }
            if (sd.BodyStream) {
                const params = {
                    Bucket: bucket,
                    Key: String(sd.key),
                    Body: sd.bodyStream
                };
                output = await this.client.send(new PutObjectCommand(params));
            } else {
                const params = {
                    Bucket: bucket,
                    Key: String(sd.key),
                    Body: String(sd.body)
                };
                output = await this.client.send(new PutObjectCommand(params));
            }
            return null
        } catch (err) {
            return err;
        }
    }

    async delete(key, bucket) {
        try {
            if (!this.client) {
                throw new Error("S3 adapter has not been initialized");
            }
            const params = {
                Bucket: bucket,
                Key: key
            };
            const output = await this.client.send(new DeleteObjectCommand(params));
            return output;
        } catch (err) {
            return err;
        }
    }

    async get(key, bucket) {
        try {
            if (!this.client) {
                throw new Error("S3 adapter has not been initialized");
            }
            const params = {
                Bucket: bucket,
                Key: key
            };
            const output = await this.client.send(new GetObjectCommand(params));
            
            // Return 404 if NoSuchKey error
            if (output.$metadata.httpStatusCode === 404) {
                return {
                    status: 404,
                    key: key
                };
            }
            
            // Return 500 for other errors
            if (output.$metadata.httpStatusCode !== 200) {
                return {
                    status: 500,
                    key: key
                };
            }
    
            return {
                key: key,
                bodyStream: output.Body
            };
        } catch (err) {
            return err;
        }
    }
    
    async listAll(bucket) {
        try {
            if (!this.client) {
                throw new Error("S3 adapter has not been initialized");
            }
            const params = {
                Bucket: bucket
            };
            const output = await this.client.send(new ListObjectsV2Command(params));
            
            const fileObjects = output.Contents.map(item => ({
                key: item.Key,
                meta: {
                    "Last modified": item.LastModified,
                    "Size": item.Size,
                    "Storage class": item.StorageClass,
                }
            }));
            
            return fileObjects;
        } catch (err) {
            return err;
        }
    }
    
    
    
}

const s3Store = new S3Store();

export default s3Store

