import { GraphQLSchema } from 'graphql';
import { Rule, LintResult } from './index';
import { LinterConfig } from '../config';

export class DirectiveRule implements Rule {
  name = 'no-unknown-directives';

  validate(schema: GraphQLSchema, config: LinterConfig): LintResult[] {
    const results: LintResult[] = [];
    const directives = schema.getDirectives();

    for (const directive of directives) {
      if (!config.allowedDirectives.includes(`@${directive.name}`)) {
        results.push({
          type: 'error',
          message: `Unknown directive "@${directive.name}" found. Allowed directives are: ${config.allowedDirectives.join(', ')}`,
        });
      }
    }

    return results;
  }
} 