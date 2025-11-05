# Planning Phase - Agentic Workflow Prompts

## 🎯 Phase Objective

Use GitHub Copilot to architect and plan React features for a Vite + TypeScript application, following software engineering best practices and preparing for AI-assisted implementation.

## 🚨 IMPORTANT: Agentic Workflow Context

- **AI-First Architecture**: Design components and patterns that GitHub Copilot can easily implement
- **Vite Optimization**: Plan for Vite's build system, HMR, and ESM modules
- **Type-First Planning**: Define comprehensive TypeScript interfaces before implementation
- **Structured Handoff**: Create detailed plans that the implementation phase can execute

## Core Planning Prompts

### 1. Agentic Feature Architecture Planning for Vite + React

```
@GitHub Copilot: Plan a [FEATURE_NAME] feature for a Vite + React + TypeScript application using agentic workflow principles:

Feature Context: [DESCRIBE YOUR FEATURE AND USER REQUIREMENTS]

Agentic Workflow Requirements:
- Design for AI implementation: Clear, structured components that Copilot can generate
- Single Responsibility Principle: Each component has one clear, AI-implementable purpose
- Unidirectional Data Flow: Data down via props, events up via callbacks
- Component Hierarchy: Generic → Specific, following composition patterns
- Type Safety First: Comprehensive TypeScript interfaces for AI code generation
- Vite Optimization: ESM modules, tree shaking, and HMR considerations

Planning Scope:
1. Component breakdown and hierarchy (suitable for AI generation)
2. Data flow patterns between components (with TypeScript interfaces)
3. Custom hooks needed for state management (with clear responsibilities)
4. Service layer architecture for API interactions (type-safe and testable)
5. Complete TypeScript interfaces and types (ready for implementation)
6. File structure and barrel exports (optimized for Vite)
7. Integration points with existing features
8. Performance considerations (lazy loading, memoization opportunities)

Output Format:
- Detailed component hierarchy with responsibilities
- TypeScript interface definitions
- Data flow diagrams (text-based)
- File structure recommendations
- Implementation priority order
- Dependencies between components
```

### 2. Component Responsibility Definition

```
@GitHub Copilot: Help me define the single responsibility for a [COMPONENT_NAME] component.

Context: [COMPONENT CONTEXT]

Please define:
1. Primary responsibility (one sentence)
2. What this component should do
3. What this component should NOT do
4. Props interface definition
5. State management approach
6. Error handling strategy
```

### 3. Data Flow Architecture

```
@GitHub Copilot: Design the data flow for [FEATURE_NAME] following unidirectional data flow principles.

Requirements:
- Data flows down through props
- Events bubble up through callbacks
- State is managed at appropriate levels
- No direct mutations of props

Please provide:
1. State management strategy (local vs global)
2. Props interface definitions
3. Event handler signatures
4. Data transformation patterns
5. Error state handling
```

### 4. Service Layer Planning

```
@GitHub Copilot: Plan the service layer architecture for [FEATURE_NAME].

Requirements:
- Separation of concerns (no API calls in components)
- Type-safe API interactions
- Error handling and retry logic
- Response transformation

Please design:
1. Service interface definitions
2. API client configuration
3. Error handling patterns
4. Response type definitions
5. Caching strategy (if needed)
```

### 5. Testing Strategy Planning

```
@GitHub Copilot: Create a testing strategy for [FEATURE_NAME].

Components to test:
- [LIST COMPONENTS]
- [LIST HOOKS]
- [LIST SERVICES]

Please suggest:
1. Unit testing approach for each component type
2. Integration testing strategy
3. Mock strategies for external dependencies
4. Test data fixtures needed
5. Coverage goals and important test cases
```

## Architecture Decision Templates

### Component Hierarchy Decision

```
Decision: Component hierarchy for [FEATURE_NAME]
Options considered:
1. [OPTION 1]
2. [OPTION 2]
3. [OPTION 3]

Selected: [CHOSEN OPTION]
Reasoning: [WHY THIS OPTION]
Trade-offs: [WHAT WE'RE GIVING UP]
```

### State Management Decision

```
Decision: State management approach for [FEATURE_NAME]
Options considered:
1. Local component state
2. Context API
3. External state library
4. Server state (React Query/SWR)

Selected: [CHOSEN OPTION]
Reasoning: [WHY THIS OPTION]
Implementation: [HOW TO IMPLEMENT]
```

## Planning Checklist

### Before Implementation

- [ ] Component responsibilities clearly defined
- [ ] Data flow patterns documented
- [ ] Props interfaces designed
- [ ] Service layer architecture planned
- [ ] Error handling strategy defined
- [ ] Testing approach outlined
- [ ] Performance considerations noted
- [ ] Accessibility requirements identified

### Architecture Compliance

- [ ] Single Responsibility Principle applied
- [ ] Unidirectional Data Flow maintained
- [ ] Component Hierarchy established
- [ ] Constants will be extracted
- [ ] Vite optimization considerations included
- [ ] ESM module structure planned

## 🤖 Agentic Workflow Handoff to Implementation Phase

### Planning Phase Output Checklist

Before moving to the implementation phase, ensure your planning output includes:

- [ ] **Detailed Component Specifications**: Each component has a clear name, responsibility, and props interface
- [ ] **Complete TypeScript Interfaces**: All data structures, props, and state types are defined
- [ ] **File Structure Plan**: Clear organization that supports Vite's module system
- [ ] **Dependency Map**: Clear understanding of what each component needs from others
- [ ] **Data Flow Documentation**: How data moves through the component hierarchy
- [ ] **Service Layer Contracts**: API methods, error handling, and data transformations
- [ ] **Performance Strategy**: Where memoization, lazy loading, and code splitting will be applied
- [ ] **Testing Strategy**: What will be tested and how (unit, integration, e2e)

### Handoff Prompt for Implementation Phase

```
@GitHub Copilot: Based on the planning phase output above, I'm ready to implement [FEATURE_NAME].

Please reference the following from my planning:
- Component hierarchy and responsibilities
- TypeScript interfaces and types
- Data flow patterns
- Service layer architecture
- File structure organization

Use the implementation prompts in `implementation-prompts.md` to generate:
1. Start with types and interfaces
2. Implement service layer
3. Create custom hooks
4. Generate components (leaf components first, containers last)
5. Set up barrel exports

Maintain consistency with the planned architecture and Vite + React + TypeScript best practices.
```

### 📋 Planning to Implementation Workflow

1. **Complete Planning Phase**: Use all prompts in this file to thoroughly plan your feature
2. **Review Architecture**: Ensure all decisions align with agentic workflow principles
3. **Document Decisions**: Keep planning output accessible for implementation reference
4. **Move to Implementation**: Use `implementation-prompts.md` with planning context
5. **Iterate as Needed**: Return to planning if architecture needs adjustment

- [ ] Concerns properly separated
- [ ] Feature-based organization planned
- [ ] Predictable patterns defined
- [ ] Type safety comprehensive
- [ ] Cognitive load minimized

## Next Steps

After completing planning:

1. Review architecture decisions with team
2. Create initial file structure
3. Move to Implementation Phase
4. Use implementation prompts to generate code

## Copilot Interaction Tips

- Be specific about your requirements
- Provide context about existing code patterns
- Ask for multiple options and trade-offs
- Request TypeScript-first solutions
- Ask for testable designs
- Consider accessibility from the start
