import { GraphQLSchema, isScalarType } from 'graphql';
import { Rule, LintResult } from './index';
import { LinterConfig } from '../config';

export class ScalarRule implements Rule {
  name = 'no-forbidden-scalars';

  validate(schema: GraphQLSchema, config: LinterConfig): LintResult[] {
    const results: LintResult[] = [];
    const typeMap = schema.getTypeMap();

    for (const [typeName, type] of Object.entries(typeMap)) {
      if (isScalarType(type) && !this.isBuiltinScalar(typeName)) {
        if (config.forbiddenScalars.includes(typeName)) {
          results.push({
            type: 'error',
            message: `Forbidden scalar type "${typeName}" found. Consider using a standard scalar type.`,
          });
        }
      }
    }

    return results;
  }

  private isBuiltinScalar(typeName: string): boolean {
    return ['String', 'Int', 'Float', 'Boolean', 'ID'].includes(typeName);
  }
} 