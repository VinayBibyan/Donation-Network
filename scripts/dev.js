
import concurrently from 'concurrently';

// Start both frontend and backend concurrently
const { result } = concurrently([
  { 
    command: 'npx vite', 
    name: 'frontend', 
    prefixColor: 'blue'
  },
  { 
    command: 'node server.js', 
    name: 'backend', 
    prefixColor: 'green'
  }
], {
  prefix: 'name',
  killOthers: ['failure', 'success'],
  restartTries: 3,
  restartDelay: 1000,
});

// Handle completion and errors
result
  .then(() => console.log('All processes exited with code 0'))
  .catch((error) => console.error('Error occurred:', error));
