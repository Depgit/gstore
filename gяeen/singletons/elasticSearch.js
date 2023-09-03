import { Client } from '@elastic/elasticsearch';
import s3Store  from './aws.js'; 
import config from '../config/config';

class ElasticSearch {
  constructor() {
    this.ElasticClient = new Client({
      node: process.env.ELASTICURL
    //   auth: {
    //     username : config.Config.FileStore.S3.ApiKey,
    //     password : config.Config.FileStore.S3.SecretKey
    //   }
    });
  }

  async Init() {
    console.log('Elasticsearch init');
    // No need to initialize AWS SDK here again
    console.log('Elasticsearch initialization done');
  }

  async add(product, index, type) {
    try {
      const esResponse = await this.ElasticClient.index({
        index: index,
        type: type, // Note: 'type' has been deprecated in Elasticsearch 7.x
        id: "product._id", // Assuming 'product._id' is the unique identifier
        body: {
          title: "product.title",
          description:" product.description",
        },
      });

      return {
        res: esResponse,
        err: null,
      };
    } catch (err) {
      console.error('Elasticsearch add Product error:', err);
      return {
        res: null,
        err: err,
      };
    }
  }

  async search(query, index, type) {
    try {
      const esResponse = await this.ElasticClient.search({
        index: index,
        type: type, // Note: 'type' has been deprecated in Elasticsearch 7.x
        body: {
          query: {
            match: {
              title: query,
              fuzziness: 'AUTO',
            },
          },
        },
      });
      return {
        res: esResponse,
        err: null,
      };
    } catch (err) {
      console.error('Elasticsearch query error:', err);
      return {
        res: null,
        err: err,
      };
    }
  }
}

const es = new ElasticSearch();

// let resposne  = await es.add(null,'products','product');
// console.log({resposne});

export default es; 
