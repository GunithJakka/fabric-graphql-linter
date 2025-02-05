import { loadConfig } from '../../src/core/config';
import path from 'path';
import type { LinterConfig } from '../../src/core/config';

describe('Config Loader', () => {
  it('should load valid config file', async () => {
    const configPath = path.join(__dirname, '../../.linterrc.json');
    const config = await loadConfig(configPath);
    
    expect(config).toMatchObject<Partial<LinterConfig>>({
      allowedDirectives: expect.any(Array),
      forbiddenScalars: expect.any(Array),
      replacementScalars: expect.any(Object),
      stripSubscription: expect.any(Boolean)
    });
  });

  it('should throw error for invalid config path', async () => {
    const invalidPath = 'nonexistent.json';
    await expect(loadConfig(invalidPath)).rejects.toThrow('Failed to load config');
  });
}); 