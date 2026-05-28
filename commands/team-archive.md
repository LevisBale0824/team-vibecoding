---
description: Archive a completed change after verification passes.
---

# /team-archive

## ⛔ RED LINES

1. **DO NOT archive if tasks are incomplete** without explicit user confirmation.
2. **DO NOT archive if `openspec validate <change-id> --strict` fails.**
3. **DO NOT manually move directories.** Use `openspec archive` command only.
4. **DO NOT hide incomplete tasks.** Report them transparently and ask for confirmation.

## 📋 EXECUTION CHECKLIST

- [ ] 1. If `$ARGUMENTS` is empty → run `openspec list` and ASK
- [ ] 2. Run `openspec list` to confirm change exists and is active
- [ ] 3. Read `tasks.md` — count incomplete tasks
- [ ] 4. If incomplete tasks exist → WARN and ASK for confirmation
- [ ] 5. Run `openspec validate <change-id> --strict`
- [ ] 6. If validation fails → STOP. Fix before archiving.
- [ ] 7. Run `openspec archive <change-id> --yes`
- [ ] 8. Run `openspec validate --strict` (global validation)
- [ ] 9. Output archive report
- [ ] 10. Check if worktree exists:
  - Run: `git worktree list | grep <change-id>`
  - If not exists → skip to step 14
- [ ] 11. Check for uncommitted changes in worktree:
  - Run: `cd .worktrees/<change-id> && git status --porcelain`
  - If has changes → STOP. 提示: "Worktree 中有未提交的更改。请先提交或 stash 更改，然后再运行 /team-archive。"
- [ ] 12. ASK user: "Worktree .worktrees/<change-id>/ 仍然存在。要删除吗？"
  - Yes → continue to step 13
  - No → skip to step 14
- [ ] 13. Delete worktree:
  - Run: `git worktree remove .worktrees/<change-id>`
  - Verify: `git worktree list | grep <change-id>` should return nothing
- [ ] 14. Output final report

## 📤 OUTPUT TEMPLATE

```markdown
# Archive Complete

- Change: `<change-id>`
- Archive path: `openspec/changes/archive/<change-id>/`
- Specs updated: Yes / No
- Global validation: ✅ PASS / ❌ FAIL

## Archived Artifacts
- proposal.md → archived
- design.md → archived
- tasks.md → archived
- specs/<capability>/spec.md → merged to openspec/specs/<capability>/spec.md

## Warnings
- [any issues encountered]

## Maintenance References
- Long-term spec: `openspec/specs/<capability>/spec.md`
- Change history: `openspec/changes/archive/<change-id>/`

## Worktree Cleanup
- Worktree exists: Yes / No
- Uncommitted changes: Yes / No
- Cleanup: Deleted / Kept / N/A

## Next Command
Optional → **`/team-retro <change-id>`** (review the collaboration)
```

## PRE-ARCHIVE TASK CHECK

If incomplete tasks exist, you MUST show:

```markdown
⚠️ WARNING: X tasks remain incomplete:
- [ ] Task N.M: <description>

Do you still want to archive? (yes/no)
```

## IF-THIS-THEN-THAT

| User says... | You MUST respond... |
|---|---|
| "Archive it, I'll finish later" | "⚠️ X tasks are incomplete. Are you sure? This will be recorded in the archive." |
| "Move the files manually" | "I must use `openspec archive` to ensure specs are properly synced. Let me run the command." |
| "Ignore the validation error" | "I cannot archive with validation errors. Let me check what's wrong first." |
| Archive fails | Show the error output. Suggest: "Check if the change is still active. Run `openspec list` to verify." |
| "Keep the worktree" | "OK, worktree .worktrees/<change-id>/ 将保留。你可以稍后手动删除：git worktree remove .worktrees/<change-id>" |
| "Worktree has uncommitted changes" | "Worktree 中有未提交的更改。请先提交或 stash 更改，然后再运行 /team-archive。" |
