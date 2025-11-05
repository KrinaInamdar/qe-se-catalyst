# Agentic Workflow for React Development

This directory contains structured prompts and instructions for using GitHub Copilot in an agentic workflow to build React applications with Vite and TypeScript.

## 🎯 Workflow Philosophy

The agentic workflow treats GitHub Copilot as an intelligent development partner that can:

- Make architectural decisions when guided with proper context
- Generate high-quality, type-safe code following best practices
- Create comprehensive test suites
- Optimize and refine code for performance and maintainability

## 📋 Prerequisites

Before using these prompts, ensure you have:

- GitHub Copilot enabled in VS Code
- Basic understanding of React, TypeScript, and Vite
- These instruction files open in your VS Code workspace

## 🔄 The Four-Phase Process

### Phase 1: Planning (`frontend/planning-prompts.md`)

**Objective**: Architecture and design decisions

**What happens**:

- Define feature requirements and scope
- Plan component hierarchies following Single Responsibility Principle
- Design data flow patterns (unidirectional)
- Plan service layer architecture
- Define TypeScript interfaces and types

**Key Prompts**:

- Feature Architecture Planning
- Component Responsibility Definition
- Data Flow Architecture
- Service Layer Planning
- Testing Strategy Planning

### Phase 2: Implementation (`frontend/implementation-prompts.md`)

**Objective**: Generate code following planned architecture

**What happens**:

- Generate React components with TypeScript
- Create custom hooks for state management
- Implement service layers for API interactions
- Define comprehensive type definitions
- Build utilities and helper functions

**Key Prompts**:

- React Component Generation
- Custom Hook Generation
- Service Layer Implementation
- Type Definitions
- Utility Function Creation

### Phase 3: Refinement (`frontend/refinement-prompts.md`)

**Objective**: Optimize and improve code quality

**What happens**:

- Performance optimization (memo, callbacks, lazy loading)
- Type safety enhancements (eliminate any types)
- Code maintainability improvements
- Accessibility enhancements
- Security improvements

**Key Prompts**:

- Performance Optimization
- Type Safety Enhancement
- Code Maintainability Improvements
- Accessibility Enhancements
- Security Hardening

### Phase 4: Testing (`frontend/testing-prompts.md`)

**Objective**: Comprehensive test coverage

**What happens**:

- Component unit testing
- Custom hook testing
- Service layer testing
- Integration testing
- End-to-end test planning

**Key Prompts**:

- Component Testing
- Custom Hook Testing
- Service Testing
- Integration Testing
- E2E Test Planning

## 🛠️ How to Use These Prompts

### 1. Context Management Strategies

**Option A: Smart Referencing (Recommended)**

```
@GitHub Copilot: Following the planning patterns in `agentic-workflow/instructions/frontend/planning-prompts.md`, help me plan a [FEATURE_NAME] feature...
```

**Option B: VS Code Workspace Context**

- GitHub Copilot automatically scans your workspace
- Use `@workspace` in prompts for broader context
- Descriptive file names help Copilot understand purpose

**Option C: Project-Wide Instructions (Recommended)**
The `.copilot-instructions.md` file provides automatic context:

- Always available to Copilot without manual file opening
- Contains project principles and workflow patterns
- References detailed instruction files when needed
- Provides consistent guidance across all interactions

### 2. Enhanced Prompt Workflow

1. Open the relevant prompt file for your current phase
2. Find the appropriate prompt template
3. Fill in the bracketed placeholders with your specific requirements
4. Copy the entire prompt to GitHub Copilot
5. Review and iterate on the generated code

### 3. Advanced Context Management

**Automatic Context:**

- Copilot scans your entire workspace automatically
- File names and structure provide context clues
- Related files are automatically considered

**Explicit Context:**

- Reference specific files in prompts when you need their exact content
- Use `@workspace` for broader project context
- Mention specific patterns or examples from your codebase

**Best Practices:**

- Use descriptive file and folder names
- Maintain consistent project structure
- Reference instruction files by name in prompts when needed

### 4. Iterative Refinement

- Use multiple prompts from the same phase for complex features
- Move between phases as needed (planning → implementation → refinement)
- Always test generated code before moving to the next phase

## 🎨 Technology Stack Integration

### Vite Configuration

The prompts are optimized for:

- Vite as the build tool
- Hot Module Replacement (HMR)
- TypeScript configuration
- ESLint and Prettier integration

### React Patterns

The workflow promotes:

- Functional components with hooks
- TypeScript strict mode
- Component composition over inheritance
- Custom hooks for reusable logic
- Proper prop typing and validation

### Testing Stack

Integrated testing approach with:

- Vitest as the test runner
- React Testing Library for component testing
- MSW for API mocking
- Playwright for E2E testing (optional)

## 💡 Best Practices

### Do's

✅ Always start with planning phase for new features
✅ Use specific, detailed prompts with clear requirements
✅ Maintain type safety throughout all phases
✅ Generate tests alongside implementation
✅ Iterate and refine based on Copilot suggestions

### Don'ts

❌ Skip the planning phase for complex features
❌ Use generic prompts without specific requirements
❌ Accept generated code without review and testing
❌ Mix responsibilities in components (violate SRP)
❌ Generate code without proper TypeScript typing

## 🔧 Troubleshooting

**Copilot generates inconsistent code**:

- Ensure all instruction files are open in VS Code
- Provide more specific context in your prompts
- Reference existing code patterns in your requests

**Generated code doesn't follow TypeScript best practices**:

- Use the refinement phase prompts to improve type safety
- Specify strict TypeScript requirements in your prompts

**Tests are incomplete or missing edge cases**:

- Use the comprehensive testing prompts
- Iterate with multiple test generation requests
- Specify edge cases explicitly in your prompts

## 📈 Measuring Success

- **Code Quality**: Comprehensive TypeScript usage, no `any` types
- **Performance**: Optimized re-renders, proper memoization
- **Testing**: High test coverage with meaningful assertions
- **Maintainability**: Clear component boundaries, readable code
- **Accessibility**: WCAG compliance, proper semantic HTML
