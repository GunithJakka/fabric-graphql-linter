import { buildSchema } from 'graphql';
import { APIMIntegration, APIMConfig } from '../../../src/plugins/apimIntegration';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('APIMIntegration', () => {
  const config: APIMConfig = {
    subscriptionKey: 'test-key',
    resourceGroup: 'test-rg',
    serviceName: 'test-service',
    apiId: 'test-api',
    baseUrl: 'https://management.azure.com'
  };

  const plugin = new APIMIntegration(config);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should upload schema to APIM', async () => {
    const schema = buildSchema(`
      type Query {
        hello: String
      }
    `);

    mockedAxios.put.mockResolvedValueOnce({ data: { status: 'success' } });

    await plugin.uploadSchema(schema);

    expect(mockedAxios.put).toHaveBeenCalledWith(
      expect.stringContaining('/apis/test-api/schemas/graphql'),
      expect.objectContaining({
        schemaType: 'graphql'
      }),
      expect.objectContaining({
        headers: expect.objectContaining({
          'Ocp-Apim-Subscription-Key': 'test-key'
        })
      })
    );
  });
}); 