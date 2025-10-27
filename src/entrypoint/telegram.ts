import { ChatProcessor } from "../ai/processor";
import { EntrypointInterface } from "./interface";

export class TelegramEntrypoint implements EntrypointInterface {
  constructor(private readonly processor: ChatProcessor) {}
  run(): Promise<void> | void {
    console.log('telegram start');
  }
}