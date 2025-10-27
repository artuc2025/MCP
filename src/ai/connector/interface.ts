export interface ToolDescriptor {  
  name: string;  
  description: string;  
  inputSchema: Record<string, unknown>;  
}  
  
export type SingleToolRequest = { id?: string; name: string; arguments: Record<string, unknown> };  
  
export interface ToolCallRequest {  
  message: string;  
  toolCalls?: SingleToolRequest[];  
}  
  
export interface ToolCallResult {  
  request: SingleToolRequest  
  content: string;  
  structuredContent: any;  
}  
  
export interface AIHelperInterface {  
  // process a request with possible tool processing
  chatWithTools(sessionId: string, message: string, tools: ToolDescriptor[]): Promise<ToolCallRequest>;  
  
  // store the result of the tool call to pass it in the history
  storeToolResult(sessionId: string, result: ToolCallResult): Promise<void>;  
  
  // send a simple text message to the AI. You can use a simpler model, since you just need to answer nicely
  simpleChat(sessionId: string, message: string): Promise<string>;  
  
  // reset session for telegram by chat id
  resetSession(sessionId: string): Promise<void>;  
}