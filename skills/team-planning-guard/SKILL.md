---
name: team-planning-guard
description: Use when reviewing task breakdowns, checking dependency ordering, optimizing task granularity, or deciding whether to proceed to implementation.
---

# Team Planning Guard

## Core Principle

Task breakdown must be granular enough and dependency-ordered so each task can be independently verified.

## When to Use

Use this skill when:
- Executing `/team-plan` task review
- Checking task breakdown quality
- Checking dependency relationships
- Deciding whether tasks are ready for implementation

Do NOT use this skill when:
- Creating proposals (use `team-openspec-guard`)
- Implementing code (use `team-implementation-guard`)

## Non-Negotiable Rules

- Do NOT proceed with tasks too large to verify — each task must be ≤ 1 hour
- Do NOT proceed with tasks lacking verification methods
- Do NOT proceed with unresolved dependencies (circular or missing)
- Do NOT proceed with unclosed blocking open questions

## Task Quality Checklist

### Granularity
- [ ] Each task ≤ 1 hour
- [ ] No "god tasks" (e.g., "Implement authentication")

### Linkage
- [ ] Each task links to a requirement or design decision
- [ ] No tasks unrelated to requirements

### Dependencies
- [ ] No circular dependencies
- [ ] Correct dependency order (foundations before business logic)
- [ ] Dependency graph is clear

### Verification
- [ ] Each task has a specific verification command or manual scenario
- [ ] Verification can run independently

## Dependency Matrix Format

```markdown
| Task | Depends On | Depended By |
|------|------------|-------------|
| 1.1 Create data model | None | 1.2, 2.1 |
| 1.2 Implement DAO layer | 1.1 | 2.1, 2.2 |
| 2.1 Implement API layer | 1.1, 1.2 | 3.1 |
| 2.2 Implement business logic | 1.2 | 3.1 |
| 3.1 Integration tests | 2.1, 2.2 | None |
```

**Check algorithm:**
1. For each task, list its dependencies
2. For each task, list who depends on it
3. Check no circular dependencies (trace dependency chain)
4. Check no orphan tasks (neither depends nor is depended on)

**ASCII dependency graph:**
```
1.1 ──► 1.2 ──► 2.1 ──► 3.1
         │
         └─► 2.2 ──► 3.1
```

## Task Template

```markdown
- [ ] X.Y <Task title>
  - Requirement: <requirement name or ID>
  - Verification: `<command or manual scenario>`
  - Estimate: <minutes>
  - Depends on: <preceding task, if any>
```

Example:
```markdown
## 1. Data Layer

- [ ] 1.1 Create User model with email verification fields
  - Requirement: user-registration
  - Verification: `pytest tests/models/test_user.py -v`
  - Estimate: 30 min

- [ ] 1.2 Create password reset token model
  - Requirement: password-reset
  - Verification: `pytest tests/models/test_reset_token.py -v`
  - Estimate: 25 min
  - Depends on: 1.1

## 2. API Layer

- [ ] 2.1 Implement registration endpoint
  - Requirement: user-registration
  - Verification: `pytest tests/api/test_register.py -v`
  - Estimate: 45 min
  - Depends on: 1.1

- [ ] 2.2 Implement password reset flow
  - Requirement: password-reset
  - Verification: `pytest tests/api/test_password_reset.py -v`
  - Estimate: 60 min
  - Depends on: 1.2

## 3. Integration

- [ ] 3.1 End-to-end registration test
  - Requirement: user-registration
  - Verification: `pytest tests/e2e/test_registration_flow.py -v`
  - Estimate: 30 min
  - Depends on: 2.1
```

## Risk Signals

STOP and ask before continuing when:
- Multiple tasks have circular dependencies
- Critical dependency missing (e.g., API contract not decided)
- Task breakdown too coarse (single task > 2 hours)
- Acceptance criteria can't map to specific tasks
- Deferred tasks > 30% with no clear follow-up plan

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Task "Implement authentication" | Split into model, API, tests subtasks |
| Verification "works correctly" | Write specific command like `pytest tests/auth/` |
| Dependencies not marked | Add "Depends on: Task X" in description |
| Basic tasks skipped | Ensure models, config, dependencies come first |

## Bad Case Recording

When this skill fails, record:
- Input: what the user said
- Wrong output: what the AI did that it shouldn't have
- Expected output: what it should have done
- New rule needed: how to prevent recurrence
