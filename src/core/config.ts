import fs from 'fs/promises';
import path from 'path';

export interface LinterConfig {
  allowedDirectives: string[];
  forbiddenScalars: string[];
  replacementScalars: Record<string, string>;
  stripSubscription: boolean;
}

export async function loadConfig(configPath: string): Promise<LinterConfig> {
  try {
    const fullPath = path.resolve(process.cwd(), configPath);
    const configContent = await fs.readFile(fullPath, 'utf-8');
    const config = JSON.parse(configContent) as LinterConfig;
    
    // Validate config structure
    if (!validateConfig(config)) {
      throw new Error('Invalid configuration format');
    }
    
    return config;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to load config: ${error.message}`);
    }
    throw new Error('Failed to load config: Unknown error');
  }
}

function validateConfig(config: unknown): config is LinterConfig {
  const c = config as LinterConfig;
  return (
    Array.isArray(c?.allowedDirectives) &&
    Array.isArray(c?.forbiddenScalars) &&
    typeof c?.replacementScalars === 'object' &&
    typeof c?.stripSubscription === 'boolean'
  );
} 