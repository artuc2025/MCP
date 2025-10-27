import fs from 'fs/promises';  
import path from 'path';  
import { randomUUID } from 'crypto';  
  
type EmailEntry = {  
  id: string;  
  text: string;  
  timestamp: string;  
};  
  
export class EmailService {  
  private filePath: string;  
  
  constructor() {  
    this.filePath = path.resolve(process.cwd(), 'dist/data/emails.json');  
  }  
  
  private async ensureDataDir(): Promise<void> {
    const dir = path.dirname(this.filePath);
    await fs.mkdir(dir, { recursive: true });
  }
  
  private async loadEmails(): Promise<EmailEntry[]> {  
    await this.ensureDataDir();
    try {  
      const data = await fs.readFile(this.filePath, 'utf-8');  
      return JSON.parse(data) as EmailEntry[];  
    } catch {  
      return [];  
    }  
  }  
  
  private async saveEmails(emails: EmailEntry[]): Promise<void> {  
    await this.ensureDataDir();
    await fs.writeFile(this.filePath, JSON.stringify(emails, null, 2), 'utf-8');  
  }  
  
  async saveEmail(text: string): Promise<void> {  
    const emails = await this.loadEmails();  
    const newEntry: EmailEntry = {  
      id: randomUUID(),  
      text,  
      timestamp: new Date().toISOString()  
    };  
    emails.push(newEntry);  
    await this.saveEmails(emails);  
  }  
}