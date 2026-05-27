---
name: team-verification-guard
description: Use when verifying completed work, checking OpenSpec readiness, running tests, reviewing evidence, or deciding if ready to archive.
---

# Team Verification Guard

## Core Principle

Verification must be layered. Each layer must pass before proceeding to the next. **No evidence = no claim of readiness.**

## When to Use

Use this skill when:
- Executing `/team-verify` layered verification
- Deciding whether to archive
- Checking task completion
- Verifying acceptance criteria alignment

Do NOT use this skill when:
- Creating proposals (use `team-openspec-guard`)
- Implementing code (use `team-implementation-guard`)

## Layer 1: OpenSpec Validity

```bash
openspec validate <change-id> --strict
```

Checks:
- Spec delta format correct (`## ADDED/MODIFIED/REMOVED/RENAMED Requirements`)
- Every requirement contains `SHALL`/`MUST`
- Every requirement has ≥ 1 `#### Scenario:`
- No conflicting sections (e.g., both ADDED and REMOVED)
- No zero errors

## Layer 2: Task Completion

Check `tasks.md`:
- [ ] Every required task marked `- [x]`
- [ ] Every completed task has evidence
- [ ] Deferred tasks have reasons and follow-up plan

| Task | Status | Evidence |
|------|--------|----------|
| 1.1 | ✅ | `pytest tests/models/test_user.py` — 8 passed |
| 1.2 | ✅ | Manual: http://localhost:3000/ verified |
| 2.1 | ❌ | Blocked: API contract undecided |

## Layer 3: Project Checks

| Check | Command | Result |
|-------|---------|--------|
| Lint | `npm run lint` | 0 errors |
| Unit Tests | `pytest tests/` | all passed |
| Build | `npm run build` | success |
| Typecheck (if TS) | `tsc --noEmit` | 0 errors |

## Layer 4: Acceptance Criteria

| AC | Evidence | Status |
|----|----------|--------|
| AC-1: ... | `pytest tests/...` | ✅ |
| AC-2: ... | Manual: ... | ⚠ |

## Non-Negotiable Rules

- Do NOT claim "ready" if any required task is incomplete
- Do NOT claim "ready" if `openspec validate --strict` fails
- Do NOT claim "ready" if you have not run tests (or explained why not)
- Do NOT infer "passing" from the absence of errors in chat — run the actual commands
- Do NOT hide skipped checks — list them explicitly with reasons
- Do NOT mark an AC as passed without evidence

## Layered Checklist

### Layer 1:
- [ ] `openspec validate <change-id> --strict` passes
- [ ] No zero errors
- [ ] Warnings reviewed and confirmed non-blocking

### Layer 2:
- [ ] X / Y tasks completed
- [ ] Each completed task has evidence
- [ ] Deferred tasks: reason + follow-up plan

### Layer 3:
- [ ] Lint: 0 errors
- [ ] Unit tests: all pass
- [ ] Build: success
- [ ] Typecheck (if applicable): 0 errors

### Layer 4:
- [ ] Every AC has matching evidence
- [ ] Evidence is verifiable (not "looks fine")
- [ ] Failures/missing items marked and recorded

## Archive Readiness

**Must satisfy:**
- [ ] All required tasks marked `- [x]`
- [ ] `openspec validate <change-id> --strict` passes
- [ ] All ACs have evidence
- [ ] All project checks pass (lint / test / build)
- [ ] No unresolved hard-blocking open questions

**Conditional (archive with notes):**
- Deferred tasks: reason + follow-up plan
- Skipped checks: alternative verification path
- Risks: assessed and recorded

**Cannot archive:**
- OpenSpec validation fails
- Required tasks incomplete
- Core ACs lack evidence
- Project checks not run
- Unresolved hard blockers exist

## Final Verdict

- ✅ **Ready**: Layers 1-4 all pass
- ⚠ **Conditional**: Critical risks exist but documented
- ❌ **Not Ready**: Any layer has blocking issues

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Claiming "looks fine" | Run specific commands and provide output |
| Running only partial tests | Run the full test suite |
| Skipping lint/build | At minimum confirm core checks pass |
| Marking AC passed without evidence | Attach test name or manual steps to each |
| Hiding skipped checks | List skipped items and reasons explicitly |

## Bad Case Recording

When this skill fails, record:
- Input: what the user said
- Wrong output: what the AI did that it shouldn't have
- Expected output: what it should have done
- New rule needed: how to prevent recurrence
