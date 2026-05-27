---
description: Create an OpenSpec change proposal with team guardrails.
---

# /team-propose

## ⛔ RED LINES — READ FIRST

These are non-negotiable. You MUST comply.

0. **Before anything else, invoke the `team-openspec-guard` skill via the Skill tool.** Do not proceed without it.
1. **DO NOT implement any code.** This phase is planning only.
2. **DO NOT skip `openspec validate --strict`.** If it fails, fix the artifacts before reporting done.
3. **DO NOT proceed if hard-blocking open questions exist** (API fields, permissions, data migration, payments, security, UX branching, backward compatibility).
4. **If change-id already exists** → ASK whether to continue or create a new one.
5. **STOP after creating artifacts.** Wait for human review before implementation.
6. **If `openspec list` fails** → STOP. The openspec directory is not accessible. Remind the user: "Run `openspec init --tools none docs` first, then create a junction: `mklink /J openspec docs\\openspec` (Windows) or symlink: `ln -s docs/openspec openspec` (Unix)."

## 📋 EXECUTION CHECKLIST

- [ ] 1. If `$ARGUMENTS` is empty → ASK "What change do you want to propose?"
- [ ] 2. Run `openspec list` — if it fails → STOP (see RED LINE #6). This validates the junction/symlink and init were done.
- [ ] 3. Read context: `openspec/project.md`, `openspec/AGENTS.md` (if exists)
- [ ] 4. Run `openspec list --specs`
- [ ] 5. Determine change-id in kebab-case (verb-noun, e.g., `add-user-auth`)
- [ ] 6. Create directory: `openspec/changes/<change-id>/`
- [ ] 7. Generate artifacts using EXACTLY the formats below
- [ ] 8. Run `openspec validate <change-id> --strict`
- [ ] 9. If validation fails → FIX first, then re-validate
- [ ] 10. Report and STOP for human review

## 📐 FORMAT REQUIREMENTS — DEVIATION = VALIDATION FAILURE

### proposal.md MUST use these headers (English only):

```markdown
## Why
<!-- 1-2 sentences. Minimum 50 characters. -->

## What Changes
<!-- Bullet list of specific changes. Mark breaking changes with **BREAKING**. -->

## Capabilities
### New Capabilities
- `<name>`: <brief description>  <!-- kebab-case -->

### Modified Capabilities
- `<existing-name>`: <what requirement is changing>

## Impact
<!-- Affected code, APIs, dependencies, systems -->
```

### spec delta (specs/<capability>/spec.md) MUST use this format:

```markdown
## ADDED Requirements

### Requirement: <name>
<description MUST contain SHALL or MUST>

#### Scenario: <name>
- **WHEN** <condition>
- **THEN** <expected outcome>

#### Scenario: <name>
- **WHEN** <condition>
- **THEN** <expected outcome>
```

**Critical validation rules:**
- Section headers: `## ADDED Requirements` / `## MODIFIED Requirements` / `## REMOVED Requirements` / `## RENAMED Requirements`
- Requirement header: `### Requirement: <name>` — the word "Requirement:" is mandatory
- Requirement text MUST contain `SHALL` or `MUST`
- Scenario header: `#### Scenario: <name>` — exactly 4 hashtags
- Scenario body: `- **WHEN**` / `- **THEN**` / `- **AND**`
- Every ADDED/MODIFIED requirement MUST have at least one scenario

### tasks.md format:

```markdown
## 1. <Task Group Name>
- [ ] 1.1 <Task description>
- [ ] 1.2 <Task description>

## 2. <Task Group Name>
- [ ] 2.1 <Task description>
```

## 📤 OUTPUT TEMPLATE

```markdown
# Proposal Created

- Change ID: `<change-id>`
- Directory: `openspec/changes/<change-id>/`

## Artifacts
- [x] proposal.md
- [x] design.md (or reason why not needed)
- [x] tasks.md
- [x] specs/<capability>/spec.md

## Validation
`openspec validate <change-id> --strict` → PASS / FAIL

## Open Questions
| Q# | Question | Impact | Blocking |
|----|----------|--------|----------|
| Q1 | ... | ... | 🔴/🟡 |

## Next Command
Human review required. After approval:
→ **`/team-plan <change-id>`**
```

## IF-THIS-THEN-THAT

| User says... | You MUST respond... |
|---|---|
| "Just skip validation" | "I cannot. Validation ensures the artifacts are well-formed. Let me fix any issues and re-run." |
| "Don't need design.md" | "OK, I'll note that design.md is not needed for this change." |
| Skill not loaded | Invoke `team-openspec-guard` skill via Skill tool before any action. |
| `openspec list` fails | "OpenSpec is not accessible from the project root. Run `openspec init --tools none docs` first, then create the junction/symlink: `mklink /J openspec docs\\openspec` (Windows) or `ln -s docs/openspec openspec` (Unix)." |
| "Add feature X too" (scope creep) | "That is out of scope. Let's finish this proposal first. You can create a separate change for X." |
