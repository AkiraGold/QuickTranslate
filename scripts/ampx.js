#!/usr/bin/env node
/**
 * Run `ampx` for Gen 2 backend (sandbox / pipeline-deploy).
 * Hides bun.lock so CDK uses package-lock.json, and spoofs an npm user-agent
 * if this was started via `bun run`.
 */
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const packageJsonPath = path.join(root, 'package.json');
const bunLockPath = path.join(root, 'bun.lock');
const bunLockAside = path.join(root, 'bun.lock.ampx-aside');
const packageJsonAside = path.join(root, 'package.json.ampx-aside');

const originalPackageJson = fs.readFileSync(packageJsonPath, 'utf8');
const pkg = JSON.parse(originalPackageJson);
const hadPackageManager = Object.prototype.hasOwnProperty.call(pkg, 'packageManager');
const hadBunLock = fs.existsSync(bunLockPath);

function restore() {
  if (hadPackageManager && fs.existsSync(packageJsonAside)) {
    fs.renameSync(packageJsonAside, packageJsonPath);
  } else if (hadPackageManager) {
    fs.writeFileSync(packageJsonPath, originalPackageJson);
  }
  if (hadBunLock && fs.existsSync(bunLockAside)) {
    fs.renameSync(bunLockAside, bunLockPath);
  }
}

process.on('exit', restore);
process.on('SIGINT', () => {
  restore();
  process.exit(130);
});
process.on('SIGTERM', () => {
  restore();
  process.exit(143);
});

if (hadPackageManager) {
  fs.writeFileSync(packageJsonAside, originalPackageJson);
  delete pkg.packageManager;
  fs.writeFileSync(packageJsonPath, `${JSON.stringify(pkg, null, 2)}\n`);
}

if (hadBunLock) {
  fs.renameSync(bunLockPath, bunLockAside);
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node scripts/ampx.js <ampx-args...>');
  process.exit(1);
}

const result = spawnSync('npx', ['ampx', ...args], {
  cwd: root,
  stdio: 'inherit',
  env: {
    ...process.env,
    npm_config_user_agent: 'npm/10.9.0 node/v22.0.0 darwin arm64',
  },
  shell: false,
});

restore();
process.exit(result.status ?? 1);
