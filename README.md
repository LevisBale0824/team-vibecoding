# Team Speccoding

OpenCode Team AI collaboration superpowers — commands, skills, and rules for structured development workflow with OpenSpec.

## What's Inside

- **commands/** — Team workflow commands (explore → propose → plan → apply → verify → review → archive → retro)
- **skills/** — Guard skills that enforce quality gates at every stage
- **rules/** — Team AI delivery rules (`.mdc` format)

## Quick Start

```bash
# Default: install to project/.opencode/
npx team-speccoding /path/to/my-project

# Custom target directory
npx team-speccoding /path/to/my-project --target .zero

# Global install (anywhere on disk)
npx team-speccoding --commands ~/.zerorules/workflows --skills ~/.zeroagent/skills --rules ~/.zerorules

# Preview before installing
npx team-speccoding /path/to/my-project --dry-run

# Overwrite existing files
npx team-speccoding /path/to/my-project --force
```

## Usage

```
npx team-speccoding [<project>] [options]

Options:
  -t, --target <name>    Base directory under <project> (default: ".opencode")
  -c, --commands <path>  Target path for commands
  -s, --skills <path>    Target path for skills
  -r, --rules <path>     Target path for rules
      --dry-run           Preview without writing files
  -f, --force             Overwrite existing files
  -h, --help              Show help
  -v, --version           Show version
```

### Path resolution

| `--commands` value | Resolves to |
|---|---|
| *(not set)* | `<project>/<target>/commands/` |
| `workflows` (relative) | `<project>/<target>/workflows/` |
| `~/.zerorules/wf` (absolute) | `/home/user/.zerorules/wf/` |

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
- Node.js >= 16

## License

MIT
