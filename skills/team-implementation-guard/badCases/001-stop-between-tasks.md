# Bad Case 001: AI Paused Between Tasks Asking for Confirmation

- **Date**: 2026-05-31
- **Change**: chunked-upload
- **Phase**: apply

## Trigger

User invoked `/team-apply`. AI completed Task 1.1 and ended with "开始 Task 1.2?"

## Wrong Behavior

After each task, AI reported progress then asked "开始 Task X.Y?" instead of immediately moving to the next task. User had to re-invoke `/team-apply` or manually confirm.

## Expected Behavior

After completing and reporting a task, AI should immediately read the next unchecked task in tasks.md and start working on it without asking. `/team-apply` is an autonomous implementation command — the user has already granted authority to proceed through all tasks.

## Root Cause

Task Loop rule said "ONE TASK AT A TIME" and "Report progress after each task" but never explicitly stated that the loop should continue autonomously. AI interpreted "report" as "report and stop" instead of "report and continue to next task."

## Rule Changes

**Affected Skill**: team-implementation-guard

1. Task Loop preamble: "The task loop is **autonomous** — after completing one task, immediately proceed to the next"
2. Task Loop step 8: "Immediately continue to the next unchecked task in tasks.md — do NOT ask the user for permission"
3. Common Mistakes table: "Pause between tasks to ask 继续?" → "Task loop is autonomous — just report and continue to next task"
