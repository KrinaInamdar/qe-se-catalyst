# Refinement Phase - Agentic Workflow Prompts

## ✨ Phase Objective

Use GitHub Copilot to optimize, refine, and improve code quality, performance, and maintainability for Vite + React + TypeScript applications following agentic workflow principles.

## 🚨 IMPORTANT: Agentic Refinement Context

- **AI-Driven Optimization**: Let GitHub Copilot identify and implement performance improvements
- **Vite Build Optimization**: Focus on bundle size, tree shaking, and build performance
- **Type Safety Enhancement**: Eliminate any remaining loose typing or `any` usage
- **Iterative Improvement**: Use multiple refinement cycles for complex optimizations
- **Maintain Architecture**: Ensure refinements don't break planned component boundaries

## Core Refinement Prompts

### 1. Performance Optimization

```
@GitHub Copilot: Optimize the performance of [COMPONENT/HOOK_NAME]:

Current Implementation: [PASTE CODE OR DESCRIBE]
Performance Concerns:
- [SPECIFIC PERFORMANCE ISSUES]
- [RENDERING PROBLEMS]
- [MEMORY USAGE CONCERNS]

Optimization Requirements:
- Minimize unnecessary re-renders
- Optimize expensive calculations
- Improve memory usage
- Reduce bundle size impact
- Maintain functionality and readability

Please suggest:
1. React.memo optimization opportunities
2. useMemo and useCallback improvements
3. Code splitting possibilities
4. Bundle size optimizations
5. Memory leak prevention
6. Specific performance patterns
```

### 2. Type Safety Enhancement

```
@GitHub Copilot: Improve TypeScript type safety for [FEATURE_NAME]:

Current Types: [CURRENT TYPE DEFINITIONS]
Type Safety Issues:
- [ANY TYPES BEING USED]
- [LOOSE TYPE DEFINITIONS]
- [MISSING GENERICS]

Enhancement Requirements:
- Eliminate 'any' types
- Add comprehensive generics
- Improve type inference
- Add stricter type guards
- Enhance error handling types

Please provide:
1. Stricter type definitions
2. Generic type implementations
3. Type guard functions
4. Discriminated union types
5. Utility type definitions
6. Error type improvements
```

### 3. Code Maintainability Improvements

```
@GitHub Copilot: Improve maintainability of [COMPONENT/SERVICE_NAME]:

Current Code: [PASTE CODE OR DESCRIBE]
Maintainability Concerns:
- [COMPLEX LOGIC]
- [DUPLICATED CODE]
- [UNCLEAR NAMING]

Improvement Requirements:
- Simplify complex logic
- Extract reusable patterns
- Improve naming clarity
- Add comprehensive documentation
- Reduce cognitive complexity

Please suggest:
1. Logic simplification strategies
2. Code extraction opportunities
3. Naming improvements
4. Documentation enhancements
5. Pattern consolidation
6. Complexity reduction techniques
```

### 4. Accessibility Enhancements

```
@GitHub Copilot: Enhance accessibility for [COMPONENT_NAME]:

Current Implementation: [COMPONENT DESCRIPTION]
Accessibility Requirements:
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Focus management
- Color contrast compliance

Enhancement Areas:
- [SPECIFIC ACCESSIBILITY GAPS]
- [KEYBOARD NAVIGATION ISSUES]
- [ARIA ATTRIBUTE IMPROVEMENTS]

Please provide:
1. ARIA attribute improvements
2. Keyboard navigation enhancements
3. Focus management improvements
4. Screen reader optimizations
5. Color and contrast fixes
6. Semantic HTML improvements
```

### 5. Error Handling Refinement

```
@GitHub Copilot: Improve error handling for [FEATURE_NAME]:

Current Error Handling: [DESCRIBE CURRENT APPROACH]
Error Scenarios:
- [API FAILURES]
- [VALIDATION ERRORS]
- [NETWORK ISSUES]
- [UNEXPECTED STATES]

Improvement Requirements:
- Comprehensive error boundaries
- User-friendly error messages
- Proper error recovery
- Logging and monitoring
- Graceful degradation

Please suggest:
1. Error boundary implementations
2. Error message improvements
3. Recovery mechanism strategies
4. Logging integration patterns
5. Fallback UI components
6. Error state management
```

## Refinement Patterns

### Performance Optimization Patterns

```typescript
// Before: Unnecessary re-renders
const Component = ({ items, onSelect }) => {
  return (
    <div>
      {items.map((item) => (
        <ItemComponent
          key={item.id}
          item={item}
          onSelect={() => onSelect(item)} // New function every render
        />
      ))}
    </div>
  );
};

// After: Optimized with useCallback and memo
const Component = memo(({ items, onSelect }) => {
  const handleSelect = useCallback(
    (item) => {
      onSelect(item);
    },
    [onSelect]
  );

  return (
    <div>
      {items.map((item) => (
        <MemoizedItemComponent
          key={item.id}
          item={item}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
});

const MemoizedItemComponent = memo(ItemComponent);
```

### Type Safety Improvements

```typescript
// Before: Loose typing
interface User {
  data: any;
  status: string;
}

// After: Strict typing
interface User {
  data: {
    id: string;
    name: string;
    email: string;
    preferences: UserPreferences;
  };
  status: "loading" | "success" | "error";
  error?: ApiError;
}

interface UserPreferences {
  theme: "light" | "dark";
  notifications: boolean;
  language: SupportedLanguage;
}

type SupportedLanguage = "en" | "es" | "fr" | "de";
```

### Code Maintainability Patterns

```typescript
// Before: Complex component with multiple concerns
const UserProfile = ({ userId }) => {
  // 150+ lines of mixed concerns
};

// After: Separated concerns
const UserProfile = ({ userId }) => {
  const { user, loading, error } = useUser(userId);
  const { updateProfile } = useUserActions();
  const { preferences } = useUserPreferences(userId);

  if (loading) return <UserProfileSkeleton />;
  if (error) return <UserProfileError error={error} />;

  return (
    <UserProfileLayout>
      <UserBasicInfo user={user} />
      <UserPreferences preferences={preferences} onUpdate={updateProfile} />
    </UserProfileLayout>
  );
};
```

## Refinement Checklists

### Performance Refinement

- [ ] Unnecessary re-renders eliminated
- [ ] Expensive calculations memoized
- [ ] Component splitting implemented
- [ ] Bundle size optimized
- [ ] Memory leaks prevented
- [ ] Loading states optimized
- [ ] List rendering optimized
- [ ] Image loading optimized

### Type Safety Refinement

- [ ] All 'any' types eliminated
- [ ] Strict TypeScript configuration
- [ ] Comprehensive interfaces defined
- [ ] Generic types implemented
- [ ] Type guards added
- [ ] Error types specified
- [ ] API response types validated
- [ ] Props interfaces complete

### Code Quality Refinement

- [ ] Complex functions simplified
- [ ] Duplicate code extracted
- [ ] Clear naming conventions
- [ ] Comprehensive documentation
- [ ] Logic separation achieved
- [ ] Constants extracted
- [ ] Error handling comprehensive
- [ ] Testing coverage complete

### Accessibility Refinement

- [ ] ARIA attributes complete
- [ ] Keyboard navigation working
- [ ] Screen reader tested
- [ ] Focus management proper
- [ ] Color contrast compliant
- [ ] Semantic HTML used
- [ ] Error announcements working
- [ ] Loading states announced

## Advanced Refinement Prompts

### Architecture Compliance Review

```
@GitHub Copilot: Review [FEATURE_NAME] for architecture principle compliance:

Principles to validate:
1. Single Responsibility Principle
2. Unidirectional Data Flow
3. Component Hierarchy
4. Constants Extraction
5. Separation of Concerns
6. Feature-Based Organization
7. Predictable Patterns
8. Type Safety First
9. Minimal Cognitive Load

Please identify:
1. Violations of each principle
2. Specific improvement recommendations
3. Refactoring strategies
4. Code examples for fixes
```

### Security Review

```
@GitHub Copilot: Conduct security review for [COMPONENT/SERVICE_NAME]:

Security Concerns:
- Input validation
- XSS prevention
- Data sanitization
- API security
- Authentication handling

Please identify:
1. Security vulnerabilities
2. Input validation gaps
3. Data exposure risks
4. Authentication issues
5. Recommended security patterns
```

### Bundle Size Optimization

```
@GitHub Copilot: Optimize bundle size for [FEATURE_NAME]:

Current Bundle Impact: [SIZE/DEPENDENCIES]
Optimization Goals:
- Reduce bundle size
- Implement code splitting
- Optimize dependencies
- Tree shaking improvements

Please suggest:
1. Code splitting strategies
2. Dynamic import opportunities
3. Dependency optimizations
4. Bundle analyzer insights
5. Lazy loading implementations
```

## Refinement Tools and Commands

### Performance Analysis

```bash
# Bundle analysis
npm run build:analyze

# Performance profiling
npm run test:performance

# Memory leak detection
npm run test:memory
```

### Code Quality Tools

```bash
# Type checking
npm run type-check

# Linting
npm run lint:fix

# Formatting
npm run format

# Architecture validation
./agentic-workflow/hooks/validate-architecture.sh
```

## Copilot Refinement Tips

### Effective Refinement Prompting

- Show specific code sections needing improvement
- Mention performance constraints or goals
- Specify accessibility requirements
- Ask for before/after comparisons
- Request multiple optimization approaches

### Quality Improvement Requests

- "How can I make this more performant?"
- "What accessibility improvements are needed?"
- "How can I improve type safety here?"
- "What security concerns should I address?"
- "How can I reduce cognitive complexity?"

### Architecture Review Questions

- "Does this follow our architecture principles?"
- "How can I better separate concerns here?"
- "What patterns can I extract for reuse?"
- "How can I improve testability?"
- "What edge cases am I missing?"

## Completion Criteria

### Ready for Production

- [ ] Performance benchmarks met
- [ ] Type safety comprehensive
- [ ] Accessibility standards met
- [ ] Security review passed
- [ ] Architecture principles followed
- [ ] Test coverage >90%
- [ ] Documentation complete
- [ ] Code review approved

## Next Steps

After refinement:

1. Final architecture validation
2. Performance testing
3. Security review
4. Documentation updates
5. Team code review
6. Production deployment planning
