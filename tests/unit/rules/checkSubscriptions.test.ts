import { buildSchema } from 'graphql';
import { SubscriptionRule } from '../../../src/core/rules/checkSubscriptions';
import { LinterConfig } from '../../../src/core/config';

describe('SubscriptionRule', () => {
  const config: LinterConfig = {
    allowedDirectives: ['@deprecated'],
    forbiddenScalars: [],
    replacementScalars: {},
    stripSubscription: true
  };

  const rule = new SubscriptionRule();

  it('should detect subscription type when stripSubscription is true', () => {
    const schema = buildSchema(`
      type Query {
        hello: String
      }

      type Subscription {
        newMessage: String
      }
    `);

    const results = rule.validate(schema, config);
    expect(results).toHaveLength(1);
    expect(results[0].type).toBe('error');
    expect(results[0].message).toContain('Subscription type is not supported');
  });

  it('should allow subscription type when stripSubscription is false', () => {
    const configWithSubscriptions = { ...config, stripSubscription: false };
    const schema = buildSchema(`
      type Query {
        hello: String
      }

      type Subscription {
        newMessage: String
      }
    `);

    const results = rule.validate(schema, configWithSubscriptions);
    expect(results).toHaveLength(0);
  });
}); 