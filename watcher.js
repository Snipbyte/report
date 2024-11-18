const chokidar = require('chokidar');
const { exec } = require('child_process');

// Directory to watch
const watchDirectory = './public/blogthumbnails';

// Initialize the watcher
const watcher = chokidar.watch(watchDirectory, {
  persistent: true,
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100,
  },
  depth: 0,
  ignorePermissionErrors: true,
});

// Function to restart the PM2 process
const restartPM2 = () => {
  console.log('New image detected. Restarting PM2 process...');
  exec('pm2 restart report', (error, stdout, stderr) => { // Replace 'report' with your PM2 process name
    if (error) {
      console.error(`Error restarting PM2 process: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`PM2 restart stderr: ${stderr}`);
      return;
    }
    console.log(`PM2 restarted successfully: ${stdout}`);
  });
};

 // Watch for file additions in the directory
watcher.on('add', (path) => {
  console.log(`File added: ${path}`);
  restartPM2();
});

console.log(`Watching for changes in: ${watchDirectory}`);
