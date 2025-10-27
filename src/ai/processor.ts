type ToolResult = {
  name: string,
  arguments: Record<string, unknown>[];
}

type ProcessResult = {
  message: string;
  tools: ToolResult[];
}

export class ChatProcessor {
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