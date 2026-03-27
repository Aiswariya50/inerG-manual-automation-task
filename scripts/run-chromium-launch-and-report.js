const { spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

function getPlaywrightCliJs() {
  const cli = path.join(process.cwd(), 'node_modules', '@playwright', 'test', 'cli.js');
  return fs.existsSync(cli) ? cli : null;
}

function run(cmd, args) {
  return new Promise((resolve) => {
    const p = spawn(cmd, args, { stdio: 'inherit', shell: false });
    p.on('exit', (code) => resolve(code ?? 1));
  });
}

function newestSubdir(parentDir) {
  if (!fs.existsSync(parentDir)) return null;
  const entries = fs
    .readdirSync(parentDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const full = path.join(parentDir, d.name);
      const stat = fs.statSync(full);
      return { full, mtimeMs: stat.mtimeMs };
    })
    .sort((a, b) => b.mtimeMs - a.mtimeMs);
  return entries[0]?.full ?? null;
}

(async () => {
  const cli = getPlaywrightCliJs();
  if (!cli) {
    console.error('Could not find Playwright test CLI at node_modules/@playwright/test/cli.js.');
    process.exit(1);
  }

  const testCode = await run(process.execPath, [
    cli,
    'test',
    'tests/covidtest.spec.js',
    '--project=chromium',
    '--headed',
    '--workers=1',
  ]);
  if (testCode !== 0) process.exit(testCode);

  const reportDir = newestSubdir(path.join(process.cwd(), 'playwright-report')) ?? 'playwright-report';
  const reportCode = await run(process.execPath, [cli, 'show-report', '--port', '0', reportDir]);
  process.exit(reportCode);
})();

