import { GraphQLSchema } from 'graphql';
import { LinterConfig } from '../config';

export interface LintResult {
  type: 'error' | 'warning';
  message: string;
  location?: {
    line: number;
    column: number;
  };
}

export interface Rule {
  name: string;
  validate: (schema: GraphQLSchema, config: LinterConfig) => LintResult[];
}

export class LintEngine {
  private rules: Rule[] = [];

  constructor(private config: LinterConfig) {}

  addRule(rule: Rule) {
    this.rules.push(rule);
  }

  async lint(schema: GraphQLSchema): Promise<LintResult[]> {
    const results: LintResult[] = [];
    
    for (const rule of this.rules) {
      const ruleResults = rule.validate(schema, this.config);
      results.push(...ruleResults);
    }

    return results;
  }
} 