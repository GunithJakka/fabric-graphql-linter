import { GraphQLSchema, buildClientSchema, printSchema, getIntrospectionQuery, IntrospectionQuery } from 'graphql';
import axios from 'axios';
import fs from 'fs/promises';

interface GraphQLResponse {
  data: IntrospectionQuery;
}

export async function fetchSchema(source: string): Promise<string> {
  try {
    // Check if source is a URL
    if (source.startsWith('http')) {
      const response = await axios.post<GraphQLResponse>(source, {
        query: getIntrospectionQuery()
      });
      
      // Convert introspection result to SDL
      const schema = buildClientSchema(response.data.data);
      return printSchema(schema);
    }
    
    // Otherwise, treat as file path
    const schemaContent = await fs.readFile(source, 'utf-8');
    return schemaContent;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch schema: ${error.message}`);
    }
    throw new Error('Failed to fetch schema: Unknown error');
  }
} 