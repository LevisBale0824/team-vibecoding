---
name: team-skill-maintainer
description: Use when retrospecting on AI collaboration, recording bad cases, updating skill rules, or managing skill versions.
---

# Team Skill Maintainer

## Core Principle

Every AI collaboration failure is an opportunity to improve skills. Bad Cases MUST be recorded in the affected skill's `badCases/` directory and rules fed back into SKILL.md.

## When to Use

Use this skill when:
- Retrospective analysis in `/team-retro`
- Recording bad cases
- Suggesting skill rule updates
- Managing skill versions

Do NOT use this skill when:
- Creating new skills from scratch (use `superpowers:writing-skills`)
- Implementing code or fixing bugs (use `team-implementation-guard`)
- Running a retro on a change that hasn't been archived — archive first with `/team-archive`

## Retrospective Process

1. **Review change artifacts**: proposal, tasks, verification records
2. **Analyze collaboration**: which phases went well? which had issues?
3. **Identify failures**: AI skipped steps? rules unclear?
4. **Record bad case**: write to affected skill's `badCases/` directory (NOT inline in SKILL.md)
5. **Update rules**: add new rules to SKILL.md — only rules, not case details

## Non-Negotiable Rules

- Do NOT hide failures — even embarrassing ones
- Do NOT complain without fixing — every bad case MUST have a suggested rule adjustment
- Do NOT repeat the same mistake — update skills after retro
- Do NOT embed bad cases in SKILL.md — write to `badCases/` directory, keep SKILL.md lean

## Skill Update Principles

1. **Specific**: new rules must describe specific scenarios and behaviors
2. **Actionable**: AI can understand and execute
3. **Verifiable**: can be validated by test scenarios
4. **Minimal**: only add necessary rules, don't over-restrict

## Version Management

After each skill update:
1. Record update date and changes
2. Reference the update in the retro report
3. Verify new rules prevent the previous failure

## Bad Case Format

Write bad cases to the affected skill's `badCases/` directory:
```
skills/<skill-name>/badCases/<NNN>-<short-name>.md
```

File naming: sequential number + short descriptive name (e.g., `001-stop-between-tasks.md`).

```markdown
# Bad Case NNN: <one-line summary>

- **Date**: ...
- **Change**: <change-id>
- **Phase**: propose / plan / apply / verify / review / archive

## Trigger
User said:
> [exact quote]

## Wrong Behavior
[What the AI did that it shouldn't have]

## Expected Behavior
[What the AI should have done]

## Root Cause
[Why the skill failed to prevent this]

## Rule Changes
**Affected Skill**: [skill-name]

New/modified rules:
1. [Specific rule 1]
2. [Specific rule 2]
```

Example:
```
skills/team-implementation-guard/badCases/001-stop-between-tasks.md
```

```markdown
# Bad Case 001: AI Paused Between Tasks Asking for Confirmation

- **Date**: 2026-05-31
- **Change**: chunked-upload
- **Phase**: apply

## Trigger
User invoked `/team-apply`. AI completed Task 1.1 and ended with "开始 Task 1.2?"

## Wrong Behavior
After each task, AI reported progress then asked "开始 Task X.Y?" instead of continuing.

## Expected Behavior
AI should immediately proceed to the next task without asking.

## Root Cause
Task Loop rule said "ONE TASK AT A TIME" but never stated the loop should continue autonomously.

## Rule Changes
**Affected Skill**: team-implementation-guard

1. Task Loop preamble: "autonomous — immediately proceed to the next"
2. Task Loop step 8: "Immediately continue — do NOT ask for permission"
3. Common Mistakes table: added "Pause between tasks" entry
```

## Common Failure Patterns

| Pattern | Suggested Rule |
|---------|---------------|
| User pushes to skip process | Add "refuse to skip" rule |
| AI persuaded to change behavior | Add "non-negotiable" checklist |
| Rule description too vague | Add specific examples |
| New scenario not covered | Add checklist item |
| Missing verification steps | Add layered verification rules |

## Retro Checklist

- [ ] Reviewed collaboration records from all phases
- [ ] Identified all failures (≥ 0)
- [ ] Each failure has scenario, wrong behavior, expected behavior
- [ ] Each failure has suggested rule adjustment
- [ ] Bad case written to affected skill's `badCases/` directory
- [ ] Only new rules added to SKILL.md (no case details)
- [ ] Output retro report
- [ ] Verified whether test scenarios need updating

## Bad Cases

When this skill fails, record in `badCases/` directory:
- Input: what retro or skill update was requested
- Wrong output: what the AI did that it shouldn't have (e.g., hid a failure, skipped a rule update)
- Expected output: what it should have done
- New rule needed: how to prevent recurrence

See `badCases/` for case history.
