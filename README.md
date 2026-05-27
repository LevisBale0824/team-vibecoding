# Team Vibecoding

OpenCode Superpowers for structured team AI collaboration with OpenSpec.

## What's Inside

- **commands/** — Team workflow commands (explore → propose → plan → apply → verify → review → archive → retro)
- **skills/** — Guard skills that enforce quality gates at every stage
- **rules/** — Team AI delivery rules (`.mdc` format)

## Quick Start

Install into your project's `.opencode` directory:

```bash
cp -r commands rules skills /path/to/your-project/.opencode/
```

Or use the install script (coming soon).

## Workflow

```
/team-explore   → Understand the problem
/team-propose   → Create OpenSpec change proposal
/team-plan      → Review task breakdown
/team-apply     → Implement tasks incrementally
/team-verify    → Verify completion with evidence
/team-review    → Pre-merge code review
/team-archive   → Archive completed change
/team-retro     → Retrospect and improve skills
```

## Requirements

- [OpenSpec](https://github.com/Fission-AI/OpenSpec) initialized in the target project
- [OpenCode](https://github.com/anthropics/opencode) CLI

## License

MIT
