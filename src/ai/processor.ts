import { AIHelperInterface } from "./connector/interface";
import { OpenAIHelper } from "./connector/openai";

type ToolResult = {
  name: string,
  arguments: Record<string, unknown>[];
}

type ProcessResult = {
  message: string;
  tools: ToolResult[];
}

export class ChatProcessor {
  ai: AIHelperInterface;
  constructor() {
    this.ai = new OpenAIHelper(process.env.OPENAI_API_KEY || '', {
      tools: process.env.OPENAI_TOOLS_MODEL || '',
      talk: process.env.OPENAI_TALK_MODEL || '',
    }, process.env.OPENAI_SYSTEM_PROMPT || '');
  }
  public async processMessage(sessionId: string, message: string): Promise<ProcessResult> {
    return {
      message: message,
      tools: [{
        name: 'get_weather',
        arguments: [{
          city: 'London',
        }],
      }, {
        name: 'get_news',
        arguments: [{
          topic: 'technology',
        }],
      }],
    }
  }
}