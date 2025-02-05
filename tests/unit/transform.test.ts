import { buildSchema, printSchema } from 'graphql';
import { SchemaTransformer } from '../../src/core/transform';
import { LinterConfig } from '../../src/core/config';

describe('SchemaTransformer', () => {
  const config: LinterConfig = {
    allowedDirectives: ['@deprecated'],
    forbiddenScalars: ['DateTime'],
    replacementScalars: { 'DateTime': 'String' },
    stripSubscription: true
  };

  const transformer = new SchemaTransformer(config);

  it('should replace forbidden scalar types', () => {
    const schema = buildSchema(`
      scalar DateTime

      type Query {
        createdAt: DateTime
      }
    `);

    const transformed = transformer.transform(schema);
    const printed = printSchema(transformed);
    
    expect(printed).not.toContain('scalar DateTime');
    expect(printed).toContain('createdAt: String');
  });

  it('should remove unknown directives', () => {
    const schema = buildSchema(`
      type Query {
        oldField: String @deprecated(reason: "Use newField")
        field: String @customDirective
      }

      directive @customDirective on FIELD_DEFINITION
    `);

    const transformed = transformer.transform(schema);
    const printed = printSchema(transformed);
    
    expect(printed).toContain('@deprecated');
    expect(printed).not.toContain('@customDirective');
  });
}); 