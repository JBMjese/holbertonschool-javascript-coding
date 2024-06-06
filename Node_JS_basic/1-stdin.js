// It should show a login message
// the user must be able to enter their name and then see it on the screen

function StdinName() {
  process.stdin.setEncoding('utf8');
  process.stdout.write('Welcome to Holberton School, what is your name?\n');

  process.stdin.once('readable', () => {
    const userInput = process.stdin.read();
    if (userInput !== null && userInput !== '\n') {
      process.stdout.write(`Your name is: ${userInput}`);
    }
    process.stdin.emit('end');
  });

  process.stdin.once('end', () => {
    process.stdout.write('This important software is now closing\n');
  });
}
StdinName();
