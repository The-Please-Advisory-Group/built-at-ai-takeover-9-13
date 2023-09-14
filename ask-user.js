
import * as readline from 'readline'

export async function askUser(executor) {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
   });
   
   rl.question("You: ", async userInput => {
    if (userInput == "exit") {
     return;
    } else {
      const response = await executor.call({ input: userInput });
      console.log("Bot: " + response.output);
      rl.close();
      askUser(executor);
    }
   });
}