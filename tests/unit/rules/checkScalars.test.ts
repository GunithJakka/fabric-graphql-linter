import { buildSchema } from 'graphql';
import { ScalarRule } from '../../../src/core/rules/checkScalars';
import { LinterConfig } from '../../../src/core/config';

describe('ScalarRule', () => {
  const config: LinterConfig = {
    allowedDirectives: ['@deprecated'],
    forbiddenScalars: ['DateTime', 'Long'],
    replacementScalars: { 'DateTime': 'String' },
    stripSubscription: true
  };

  const rule = new ScalarRule();

  it('should detect forbidden scalar types', () => {
    const schema = buildSchema(`
      scalar DateTime
      scalar Long

      type Query {
        createdAt: DateTime
        count: Long
      }
    `);

    const results = rule.validate(schema, config);
    expect(results).toHaveLength(2);
    expect(results[0].message).toContain('DateTime');
    expect(results[1].message).toContain('Long');
  });

  it('should allow built-in scalar types', () => {
    const schema = buildSchema(`
      type Query {
        name: String
        age: Int
        active: Boolean
        id: ID
        score: Float
      }
    `);

    const results = rule.validate(schema, config);
    expect(results).toHaveLength(0);
  });
}); 