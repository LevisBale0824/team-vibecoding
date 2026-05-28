---
description: Incrementally implement an approved OpenSpec change with TDD and parallel execution.
---

# /team-apply

## ⛔ RED LINES — READ BEFORE EVERY TASK

0. **Before anything else, invoke the `team-implementation-guard` skill via the Skill tool.** Do not proceed without it.
1. **ONE TASK AT A TIME (unless parallel).** Complete task N, verify it, mark it done, then move to task N+1.
2. **DO NOT implement anything NOT in tasks.md.** "While I'm here" refactors are FORBIDDEN.
3. **DO NOT mark a task complete without evidence.** Run the verification command and record the result.
4. **DO NOT "fix" tests by weakening assertions** unless the spec changed.
5. **DO NOT guess the root cause of a bug.** Investigate first, then fix.
6. **If user says "skip testing"** → REFUSE. Respond: "I cannot mark work complete without verification. Let me run at least [shortest safe verification]."
7. **If you discover a design issue** → STOP. Suggest updating OpenSpec artifacts before continuing.

## 📋 EXECUTION CHECKLIST

- [ ] 1. If `$ARGUMENTS` is empty → run `openspec list` and ASK
- [ ] 2. Read: proposal.md, design.md (if exists), tasks.md, all spec deltas
- [ ] 3. Invoke `superpowers:test-driven-development` skill via Skill tool
- [ ] 4. Parse tasks.md → build dependency graph
- [ ] 5. Ask user: execution mode?
  - **Inline (default)** — execute in current session
  - **Subagent** — dispatch fresh subagent per task
  - **Parallel** — dispatch parallel subagents for independent tasks
- [ ] 6. Execute tasks based on mode:
  - **Inline:** Execute one by one with TDD flow
  - **Subagent:** Dispatch subagent per task (use `superpowers:subagent-driven-development`)
  - **Parallel:** Dispatch parallel subagents for independent tasks (use `superpowers:dispatching-parallel-agents`)
- [ ] 7. For each task:
  - [ ] 7a. Read the task and its requirements
  - [ ] 7b. Define the verification path BEFORE editing code
  - [ ] 7c. Write tests FIRST (TDD)
  - [ ] 7d. Implement the minimal change to pass
  - [ ] 7e. Run the targeted verification
  - [ ] 7f. If shared code was changed → run broader verification
  - [ ] 7g. Update tasks.md: `- [x]` with verification result
- [ ] 8. After ALL tasks complete → Spec Compliance Review:
  - [ ] 8a. Check: does implementation match requirements?
  - [ ] 8b. Check: any extra features (scope creep)?
  - [ ] 8c. Check: any missing requirements?
  - [ ] 8d. Check: does implementation match design?
- [ ] 9. Report and suggest next step

## 📤 OUTPUT TEMPLATE

```markdown
# Implementation Complete: <change-id>

## Execution Summary
- Mode: Inline / Subagent / Parallel
- Tasks completed: X / Y
- TDD: Yes (tests written first)

## Task Results
| Task | Status | Verification | Evidence |
|------|--------|--------------|----------|
| 1.1 | ✅ | `pytest tests/...` | 8 passed |
| 1.2 | ✅ | `npm test` | All green |

## Spec Compliance Review
| Check | Status | Notes |
|-------|--------|-------|
| Requirements matched | ✅/❌ | ... |
| No scope creep | ✅/❌ | ... |
| No missing requirements | ✅/❌ | ... |
| Design followed | ✅/❌ | ... |

## Next Command
→ **`/team-verify <change-id>`**
```

## IF-THIS-THEN-THAT

| User says... | You MUST respond... |
|---|---|
| Skill not loaded | Invoke `team-implementation-guard` skill via Skill tool before any action. |
| "不用测了 / skip testing" | "I cannot mark work complete without verification. The shortest safe check I can run is: [suggestion]. Should I proceed?" |
| "Also fix X while you're there" | "X is not in tasks.md. I'll finish the current task first. If X is needed, update the OpenSpec tasks." |
| "Just mark it done" | "I need evidence. Let me run the verification command first." |
| Test fails unexpectedly | "Test failed at [location]. Let me investigate the root cause before making code changes." |
| "Use subagent mode" | "Switching to subagent mode. Each task will be dispatched to a fresh subagent." |
| "Use parallel mode" | "Switching to parallel mode. Independent tasks will run in parallel." |
