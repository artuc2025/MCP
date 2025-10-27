import { ChatProcessor } from "../ai/processor";
import { EntrypointInterface } from "./interface";
import { createInterface } from "node:readline/promises";

export class CLientrypoint implements EntrypointInterface {
  constructor(private readonly processor: ChatProcessor) {
  }

  async run() {  
    const SESSION_ID = 'cli-session';  
    console.log("CLI mode started");  
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    while (true) {  
      const query = await rl.question('\n Your question?');  
      if (query.trim().toLowerCase() === 'exit') {  
        console.log('Bye!');  
        rl.close();  
        process.exit(0);  
      }  
      const start = Date.now();  
      console.log('thinking...');  
    
      const response = await this.processor.processMessage(SESSION_ID, query);  
      const end = Date.now();  
      const durationSec = ((end - start) / 1000).toFixed(2);  
    
      console.log(`\n AI (${durationSec}s):\n${response.message}`);  
      if (response.tools.length > 0) {  
        console.log(`Tools:`);  
        response.tools.forEach((tool, i) => {  
          console.log(`  ${i + 1}. ${tool.name} ${JSON.stringify(tool.arguments)}`);  
        });  
      }  
    }  
  }
}