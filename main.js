const { exec } = require('child_process');

// Fungsi untuk menjalankan perintah build
const runBuild = () => {
  console.log('Building the project...');
  exec('npm run build', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing build: ${error.message}`);
      console.error(`Build stderr: ${stderr}`);
      return;
    }
    if (stderr) {
      console.error(`Build stderr: ${stderr}`);
    }
    console.log(`Build stdout: ${stdout}`);
  });
};

// Jalankan build pertama kali saat script berjalan
runBuild();
