# Testing Phase - Agentic Workflow Prompts

## 🧪 Phase Objective

Use GitHub Copilot to create comprehensive test suites for Vite + React + TypeScript applications that validate functionality, edge cases, and architectural compliance following agentic workflow principles.

## 🚨 IMPORTANT: Agentic Testing Context

- **AI-Generated Tests**: Let GitHub Copilot create comprehensive test coverage based on implementation
- **Vite + Vitest Integration**: Optimize tests for Vite's testing environment and fast feedback
- **Type-Safe Testing**: Ensure all tests leverage TypeScript for better reliability
- **Architecture Validation**: Tests should verify adherence to planning phase decisions
- **Automated Quality**: Focus on tests that can run automatically in CI/CD pipelines

## Core Testing Prompts

### 1. Vite + React Component Testing

```
@GitHub Copilot: Create comprehensive tests for [COMPONENT_NAME] component in a Vite + React + TypeScript environment:

Component Details (from implementation phase):
- Props: [LIST PROPS WITH TYPESCRIPT INTERFACES]
- State: [INTERNAL STATE WITH TYPES]
- Events: [EVENT HANDLERS AND CALLBACKS]
- External Dependencies: [SERVICES, HOOKS, CONTEXT]
- Planning Reference: [COMPONENT RESPONSIBILITY FROM PLANNING]

Vite + Testing Requirements:
- Vitest as test runner (optimized for Vite)
- React Testing Library for DOM interactions
- TypeScript support in tests
- ESM module mocking for Vite compatibility
- Mock external dependencies with type safety
- Test all props variations with TypeScript checking
- Error state testing with typed error boundaries
- User interaction testing with proper event simulation
- Accessibility testing (WCAG compliance verification)

Agentic Testing Focus:
- Validate architectural decisions from planning phase
- Test component boundaries and single responsibility
- Verify unidirectional data flow patterns
- Ensure prop interfaces match planning specifications

Please generate:
1. Complete test file with TypeScript
2. Mock implementations for external dependencies
3. Props variation tests (required/optional/edge cases)
4. State management and lifecycle tests
5. Event handler and callback tests
6. Error boundary and error state tests
7. User interaction tests (click, input, keyboard)
8. Accessibility tests (roles, labels, keyboard navigation)
9. Performance tests (render optimization validation)
10. Integration tests for data flow validation
```

### 2. Custom Hook Testing

```
@GitHub Copilot: Create tests for [HOOK_NAME] custom hook:

Hook Details:
- Parameters: [INPUT PARAMETERS]
- Return Values: [WHAT IT RETURNS]
- Side Effects: [API CALLS, SUBSCRIPTIONS]
- Dependencies: [EXTERNAL DEPENDENCIES]

Test Requirements:
- React Testing Library hooks testing
- Mock external dependencies
- Test all parameter variations
- Test loading and error states
- Test cleanup and unmounting
- Test dependency changes

Please generate:
1. Hook behavior tests
2. Side effect tests
3. Error handling tests
4. Cleanup tests
5. Dependency mocks
6. Performance tests if applicable
```

### 3. Service Testing

```
@GitHub Copilot: Create tests for [SERVICE_NAME] service:

Service Details:
- Methods: [LIST METHODS]
- API Endpoints: [ENDPOINTS CALLED]
- Data Transformations: [HOW DATA IS PROCESSED]
- Error Scenarios: [POSSIBLE ERRORS]

Test Requirements:
- Mock HTTP requests
- Test successful responses
- Test error responses
- Test data transformations
- Test retry logic
- Test timeout scenarios

Please generate:
1. Success path tests
2. Error handling tests
3. Data transformation tests
4. Network failure tests
5. HTTP client mocks
6. Response validation tests
```

### 4. Integration Testing

```
@GitHub Copilot: Create integration tests for [FEATURE_NAME] feature:

Feature Components:
- Components: [LIST COMPONENTS]
- Hooks: [LIST HOOKS]
- Services: [LIST SERVICES]
- Data Flow: [DESCRIBE DATA FLOW]

Test Requirements:
- Test complete user workflows
- Test data flow between components
- Mock external APIs appropriately
- Test error propagation
- Test loading states across components

Please generate:
1. User workflow tests
2. Data flow integration tests
3. Error boundary tests
4. Loading state tests
5. API integration tests
6. State management tests
```

### 5. Accessibility Testing

```
@GitHub Copilot: Create accessibility tests for [COMPONENT_NAME]:

Accessibility Requirements:
- Keyboard navigation
- Screen reader support
- ARIA attributes
- Color contrast
- Focus management

Test Requirements:
- jest-axe for automated testing
- Keyboard navigation testing
- ARIA attribute validation
- Focus management testing
- Screen reader text testing

Please generate:
1. Automated accessibility tests
2. Keyboard navigation tests
3. ARIA attribute tests
4. Focus management tests
5. Screen reader content tests
```

## Testing Patterns and Templates

### Component Test Template

```typescript
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { ComponentName } from "./ComponentName";
import type { ComponentProps } from "./ComponentName.types";

// Mock dependencies
vi.mock("../services/serviceModule", () => ({
  serviceName: {
    method: vi.fn(),
  },
}));

describe("ComponentName", () => {
  const defaultProps: ComponentProps = {
    // Default prop values
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render with default props", () => {
      render(<ComponentName {...defaultProps} />);
      // Assertions
    });

    it("should render different states correctly", () => {
      // Test different prop combinations
    });
  });

  describe("User Interactions", () => {
    it("should handle user events correctly", async () => {
      const onEvent = vi.fn();
      render(<ComponentName {...defaultProps} onEvent={onEvent} />);

      // Simulate user interaction
      fireEvent.click(screen.getByRole("button"));

      await waitFor(() => {
        expect(onEvent).toHaveBeenCalledWith(/* expected args */);
      });
    });
  });

  describe("Error Handling", () => {
    it("should handle and display errors appropriately", () => {
      // Error scenario tests
    });
  });
});
```

### Hook Test Template

```typescript
import { renderHook, act, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { useHookName } from "./useHookName";

// Mock dependencies
vi.mock("../services/api", () => ({
  fetchData: vi.fn(),
}));

describe("useHookName", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with correct default state", () => {
    const { result } = renderHook(() => useHookName(/* params */));

    expect(result.current.state).toEqual(/* expected initial state */);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should handle async operations correctly", async () => {
    const { result } = renderHook(() => useHookName(/* params */));

    await act(async () => {
      result.current.actions.someAction();
    });

    await waitFor(() => {
      expect(result.current.state).toEqual(/* expected state */);
    });
  });

  it("should handle errors appropriately", async () => {
    // Mock error scenario
    const error = new Error("Test error");
    vi.mocked(fetchData).mockRejectedValue(error);

    const { result } = renderHook(() => useHookName(/* params */));

    await act(async () => {
      result.current.actions.someAction();
    });

    await waitFor(() => {
      expect(result.current.error).toBe(error);
    });
  });
});
```

### Service Test Template

```typescript
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { ServiceName } from './ServiceName';

// Mock HTTP client
const mockHttpClient = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
};

vi.mock('../utils/httpClient', () => ({
  httpClient: mockHttpClient,
}));

describe('ServiceName', () => {
  let service: ServiceName;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new ServiceName();
  });

  describe('fetchData', () => {
    it('should fetch and transform data correctly', async () => {
      const mockResponse = { data: /* mock data */ };
      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await service.fetchData(/* params */);

      expect(mockHttpClient.get).toHaveBeenCalledWith(/* expected args */);
      expect(result).toEqual(/* expected transformed data */);
    });

    it('should handle API errors appropriately', async () => {
      const error = new Error('API Error');
      mockHttpClient.get.mockRejectedValue(error);

      await expect(service.fetchData(/* params */)).rejects.toThrow('API Error');
    });
  });
});
```

## Test Categories and Coverage

### Unit Tests

- [ ] Component rendering with various props
- [ ] Hook state management and side effects
- [ ] Service method implementations
- [ ] Utility function logic
- [ ] Error handling scenarios

### Integration Tests

- [ ] Component data flow
- [ ] Hook and service integration
- [ ] Feature workflow testing
- [ ] Error propagation across layers
- [ ] State management integration

### Accessibility Tests

- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] ARIA attributes validation
- [ ] Focus management
- [ ] Color contrast compliance

### Performance Tests

- [ ] Component re-render optimization
- [ ] Hook dependency array validation
- [ ] Memory leak detection
- [ ] Large dataset handling

## Testing Checklist

### Before Testing

- [ ] All components implemented
- [ ] Dependencies identified for mocking
- [ ] Test data fixtures prepared
- [ ] Testing environment configured

### During Testing

- [ ] All public APIs tested
- [ ] Error scenarios covered
- [ ] Edge cases identified and tested
- [ ] Mocks properly configured
- [ ] Accessibility requirements tested

### After Testing

- [ ] Coverage goals met (>80%)
- [ ] All tests passing
- [ ] Performance benchmarks met
- [ ] Accessibility standards met
- [ ] Documentation updated

## Copilot Testing Tips

### Effective Test Prompting

- Specify testing framework (Vitest, React Testing Library)
- Provide component/hook signatures
- Describe expected behaviors
- Mention error scenarios to test
- Ask for accessibility testing

### Test Quality Requests

- "Generate edge case tests for this component"
- "Create comprehensive error handling tests"
- "Add accessibility tests using jest-axe"
- "Generate performance tests for this hook"
- "Create integration tests for this workflow"

### Mock Generation

- "Create mocks for these external dependencies"
- "Generate test fixtures for this data structure"
- "Mock API responses for error scenarios"
- "Create user event simulation for testing"

## Next Steps

After testing:

1. Run full test suite
2. Check coverage reports
3. Move to Refinement Phase
4. Optimize based on test results
