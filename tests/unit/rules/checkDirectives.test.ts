import { buildSchema } from 'graphql';
import { DirectiveRule } from '../../../src/core/rules/checkDirectives';
import { LinterConfig } from '../../../src/core/config';

describe('DirectiveRule', () => {
  const config: LinterConfig = {
    allowedDirectives: ['@deprecated'],
    forbiddenScalars: [],
    replacementScalars: {},
    stripSubscription: true
  };

  const rule = new DirectiveRule();

  it('should detect unknown directives', () => {
    const schema = buildSchema(`
      type Query {
        field: String @customDirective
      }
      directive @customDirective on FIELD_DEFINITION
    `);

    const results = rule.validate(schema, config);
    expect(results).toHaveLength(1);
    expect(results[0].type).toBe('error');
    expect(results[0].message).toContain('@customDirective');
  });

  it('should allow known directives', () => {
    const schema = buildSchema(`
      type Query {
        field: String @deprecated(reason: "Use newField instead")
      }
    `);

    const results = rule.validate(schema, config);
    expect(results).toHaveLength(0);
  });
}); 