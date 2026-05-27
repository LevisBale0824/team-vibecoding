#!/usr/bin/env node
'use strict';

const path = require('path');
const { install } = require('../lib/install');

// ── Argument Parsing ────────────────────────────────────────────────

const args = process.argv.slice(2);

const HELP = `
team-vibecoding — Install Team AI collaboration superpowers into your project.

USAGE
  npx team-vibecoding [<project>] [options]

ARGUMENTS
  <project>              Target project root directory.

OPTIONS
  -t, --target <name>    Base directory name under <project> (default: ".opencode")
  -c, --commands <path>  Target path for commands (overrides <target>/commands)
  -s, --skills <path>    Target path for skills   (overrides <target>/skills)
  -r, --rules <path>     Target path for rules    (overrides <target>/rules)
      --dry-run           Preview without writing any files
  -f, --force             Overwrite existing files
  -h, --help              Show this help message
  -v, --version           Show version number

EXAMPLES
  # Default: install to project/.opencode/
  npx team-vibecoding ~/my-project

  # Custom target directory
  npx team-vibecoding ~/my-project --target .zero

  # Custom subdirectory names (relative to target)
  npx team-vibecoding ~/my-project --target .zero --commands-dir workflows

  # Global install (absolute paths, no project root needed)
  npx team-vibecoding --commands ~/.zerorules/workflows --skills ~/.zeroagent/skills

  # Preview before installing
  npx team-vibecoding ~/my-project --dry-run
`.trim();

function parseArgs(argv) {
  const opts = {
    project: null,
    target: '.opencode',
    commands: null,
    skills: null,
    rules: null,
    dryRun: false,
    force: false,
    help: false,
    version: false,
  };

  let i = 0;
  const positional = [];

  while (i < argv.length) {
    const arg = argv[i];

    const flagMap = {
      '-t':              ['target',       true],
      '--target':        ['target',       true],
      '-c':              ['commands',     true],
      '--commands':      ['commands',     true],
      '-s':              ['skills',       true],
      '--skills':        ['skills',       true],
      '-r':              ['rules',        true],
      '--rules':         ['rules',        true],
      '--dry-run':       ['dryRun',       false],
      '-f':              ['force',        false],
      '--force':         ['force',        false],
      '-h':              ['help',         false],
      '--help':          ['help',         false],
      '-v':              ['version',      false],
      '--version':       ['version',      false],
    };

    const mapped = flagMap[arg];
    if (mapped) {
      const [key, needsValue] = mapped;
      if (needsValue) {
        i++;
        if (i >= argv.length) {
          console.error(`Error: ${arg} requires a value`);
          process.exit(1);
        }
        opts[key] = argv[i];
      } else {
        opts[key] = true;
      }
    } else if (arg.startsWith('-')) {
      console.error(`Error: unknown option ${arg}`);
      process.exit(1);
    } else {
      positional.push(arg);
    }
    i++;
  }

  opts.project = positional[0] || null;

  return opts;
}

// ── Main ─────────────────────────────────────────────────────────────

const opts = parseArgs(args);

if (opts.help) {
  console.log(HELP);
  process.exit(0);
}

if (opts.version) {
  const pkg = require('../package.json');
  console.log(pkg.version);
  process.exit(0);
}

const packageDir = path.resolve(__dirname, '..');

install(packageDir, opts)
  .then((report) => {
    let created = 0, overwritten = 0, skipped = 0;

    for (const entry of report) {
      if (entry.action === 'dir') {
        console.log(`\n${opts.dryRun ? '[DRY-RUN] ' : ''}${entry.src}  →  ${entry.dest}`);
      } else if (entry.action === 'create') {
        created++;
        console.log(`  ${opts.dryRun ? '[DRY-RUN] ' : ''}+ ${entry.file}`);
      } else if (entry.action === 'overwrite') {
        overwritten++;
        console.log(`  ${opts.dryRun ? '[DRY-RUN] ' : ''}~ ${entry.file}`);
      } else if (entry.action === 'skip') {
        skipped++;
        console.log(`  - ${entry.file} (${entry.reason})`);
      }
    }

    const dry = opts.dryRun ? ' (dry-run)' : '';
    console.log(`\nDone${dry}: ${created} created, ${overwritten} overwritten, ${skipped} skipped.`);
  })
  .catch((err) => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  });
