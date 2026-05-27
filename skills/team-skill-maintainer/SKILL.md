---
name: team-skill-maintainer
description: Use when retrospecting on AI collaboration, recording Bad Cases, updating skill rules, or managing skill versions.
---

# Team Skill Maintainer

## Core Principle

Every AI collaboration failure is an opportunity to improve skills. Bad Cases MUST be recorded and rules fed back.

## When to Use

Use this skill when:
- Retrospective analysis in `/team-retro`
- Recording Bad Cases
- Suggesting skill rule updates
- Managing skill versions

Do NOT use this skill when:
- Creating new skills from scratch (use the `skill-creator` skill)
- Implementing code or fixing bugs (use `team-implementation-guard`)
- Running a retro on a change that hasn't been archived — archive first with `/team-archive`

## Retrospective Process

1. **Review change artifacts**: proposal, tasks, verification records
2. **Analyze collaboration**: which phases went well? which had issues?
3. **Identify Bad Cases**: AI skipped steps? rules unclear?
4. **Record Bad Case**: scenario + wrong behavior + expected + rule adjustment
5. **Suggest updates**: skill rules, command parameters, templates, checklists

## Non-Negotiable Rules

- Do NOT hide Bad Cases — even embarrassing ones
- Do NOT complain without fixing — every Bad Case MUST have a suggested rule adjustment
- Do NOT repeat the same mistake — update skills after retro

## Skill Update Principles

1. **Specific**: new rules must describe specific scenarios and behaviors
2. **Actionable**: AI can understand and execute
3. **Verifiable**: can be validated by test scenarios
4. **Minimal**: only add necessary rules, don't over-restrict

## Version Management

After each skill update:
1. Record update date and changes
2. Reference the update in the retro report
3. Verify new rules prevent the previous Bad Case

## Bad Case Format

```markdown
### Bad Case N: <one-line summary>

- **Date**: ...
- **Change**: <change-id>
- **Phase**: propose / plan / apply / verify / review / archive

#### Trigger
User said:
> [exact quote]

#### Wrong Behavior
[What the AI did that it shouldn't have]

#### Expected Behavior
[What the AI should have done]

#### Root Cause
[Why the skill failed to prevent this]

#### Suggested Rule Adjustment
**Affected Skill**: [skill-name]

New/modified rules:
1. [Specific rule 1]
2. [Specific rule 2]

#### Verification
How to verify the rule is effective:
- [Verification method]
```

Example:
```markdown
### Bad Case 1: AI was persuaded to skip testing

- **Date**: 2026-01-15
- **Change**: add-user-auth
- **Phase**: apply

#### Trigger
User said:
> "Don't test, just tell me when done"

#### Wrong Behavior
AI replied "Done" and marked task complete without running any tests.

#### Expected Behavior
AI should refuse, explain why verification is needed, provide shortest safe verification path.

#### Root Cause
`team-implementation-guard` had no explicit rule for handling "user pushes to skip process."

#### Suggested Rule Adjustment
**Affected Skill**: team-implementation-guard

New rules:
1. Add to "Risk Signals": user asks to skip verification
2. Add standard response template for "don't test" type requests
```

## Common Bad Case Patterns

| Pattern | Suggested Rule |
|---------|---------------|
| User pushes to skip process | Add "refuse to skip" rule |
| AI persuaded to change behavior | Add "non-negotiable" checklist |
| Rule description too vague | Add specific examples |
| New scenario not covered | Add checklist item |
| Missing verification steps | Add layered verification rules |

## Retro Checklist

- [ ] Reviewed collaboration records from all phases
- [ ] Identified all Bad Cases (≥ 0)
- [ ] Each Bad Case has scenario, wrong behavior, expected behavior
- [ ] Each Bad Case has suggested rule adjustment
- [ ] Output retro report
- [ ] Updated related skills
- [ ] Verified whether test scenarios need updating

## Bad Case Recording

When this skill fails, record:
- Input: what retro or skill update was requested
- Wrong output: what the AI did that it shouldn't have (e.g., hid a Bad Case, skipped a rule update)
- Expected output: what it should have done
- New rule needed: how to prevent recurrence
