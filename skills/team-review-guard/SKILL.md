---
name: team-review-guard
description: Use when doing pre-merge code review, checking requirement alignment, security risks, test coverage, and regression risk.
---

# Team Review Guard

## Core Principle

Code review must systematically cover five dimensions: requirement alignment, security, testing, code quality, and regression risk.

## When to Use

Use this skill when:
- Executing `/team-review` pre-merge review
- Pull request review
- Code quality audit

Do NOT use this skill when:
- Creating proposals (use `team-openspec-guard`)
- Implementing code (use `team-implementation-guard`)
- Verifying task completion (use `team-verification-guard`)
- The change is trivial with no security or regression risk — go directly to `/team-archive`

## Review Dimensions

### 1. Requirement Alignment
- Does every change trace to an OpenSpec requirement?
- Are there out-of-scope changes?
- Are any acceptance criteria missed?

### 2. Security
- Auth/authorization changes
- User input handling (XSS, SQL injection, command injection)
- Sensitive data handling (encryption, masking)
- External API calls

### 3. Test Coverage
- New features tested?
- Bug fixes have regression tests?
- Critical paths covered?

### 4. Code Quality
- Function length (> 50 lines flag)
- Nesting depth (> 4 levels flag)
- Hardcoded values
- Error handling

### 5. Regression Risk
- Shared code changes
- Breaking API changes
- Data migration needs

## Severity Levels

- **CRITICAL**: Security vulnerability, data loss, complete feature failure — MUST fix
- **HIGH**: Missing critical tests, incomplete error handling — SHOULD fix
- **MEDIUM**: Code readability, performance issues — optional fix
- **LOW**: Style, comments, naming suggestions

## Mandatory Stop Conditions

- **CRITICAL security issue found** → STOP, require fix
- **Changes exceed OpenSpec scope** → STOP, ask for clarification
- **Key functionality lacks tests** → STOP, require tests

## Review Checklist

### Requirement Alignment
- [ ] Every change traces to an acceptance criterion
- [ ] No changes unrelated to OpenSpec
- [ ] All ACs have corresponding implementation
- [ ] Non-goals not accidentally introduced

### Security
- [ ] Auth changes have tests
- [ ] User input has validation and escaping
- [ ] No SQL injection
- [ ] No XSS
- [ ] Sensitive data encrypted
- [ ] No hardcoded secrets

### Testing
- [ ] New features have tests
- [ ] Bug fixes have regression tests
- [ ] Critical paths covered
- [ ] Test names are clear

### Code Quality
- [ ] No oversized functions (> 50 lines)
- [ ] No deep nesting (> 4 levels)
- [ ] No obvious code smells
- [ ] Error handling is complete
- [ ] Logging is appropriate

### Regression
- [ ] Shared code changes have broader tests
- [ ] API changes are backward-compatible (or marked BREAKING)
- [ ] Data migration has dry run

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Only reviewing diff, not context | Read related spec, understand design intent |
| Only flagging issues, no solutions | Attach fix suggestion to each CRITICAL |
| Ignoring security | Focus on auth/authz/input handling |
| Accepting weak tests | Critical paths MUST have tests |

## Bad Cases

When this skill fails, record in `badCases/` directory:
- Input: what code was reviewed
- Wrong output: what the AI missed
- Expected output: what it should have found
- New rule needed: how to prevent recurrence

See `badCases/` for case history.
