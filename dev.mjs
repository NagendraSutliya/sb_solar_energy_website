import { spawn, execSync } from 'child_process';
import process from 'process';

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

console.log('\x1b[36m%s\x1b[0m', '⚡ Starting SB Solar Energy Backend & Frontend concurrently...\n');

// Start Node.js Express Backend
const backend = spawn(npmCmd, ['run', 'dev'], {
  cwd: './backend',
  stdio: 'inherit',
  shell: true,
});

// Start React + Vite Frontend
const frontend = spawn(npmCmd, ['run', 'dev'], {
  cwd: './frontend',
  stdio: 'inherit',
  shell: true,
});

let isCleaningUp = false;
function cleanup() {
  if (isCleaningUp) return;
  isCleaningUp = true;
  console.log('\n\x1b[33m%s\x1b[0m', '🛑 Stopping SB Solar Energy Backend & Frontend...');

  const killProc = (proc) => {
    if (!proc || !proc.pid) return;
    try {
      if (isWindows) {
        execSync(`taskkill /pid ${proc.pid} /T /F`, { stdio: 'ignore' });
      } else {
        process.kill(-proc.pid, 'SIGTERM');
      }
    } catch {
      try {
        proc.kill('SIGTERM');
      } catch {}
    }
  };

  killProc(backend);
  killProc(frontend);
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);
