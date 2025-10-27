import { EntrypointInterface } from "./interface";

export class TelegramEntrypoint implements EntrypointInterface {
  run(): Promise<void> | void {
    console.log('telegram start');
  }
}