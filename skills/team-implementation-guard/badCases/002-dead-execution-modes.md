# Bad Case 002: Execution Modes Never Triggered

- **Date**: 2026-05-31
- **Change**: N/A (design review)
- **Phase**: apply

## Trigger

User asked "什么时候能使用 Subagent 或者 Parallel?" during a review of the skill design.

## Wrong Behavior

Skill defined three Execution Modes (Inline, Subagent, Parallel) but provided no decision criteria. AI always defaulted to Inline mode. Subagent and Parallel modes were dead code — defined but never triggered.

## Expected Behavior

Skill should specify when to use each mode based on observable conditions (task count, dependency graph, complexity). AI should automatically select the appropriate mode at the start of `/team-apply`.

## Root Cause

Execution Modes section listed capabilities but omitted the decision matrix — who decides, when, and based on what criteria. Without triggers, AI always takes the default path.

## Rule Changes

**Affected Skill**: team-implementation-guard

1. Add mode selection decision matrix with clear conditions
2. Add auto-detection logic based on tasks.md analysis
