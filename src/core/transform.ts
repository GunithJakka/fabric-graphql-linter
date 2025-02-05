import {
  GraphQLSchema,
  parse,
  print,
  visit,
  DirectiveNode,
  ScalarTypeDefinitionNode,
  DocumentNode,
  buildASTSchema,
} from 'graphql';
import { LinterConfig } from './config';

export class SchemaTransformer {
  constructor(private config: LinterConfig) {}

  transform(schema: GraphQLSchema): GraphQLSchema {
    const sdl = this.schemaToSDL(schema);
    const ast = parse(sdl);
    const transformedAst = this.transformAST(ast);
    return buildASTSchema(transformedAst);
  }

  private schemaToSDL(schema: GraphQLSchema): string {
    // Convert schema to SDL string
    return print(parse(schema.toString()));
  }

  private transformAST(ast: DocumentNode): DocumentNode {
    return visit(ast, {
      // Transform directives
      Directive: (node: DirectiveNode) => {
        if (!this.config.allowedDirectives.includes(`@${node.name.value}`)) {
          return null; // Remove directive
        }
        return undefined; // Keep directive unchanged
      },

      // Transform scalar types
      ScalarTypeDefinition: (node: ScalarTypeDefinitionNode) => {
        const scalarName = node.name.value;
        if (this.config.forbiddenScalars.includes(scalarName)) {
          const replacement = this.config.replacementScalars[scalarName];
          if (replacement) {
            return {
              ...node,
              name: {
                ...node.name,
                value: replacement,
              },
            };
          }
          return null; // Remove scalar if no replacement specified
        }
        return undefined; // Keep scalar unchanged
      },
    });
  }
} 