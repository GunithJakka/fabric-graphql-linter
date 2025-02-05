# Fabric GraphQL Linter

A specialized linting and transformation tool for Microsoft Fabric GraphQL schemas to ensure compatibility with Azure API Management (APIM).

## 📋 Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Development](#development)
- [Testing](#testing)

## 🎯 Overview

The Fabric GraphQL Linter is a specialized tool designed to analyze, validate, and transform GraphQL schemas specifically for Microsoft Fabric compatibility with Azure API Management (APIM). It helps ensure that your GraphQL schemas follow best practices and meet specific requirements for APIM integration.

## 🏗 Architecture

The project follows a modular architecture with clear separation of concerns:

### Core Components

1. **Command-Line Interface (CLI)**
   - Entry point for the tool
   - Handles user input and configuration
   - Provides interactive feedback

2. **Core Linter/Transformer Library**
   - Schema Fetching: Retrieves GraphQL schemas from various sources
   - Parsing & Validation: Analyzes schema structure and validity
   - Rule-based Lint Checks: Applies customizable linting rules
   - Transformation: Implements fixes and schema modifications

3. **Plugin System**
   - Supports custom lint rules through plugins
   - APIM integration plugin for automated updates
   - Extensible architecture for future integrations

4. **Output/Reporting**
   - Console logs for immediate feedback
   - JSON/HTML report generation
   - Cleaned schema output

### Architecture Diagram

```
Command-Line (CLI)
       ↓
Core Linter/Transformer Library
1. Schema Fetching
2. Parsing & Validation
3. Rule-based Lint Checks
4. Transformation (Fixes)
       ↓
Plugin System (optional)
- Lint plugins for custom rules
- APIM integration plugin
       ↓
Output/Reporting
1. Console logs
2. JSON or HTML reports
3. Cleaned schema output
```

## ✨ Features

1. **Schema Analysis**
   - Introspection query support
   - Local file parsing
   - Remote schema fetching

2. **Validation Rules**
   - Directive compatibility checks
   - Scalar type validation
   - Subscription support verification
   - Custom rule implementation

3. **Transformation Capabilities**
   - Automatic directive modifications
   - Schema cleaning and optimization
   - APIM-specific adjustments

4. **Integration Support**
   - APIM auto-upload functionality
   - CI/CD pipeline compatibility
   - Extensible plugin system

## 🚀 Project Structure

```
fabric-graphql-linter/
├── package.json
├── tsconfig.json          # TypeScript configuration
├── src/
│   ├── cli/              # CLI implementation
│   │   └── index.ts      # CLI entry point
│   ├── core/             # Core functionality
│   │   ├── schemaFetcher.ts    # Schema retrieval
│   │   ├── parseValidate.ts    # Schema parsing
│   │   └── transform.ts        # Schema transformation
│   ├── rules/            # Linting rules
│   │   ├── checkDirectives.ts
│   │   ├── checkScalars.ts
│   │   └── checkSubscriptions.ts
│   └── plugins/          # Plugin system
│       └── apimIntegration.ts
├── tests/                # Test suite
│   ├── unit/
│   └── integration/
└── .linterrc.json       # Configuration file
```

## 🛠 Installation

```bash
npm install fabric-graphql-linter
```

## 📝 Usage

Basic usage:
```bash
fabric-graphql-lint <schema-path> [options]
```

With APIM integration:
```bash
fabric-graphql-lint <schema-path> --apim-upload
```

## ⚙️ Configuration

Create a `.linterrc.json` file in your project root:

```json
{
  "rules": {
    "directiveCheck": "error",
    "scalarTypes": "warning"
  },
  "plugins": ["apim-integration"],
  "output": {
    "format": "json",
    "file": "lint-report.json"
  }
}
```

## 🧪 Development

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Build the project:
```bash
npm run build
```
4. Run tests:
```bash
npm test
```

## 🔍 Testing

The project includes:
- Unit tests for individual components
- Integration tests for end-to-end functionality
- Schema validation test cases
- Plugin system tests

Run tests with:
```bash
npm run test        # Run all tests
npm run test:unit   # Run unit tests only
npm run test:int    # Run integration tests
```

## 📄 License

MIT License - See LICENSE file for details
