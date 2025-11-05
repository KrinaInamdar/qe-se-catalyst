# Implementation Phase - Agentic Workflow Prompts

## ⚡ Phase Objective

Use GitHub Copilot to implement React components, hooks, and services for a Vite + React + TypeScript application, following the planned architecture from the planning phase.

## 🚨 IMPORTANT: Agentic Workflow Guidelines

- **Always Reference Context**: Keep planning prompts open while implementing
- **Vite-Optimized**: Generate code optimized for Vite's build system and HMR
- **Type-First**: TypeScript interfaces and types are generated before implementation
- **AI-Guided**: Let GitHub Copilot make implementation decisions within the defined architecture

## Core Implementation Prompts

### 1. Vite + React Component Generation

```
@GitHub Copilot: Generate a React TypeScript component for a Vite application with these specifications:

Component Name: [COMPONENT_NAME]
Responsibility: [SINGLE CLEAR PURPOSE FROM PLANNING PHASE]
Props Interface: [DEFINED IN PLANNING PHASE]
State Requirements: [FROM ARCHITECTURE DECISIONS]
Event Handlers: [FROM DATA FLOW DESIGN]

Vite-Specific Requirements:
- Optimized for Vite's HMR (Hot Module Replacement)
- ESM imports/exports for tree shaking
- TypeScript with strict typing
- Functional component with modern React hooks
- Props interface defined separately for reusability
- Error boundary considerations
- ARIA attributes for accessibility
- Clean JSX structure following React 18+ patterns
- Performance optimizations (React.memo, useCallback, useMemo)

Agentic Workflow Context:
- Reference the planning phase architecture decisions
- Follow the component hierarchy defined in planning
- Maintain unidirectional data flow patterns
- Ensure single responsibility principle compliance

Please generate:
1. Complete component implementation with TypeScript
2. Exported props interface (for use by other components)
3. Internal types and state interfaces
4. Barrel export statement (index.ts)
5. Component-specific utility functions if needed
6. JSDoc comments for complex logic
```

### 2. Custom Hook Generation for Vite + React

```
@GitHub Copilot: Create a custom React hook for a Vite application with these specifications:

Hook Name: [HOOK_NAME]
Purpose: [STATE/LOGIC MANAGEMENT FROM PLANNING PHASE]
Parameters: [INPUT PARAMETERS WITH TYPESCRIPT]
Return Value: [RETURN OBJECT/TUPLE STRUCTURE]
Side Effects: [API CALLS, SUBSCRIPTIONS, LOCAL STORAGE, ETC]

Vite + React Requirements:
- TypeScript with comprehensive generics and strict typing
- Optimized for Vite's development and build process
- Proper dependency arrays for useEffect hooks
- Error handling with typed error states
- Loading states for async operations
- Cleanup for subscriptions, timers, and event listeners
- Memoization where appropriate (useMemo, useCallback)
- Testable design with clear separation of concerns
- ESM exports for tree shaking

Agentic Workflow Context:
- Align with service layer architecture from planning
- Follow state management patterns defined in planning
- Ensure compatibility with component interfaces
- Maintain type safety across the application

Please generate:
1. Complete hook implementation with TypeScript
2. Parameter interfaces and generic types
3. Return type definitions (tuple or object)
4. Internal utility functions if needed
5. Error handling patterns with typed errors
6. Usage examples with TypeScript
7. JSDoc documentation for complex logic
8. Export statement for barrel exports
```

### 3. Vite-Optimized Service Layer Implementation

```
@GitHub Copilot: Implement a service layer for [SERVICE_NAME] in a Vite + React + TypeScript application:

API Endpoints: [ENDPOINTS FROM PLANNING PHASE]
Data Models: [TYPE DEFINITIONS FROM PLANNING]
Error Handling: [ERROR STRATEGY FROM PLANNING]
Authentication: [AUTH PATTERNS FROM PLANNING]

Vite + TypeScript Requirements:
- ESM modules for optimal tree shaking
- TypeScript interfaces for all request/response data
- Comprehensive error handling with typed error classes
- Request/response transformation with type safety
- Retry logic for failed requests with exponential backoff
- Type-safe HTTP client usage (fetch API or axios)
- Consistent response format across all endpoints
- Environment variable integration for Vite (import.meta.env)

Agentic Workflow Context:
- Follow service architecture defined in planning phase
- Integrate with custom hooks for state management
- Maintain separation from component logic
- Ensure compatibility with testing strategy

Please generate:
1. Service class or functional implementation
2. Complete request/response type definitions
3. Custom error classes with proper typing
4. HTTP client configuration with interceptors
5. Environment configuration for different build modes
6. Response transformation utilities
7. Retry and timeout logic implementation
8. Type-safe service interface for easy mocking
9. Barrel exports for clean imports
10. JSDoc documentation for API methods
```

### 4. Type Definitions

```
@GitHub Copilot: Create TypeScript definitions for [FEATURE_NAME]:

Entities: [MAIN DATA ENTITIES]
State Shape: [APPLICATION STATE]
Props Interfaces: [COMPONENT PROPS]
API Responses: [SERVER RESPONSES]

Requirements:
- Strict TypeScript interfaces
- Proper optional vs required fields
- Union types for state variations
- Generic types where appropriate
- Documentation comments
- Consistent naming conventions

Please generate:
1. Entity interfaces
2. State type definitions
3. Props interfaces
4. API response types
5. Utility types if needed
```

### 5. Utility Functions

```
@GitHub Copilot: Create utility functions for [FEATURE_NAME]:

Functions Needed: [LIST FUNCTIONS]
Input/Output Types: [PARAMETER AND RETURN TYPES]
Business Logic: [WHAT CALCULATIONS/TRANSFORMATIONS]

Requirements:
- Pure functions where possible
- TypeScript with proper generics
- Input validation
- Error handling
- Performance considerations
- Comprehensive JSDoc comments

Please generate:
1. Utility function implementations
2. Type definitions for parameters/returns
3. Input validation logic
4. Error handling
5. Usage examples
```

## Implementation Patterns

### Component Implementation Pattern

```typescript
// Component Template Pattern
import { memo, useCallback, useMemo } from "react";
import type { ComponentProps } from "./ComponentName.types";

export const ComponentName = memo<ComponentProps>(
  (
    {
      // Destructure props with proper typing
    }
  ) => {
    // Hooks (state, effects, custom hooks)

    // Memoized values
    const memoizedValue = useMemo(() => {
      // Expensive calculations
    }, [dependencies]);

    // Event handlers
    const handleEvent = useCallback(() => {
      // Event handling logic
    }, [dependencies]);

    // Early returns for loading/error states
    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage error={error} />;

    // Main JSX
    return <div>{/* Component content */}</div>;
  }
);

ComponentName.displayName = "ComponentName";
```

### Hook Implementation Pattern

```typescript
// Hook Template Pattern
import { useState, useEffect, useCallback } from "react";
import type { HookParams, HookReturn } from "./hookName.types";

export const useHookName = (params: HookParams): HookReturn => {
  // State management
  const [state, setState] = useState<StateType>(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Effects
  useEffect(() => {
    // Side effects with cleanup
    return () => {
      // Cleanup logic
    };
  }, [dependencies]);

  // Callbacks
  const actionCallback = useCallback(() => {
    // Action implementation
  }, [dependencies]);

  return {
    state,
    loading,
    error,
    actions: {
      actionCallback,
    },
  };
};
```

### Service Implementation Pattern

```typescript
// Service Template Pattern
import type { ApiResponse, RequestParams } from "./service.types";

class ServiceName {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async fetchData(params: RequestParams): Promise<ApiResponse> {
    try {
      // API implementation with proper error handling
    } catch (error) {
      // Error transformation and re-throwing
    }
  }
}

export const serviceInstance = new ServiceName(API_BASE_URL);
```

## Vite-Specific Implementation Prompts

### 5. Vite Configuration and Environment Setup

```
@GitHub Copilot: Configure Vite for optimal React + TypeScript development:

Project Requirements:
- React 18+ with TypeScript
- Hot Module Replacement (HMR)
- ESLint + Prettier integration
- Path aliases for clean imports
- Environment variable management
- Build optimization for production

Please generate:
1. Complete vite.config.ts with TypeScript support
2. TypeScript configuration (tsconfig.json)
3. ESLint configuration for React + TypeScript
4. Prettier configuration
5. Environment variable typing (vite-env.d.ts)
6. Path alias configuration
7. Build optimization settings
8. Development server configuration
```

### 6. Barrel Exports and Module Organization

```
@GitHub Copilot: Create barrel exports for [FEATURE_NAME] following Vite best practices:

Module Structure:
- Components: [LIST COMPONENTS]
- Hooks: [LIST HOOKS]
- Services: [LIST SERVICES]
- Types: [LIST TYPE FILES]
- Utils: [LIST UTILITIES]

Requirements:
- Tree shaking optimization
- Clear export patterns
- TypeScript support
- Development-friendly imports
- Production build optimization

Please generate:
1. Feature-level index.ts files
2. Component barrel exports
3. Hook barrel exports
4. Type re-exports
5. Service exports
6. Utility exports
7. Main feature export
```

### 7. Vite Asset Integration

```
@GitHub Copilot: Implement asset handling for [COMPONENT_NAME] in Vite:

Asset Types:
- Images: [PNG, SVG, WEBP]
- Styles: [CSS Modules, Styled Components]
- Icons: [SVG components]
- Fonts: [Web fonts]

Requirements:
- Type-safe asset imports
- Optimization for different build modes
- Lazy loading for large assets
- Proper caching strategies

Please generate:
1. Asset import patterns with TypeScript
2. Dynamic import implementations
3. CSS Module integration
4. SVG component generation
5. Asset optimization configuration
```

## Implementation Checklist

### Before Starting Implementation

- [ ] Planning phase completed and documented
- [ ] Architecture decisions reviewed
- [ ] File structure planned
- [ ] TypeScript interfaces defined
- [ ] Dependencies identified
- [ ] Vite configuration ready

### During Implementation

- [ ] Single responsibility principle maintained
- [ ] Props flow unidirectionally (data down, events up)
- [ ] Events bubble up properly through callbacks
- [ ] Constants extracted to appropriate levels
- [ ] TypeScript strict mode compliance
- [ ] ESM imports/exports for tree shaking
- [ ] HMR compatibility maintained
- [ ] Performance optimizations applied

### Agentic Workflow Compliance

- [ ] Used structured prompts from this file
- [ ] Referenced planning phase decisions
- [ ] Maintained consistency with established patterns
- [ ] Generated comprehensive TypeScript types
- [ ] Created testable, maintainable code
- [ ] Followed Vite best practices
- [ ] TypeScript strict mode compliant
- [ ] Error handling implemented
- [ ] Performance optimizations applied
- [ ] Accessibility considered

### After Implementation

- [ ] Component exports added to barrel files
- [ ] Documentation comments added
- [ ] Basic smoke tests passing
- [ ] No TypeScript errors
- [ ] ESLint passing
- [ ] Ready for testing phase

## Copilot Interaction Tips

### Effective Prompting

- Provide complete context about the feature
- Specify exact TypeScript requirements
- Mention performance considerations
- Ask for accessibility attributes
- Request error handling patterns

### Code Quality Requests

- "Make this component more performant"
- "Add proper TypeScript strict mode compliance"
- "Implement comprehensive error handling"
- "Add accessibility attributes"
- "Optimize re-renders with proper memoization"

### Follow-up Questions

- "How can I make this more testable?"
- "What edge cases should I consider?"
- "How can I improve the TypeScript types?"
- "What accessibility improvements can be made?"
- "How can I optimize performance?"

## Next Steps

After implementation:

1. Run architecture validation
2. Move to Testing Phase
3. Create comprehensive test suite
4. Validate all functionality works
