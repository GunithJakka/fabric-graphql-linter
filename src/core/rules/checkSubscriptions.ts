import { GraphQLSchema } from 'graphql';
import { Rule, LintResult } from './index';
import { LinterConfig } from '../config';

export class SubscriptionRule implements Rule {
  name = 'no-subscription-type';

  validate(schema: GraphQLSchema, config: LinterConfig): LintResult[] {
    const results: LintResult[] = [];
    
    if (schema.getSubscriptionType() && config.stripSubscription) {
      results.push({
        type: 'error',
        message: 'Subscription type is not supported in APIM. Remove or transform subscription operations.',
      });
    }

    return results;
  }
} 