import { ChatProcessor } from "../ai/processor";
import { CLientrypoint } from "./cli";
import { EntrypointInterface } from "./interface";
import { TelegramEntrypoint } from "./telegram";

  export function selectEntrypoint(): Promise<EntrypointInterface> {
    const args = process.argv.slice(2);
    const processor = new ChatProcessor();
    const wantsCli = args.includes('--cli') || (process.env.npm_config_cli && process.env.npm_config_cli !== 'false');
    const wantsTelegram = args.includes('--telegram') || (process.env.npm_config_telegram && process.env.npm_config_telegram !== 'false');
    if (wantsCli) {
      return Promise.resolve(new CLientrypoint(processor));
    } else if (wantsTelegram) {
      return Promise.resolve(new TelegramEntrypoint(processor));
    }
    throw new Error('Invalid entrypoint');
  }