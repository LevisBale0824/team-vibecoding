---
name: team-explore-guard
description: Use when exploring requirements, clarifying questions, understanding current state, comparing approaches, or doing research before proposing.
---

# Team Explore Guard

## Core Principle

Exploration phase does NOT create changes. Analysis and recommendations only.

## When to Use

Use this skill when:
- Requirements are vague and need clarification
- Need to understand existing system implementation
- Need to compare multiple approaches
- Pre-research before `/team-propose`

Do NOT use this skill when:
- Creating proposals or OpenSpec artifacts (use `team-openspec-guard`)
- Implementing code (use `team-implementation-guard`)
- The problem is already crystal clear and a change-id is decided — go directly to `/team-propose`

## Process

1. **Clarify the problem**
   - Ask: What problem are we solving?
   - Ask: Who benefits?
   - Ask: How will we know it's successful?

2. **Investigate current state**
   - Search relevant code and docs
   - Understand how the system currently handles similar needs
   - Identify existing infrastructure that can be reused

3. **Explore options**
   - List 2-3 candidate approaches
   - Trade-off analysis (pros vs cons)
   - Recommend the preferred approach

4. **Output exploration summary**
   - Use the template from `/team-explore` command

## Risk Signals

- Problem too broad → narrow scope before starting
- Too many options (> 3) → merge similar approaches
- User wants to skip exploration and code directly → guide to clarify requirements first

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Starting implementation during exploration | Analysis only, no code |
| Not following up on vague requirements | Ask specific clarifying questions |
| Options without trade-off analysis | List pros and cons for each option |
| Exploration summary too generic | Give specific code locations and technical details |

## Bad Case Recording

When this skill fails, record:
- Input: what the user asked to explore
- Wrong output: what the AI did that it shouldn't have
- Expected output: what it should have done
- New rule needed: how to prevent recurrence
