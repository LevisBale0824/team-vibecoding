---
description: Incrementally implement an approved OpenSpec change.
---

# /team-apply

## ⛔ RED LINES — READ BEFORE EVERY TASK

0. **Before anything else, invoke the `team-implementation-guard` skill via the Skill tool.** Do not proceed without it.
1. **ONE TASK AT A TIME.** Complete task N, verify it, mark it done, then move to task N+1.
2. **DO NOT implement anything NOT in tasks.md.** "While I'm here" refactors are FORBIDDEN.
3. **DO NOT mark a task complete without evidence.** Run the verification command and record the result.
4. **DO NOT "fix" tests by weakening assertions** unless the spec changed.
5. **DO NOT guess the root cause of a bug.** Investigate first, then fix.
6. **If user says "skip testing"** → REFUSE. Respond: "I cannot mark work complete without verification. Let me run at least [shortest safe verification]."
7. **If you discover a design issue** → STOP. Suggest updating OpenSpec artifacts before continuing.

## 📋 EXECUTION CHECKLIST

- [ ] 1. If `$ARGUMENTS` is empty → run `openspec list` and ASK
- [ ] 2. Read: proposal.md, design.md (if exists), tasks.md, all spec deltas
- [ ] 4. Build task list: find all `- [ ]` unchecked items
- [ ] 5. For each task (one at a time):
  - [ ] 5a. Read the task and its requirements
  - [ ] 5b. Define the verification path BEFORE editing code
  - [ ] 5c. Write tests FIRST for behavior changes
  - [ ] 5d. Implement the minimal change to pass
  - [ ] 5e. Run the targeted verification
  - [ ] 5f. If shared code was changed → run broader verification
  - [ ] 5g. Update tasks.md: `- [x]` with verification result
- [ ] 6. Report progress after each task

## 📤 PER-TASK REPORT

After each task, output:

```markdown
## Completed: Task X.Y — <description>
- Verification: `<command>`
- Result: ✅ <output summary>

## Remaining
- [ ] Task A.B
- [ ] Task C.D

## Current Status: N/M tasks done
```

## FULL PROGRESS REPORT (on request or completion)

```markdown
# Implementation Progress: <change-id>

## Completed
- [x] Task 1.1: ...
  - Verification: `pytest tests/... -v`
  - Result: ✅ 8 passed

## In Progress
Task 2.1: ...
- Status: ...
- Blocked by: ...

## Remaining
- [ ] Task 2.2
- [ ] Task 3.1

## Blockers
- ...

## Next Command
→ **`/team-verify <change-id>`**
```

## TDD RULES

Test-first is REQUIRED for:
- New behavior
- Bug fixes
- Validation logic changes
- Data transformation changes
- Permission or security changes

If test-first is impractical → state why AND provide an equivalent verification path BEFORE editing.

## IF-THIS-THEN-THAT

| User says... | You MUST respond... |
|---|---|
| Skill not loaded | Invoke `team-implementation-guard` skill via Skill tool before any action. |
| "不用测了 / skip testing" | "I cannot mark work complete without verification. The shortest safe check I can run is: [suggestion]. Should I proceed?" |
| "Also fix X while you're there" | "X is not in tasks.md. I'll finish the current task first. If X is needed, update the OpenSpec tasks." |
| "Just mark it done" | "I need evidence. Let me run the verification command first." |
| Test fails unexpectedly | "Test failed at [location]. Let me investigate the root cause before making code changes." |
