---
description: Retrospect on AI collaboration and feed Bad Cases back into skills.
---

# /team-retro

## ⛔ RED LINES

0. **Before anything else, invoke the `team-skill-maintainer` skill via the Skill tool.** Do not proceed without it.
1. **DO NOT hide or minimize Bad Cases.** Every failure is a chance to improve the skills.
2. **If you discover a systemic issue** (e.g., a skill rule is consistently ignored) → recommend pausing use of that command until the skill is updated.
3. **Every Bad Case MUST have a suggested rule adjustment.** No "just note it" without a fix.

## 📋 EXECUTION CHECKLIST

- [ ] 1. If `$ARGUMENTS` is empty → run `openspec list --all` and ASK
- [ ] 2. Review archived artifacts: proposal.md, tasks.md, verification records
- [ ] 4. Analyze each phase: propose → plan → apply → verify → review → archive
- [ ] 5. For each phase, identify: What worked? What went wrong?
- [ ] 6. Identify Bad Cases where AI behavior deviated from skill rules
- [ ] 7. For each Bad Case: root cause + suggested rule adjustment
- [ ] 8. Generate retro report

## 📤 OUTPUT TEMPLATE

```markdown
# Retrospective: <change-id>

## Overview
- Change: `<change-id>`
- Phases executed: [propose → plan → apply → verify → archive]
- Date: ...

## What Worked
- [phase]: [what went well and why]
- [skill rule]: [rule that was correctly followed]

## Bad Cases

### Bad Case 1: <short description>
- **Trigger:** User said "..." during [phase]
- **Wrong behavior:** AI did [X instead of Y]
- **Expected behavior:** AI should have done [Z]
- **Root cause:** [Why the skill rule failed to prevent this]
- **Fix:** Update [skill-name] to add rule: "[new rule]"

### Bad Case 2: ...

## Skill Updates Needed

### team-openspec-guard
- Add: ...
- Modify: ...

### team-implementation-guard
- Add: ...
- Modify: ...

### team-verification-guard
- Add: ...
- Modify: ...

### (others as needed)

## Command Updates Needed
- `/team-xxx`: [specific change]
- New command suggestion: [if any]

## Test Scenario Updates
- [ ] New scenario: [description]
- [ ] Modify scenario: [description]

## Action Items
- [ ] Update [skill-name] SKILL.md
- [ ] Update [command-name] command file
- [ ] Add test scenario in TestScenarios.md

## Done
This change is fully closed: archived AND retrospected. To start a new change, use `/team-explore` or `/team-propose`.
```

## BAD CASE FORMAT

For every Bad Case found, use this structure:

```markdown
### Bad Case N: <one-line summary>
- **Date:** ...
- **Change:** <change-id>
- **Phase:** propose / plan / apply / verify / review / archive
- **Trigger:** User said: "> [exact quote]"
- **Wrong behavior:** ...
- **Expected behavior:** ...
- **Root cause:** ...
- **Fix:** Update [skill] → add rule: "..."
```

## IF-THIS-THEN-THAT

| User says... | You MUST respond... |
|---|---|
| Skill not loaded | Invoke `team-skill-maintainer` skill via Skill tool before any action. |
| "Everything went fine" | "Let me verify by checking if any skill rules were skipped or weakened during the process." |
| "Don't need to update skills" | "Bad Cases without skill updates will repeat. Even one new rule can prevent future failures." |
| "Just write a summary" | "A summary alone won't prevent recurrence. I need to identify specific rule adjustments." |
