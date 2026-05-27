---
name: team-apply
description: Use when implementing an approved OpenSpec change, progressing through tasks, updating task status, or continuing an incomplete implementation.
---

# Team Apply Guard

## Core Principle

`/team-apply` is the coordination entry point. It dispatches to `team-implementation-guard` and TDD process.

## When to Use

Use this skill when:
- `/team-apply <change-id>` is executed
- Continuing a previously incomplete implementation
- Progressing through tasks.md task by task

Do NOT use this skill when:
- Creating proposals or spec deltas (use `team-openspec-guard`)
- Verifying completed work (use `team-verification-guard`)
- Reviewing code before merge (use `team-review-guard`)
- No OpenSpec change exists yet — create one with `/team-propose` first

## Process

1. Accept change-id
2. Read OpenSpec artifacts (proposal, design, tasks, specs)
3. Use `team-implementation-guard` to govern each task's implementation
4. Follow TDD discipline
5. Generate progress reports

## Key Rules

- One task at a time
- Verify before marking complete
- Don't do anything out of scope
- Stop and ask when you hit an issue

## Examples

### Standard flow
```
User: /team-apply add-user-auth

AI:
1. Read openspec/changes/add-user-auth/tasks.md
2. Find 5 incomplete tasks
3. Pick task 1.1: Create User model
4. Write tests first: tests/models/test_user.py
5. Implement models/user.py
6. Run pytest: 8 passed
7. Update tasks.md: mark 1.1 complete
8. Continue to task 1.2...
```

### Resume after interruption
```
User: /team-apply add-user-auth

AI:
1. Read tasks.md
2. Find tasks 2.1 and 2.2 complete, 3.1 incomplete
3. Resume from task 3.1
4. "Continuing add-user-auth, completed 4/5, current task 3.1"
```

### Blocked by open questions
```
User: /team-apply add-payment

AI:
1. Read proposal.md
2. Find unresolved hard blocker:
   - Q1: Payment gateway selection (Hard block)
3. Stop implementation: "Unresolved hard blocker exists. Please confirm payment gateway before continuing."
```

## Relationship with Guard Skills

```
/team-apply
  ├── team-implementation-guard (implementation guardrails)
  ├── TDD guidance (test-first)
  └── Progress reporting (done/in-progress/remaining/blocked)
```

## Bad Case Recording

When this skill fails, record:
- Input: what the user said
- Wrong output: what the AI did that it shouldn't have
- Expected output: what it should have done
- New rule needed: how to prevent recurrence
