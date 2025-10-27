export class SessionStorage<T> {  
  private sessions: Record<string, T> = {};  
  
  constructor(private readonly initSession: () => T) {}  
  
  get(sessionId: string): T {  
    if (!this.sessions[sessionId]) {  
      this.sessions[sessionId] = this.initSession();  
    }  
    return this.sessions[sessionId];  
  }  
  
  set(sessionId: string, value: T): void {  
    this.sessions[sessionId] = value;  
  }  
  
  reset(sessionId: string): void {  
    delete this.sessions[sessionId];  
  }  
  
  has(sessionId: string): boolean {  
    return sessionId in this.sessions;  
  }  
}