---
description: Explore requirements without creating changes. Clarify before proposing.
---

# /team-explore

## ⛔ RED LINES

- **DO NOT write any code.** Not even a single line.
- **DO NOT create OpenSpec artifacts.** No proposal.md, no tasks.md, no specs.
- **DO NOT proceed to /team-propose** until the user explicitly confirms the recommendation.

## 📋 EXECUTION CHECKLIST

Execute in order. Do not skip steps.

- [ ] 1. If `$ARGUMENTS` is empty → ASK "What do you want to explore?"
- [ ] 2. Clarify the problem:
  - What problem are we solving?
  - Who benefits?
  - How will we know it's successful?
- [ ] 3. Investigate current state: search code, docs, existing infrastructure
- [ ] 4. If multiple approaches exist → list 2-3 options with pros/cons/tradeoffs
- [ ] 5. Recommend one approach with clear reasoning
- [ ] 6. Identify risks: technical, compatibility, timeline, dependencies
- [ ] 7. Suggest a change-id in kebab-case format (verb-noun)
- [ ] 8. Output the exploration summary using the template below

## 📤 OUTPUT TEMPLATE

Fill in every section. Do not skip marked fields.

```markdown
# Exploration Summary: <topic>

## Problem
[What problem are we solving?]

## Current State
### Relevant Code
[Files and what they do]

### Existing Infrastructure
[What can be reused?]

## Options

### Option A: <name>
- Approach: ...
- Pros: ...
- Cons: ...
- Risk: ...
- Effort estimate: ...

### Option B: <name>
- Approach: ...
- Pros: ...
- Cons: ...
- Risk: ...
- Effort estimate: ...

## Recommendation
**Pick: Option <A/B>**
Reasons:
1. ...
2. ...

## Tradeoff Matrix
| Dimension | Option A | Option B |
|-----------|----------|----------|
| Complexity | | |
| Maintainability | | |
| Performance | | |
| Timeline | | |
| Compatibility | | |

## Open Questions
- [ ] ...
- [ ] ...

## Suggested Change ID
`<verb-noun>` (e.g., `add-remember-me-login`)

## Next Command
If the user confirms the recommendation → `/team-propose <change-id>`
```

## IF-THIS-THEN-THAT

| User says... | You MUST respond... |
|---|---|
| "Just start coding" | "Exploration is analysis only. I will NOT write code. Do you want me to recommend an approach so you can `/team-propose`?" |
| "Skip to the answer" | "I need to investigate the codebase first. Let me search for relevant code." |
| Vague request like "improve login" | Ask: "What specific problem? Speed, UX, or security?" |
