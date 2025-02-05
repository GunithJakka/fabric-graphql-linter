import axios from 'axios';
import { GraphQLSchema, printSchema } from 'graphql';

export interface APIMConfig {
  subscriptionKey: string;
  resourceGroup: string;
  serviceName: string;
  apiId: string;
  baseUrl: string;
}

export class APIMIntegration {
  constructor(private config: APIMConfig) {}

  async uploadSchema(schema: GraphQLSchema): Promise<void> {
    try {
      const schemaString = printSchema(schema);
      
      const url = `${this.config.baseUrl}/subscriptions/${this.config.subscriptionKey}/resourceGroups/${this.config.resourceGroup}/service/${this.config.serviceName}/apis/${this.config.apiId}/schemas/graphql`;
      
      await axios.put(url, {
        schemaDefinition: schemaString,
        schemaType: 'graphql'
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': this.config.subscriptionKey
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to upload schema to APIM: ${error.message}`);
      }
      throw new Error('Failed to upload schema to APIM: Unknown error');
    }
  }
} 