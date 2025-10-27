import { EntrypointInterface } from "./interface";

export class CLientrypoint implements EntrypointInterface {
  run(): Promise<void> | void {
    console.log('cli start');
  }
}