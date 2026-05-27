const fs = require('fs/promises');
const fss = require('fs');
const path = require('path');
const os = require('os');

const SOURCE_DIRS = ['commands', 'skills', 'rules'];

/**
 * Expand ~ to the user's home directory.
 */
function expandTilde(p) {
  if (typeof p !== 'string') return p;
  if (p === '~' || p.startsWith('~/')) {
    return path.join(os.homedir(), p.slice(1));
  }
  return p;
}

/**
 * Check whether a path is absolute (cross-platform).
 */
function isAbsolute(p) {
  return path.isAbsolute(p) || (typeof p === 'string' && p.startsWith('~'));
}

/**
 * Resolve the target path for a given source directory name.
 *
 *   - If `customPath` is set and absolute → use it directly.
 *   - If `customPath` is set and relative → resolve under `<project>/<target>/`.
 *   - Otherwise → default to `<project>/<target>/<dirName>/`.
 */
function resolveTarget(projectRoot, target, dirName, customPath) {
  if (customPath !== undefined && customPath !== null) {
    const expanded = expandTilde(customPath);
    if (isAbsolute(customPath)) {
      return expanded;
    }
    return path.join(projectRoot, target, expanded);
  }
  return path.join(projectRoot, target, dirName);
}

/**
 * Recursively copy a directory.
 *
 * @param {string}  src       - source directory
 * @param {string}  dest      - destination directory
 * @param {object}  opts      - { dryRun: boolean, force: boolean }
 * @param {array}   report    - accumulator for reporting
 */
async function copyDir(src, dest, opts, report) {
  await fs.mkdir(dest, { recursive: true });

  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath, opts, report);
    } else {
      const exists = fss.existsSync(destPath);
      if (exists && !opts.force) {
        report.push({ action: 'skip', file: destPath, reason: 'already exists' });
        continue;
      }
      if (opts.dryRun) {
        report.push({ action: exists ? 'overwrite' : 'create', file: destPath });
      } else {
        await fs.copyFile(srcPath, destPath);
        report.push({ action: exists ? 'overwrite' : 'create', file: destPath });
      }
    }
  }
}

/**
 * Install commands, skills, and rules to the target project.
 *
 * @param {string}  packageDir - directory of this package (contains commands/, skills/, rules/)
 * @param {object}  opts       - parsed CLI options
 * @returns {array}  report
 */
async function install(packageDir, opts) {
  const report = [];
  const projectRoot = opts.project ? expandTilde(opts.project) : null;
  const target = opts.target || '.opencode';

  if (!projectRoot && !opts.commands && !opts.skills && !opts.rules) {
    throw new Error(
      'Either <project> or at least one of --commands/--skills/--rules is required.\n' +
      'Run with --help for usage.'
    );
  }

  for (const dirName of SOURCE_DIRS) {
    const src = path.join(packageDir, dirName);
    const srcExists = fss.existsSync(src);
    if (!srcExists) continue;

    const customKey = dirName; // 'commands', 'skills', 'rules' matches CLI option names
    const customPath = opts[customKey];

    let dest;
    if (customPath !== undefined && customPath !== null && isAbsolute(customPath)) {
      // Global mode: --commands /abs/path — use directly, no project needed
      dest = expandTilde(customPath);
    } else if (projectRoot) {
      dest = resolveTarget(projectRoot, target, dirName, customPath);
    } else {
      // No project and no absolute custom path → skip this dir
      continue;
    }

    report.push({ action: 'dir', src, dest });
    await copyDir(src, dest, opts, report);
  }

  return report;
}

module.exports = { install, expandTilde, resolveTarget, SOURCE_DIRS };
