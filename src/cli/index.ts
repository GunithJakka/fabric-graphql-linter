import { Command } from 'commander';
import { version } from '../../package.json';
import { loadConfig } from '../core/config';
import { fetchSchema } from '../core/schemaFetcher';
import { LintEngine } from '../core/rules';
import { DirectiveRule } from '../core/rules/checkDirectives';
import { parse, buildSchema } from 'graphql';

interface LintOptions {
  schema: string;
  output?: string;
  config: string;
}

const program = new Command();

program
  .name('fabric-graphql-linter')
  .description('A linter for Microsoft Fabric GraphQL schemas')
  .version(version);

program
  .command('lint')
  .description('Lint a GraphQL schema')
  .option('-s, --schema <path>', 'Path to schema file or URL')
  .option('-o, --output <path>', 'Output path for transformed schema')
  .option('-c, --config <path>', 'Path to config file', '.linterrc.json')
  .action(async (options: LintOptions) => {
    try {
      // Load configuration
      const config = await loadConfig(options.config);
      
      // Fetch and parse schem
      const schemaSDL = await fetchSchema(options.schema);
      const schema = buildSchema(schemaSDL);
      
      // Initialize linting engine
      const linter = new LintEngine(config);
      linter.addRule(new DirectiveRule());
      
      // Run linting
      const results = await linter.lint(schema);
      
      // Output results
      if (results.length === 0) {
        console.log('No issues found!');
      } else {
        console.error('Issues found:');
        results.forEach(result => {
          console.error(`${result.type.toUpperCase()}: ${result.message}`);
        });
        process.exit(1);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
      } else {
        console.error('An unknown error occurred');
      }
      process.exit(1);
    }
  });

program.parse(); 