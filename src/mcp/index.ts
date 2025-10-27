import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import z from 'zod';
import { EmailService } from '../services/EmailService';
import { UserService } from '../services/UserService';

const server = new McpServer({
  name: 'My MCP Server',
  version: '1.0.0',
  description: 'My MCP Server',
});

const emailService = new EmailService();
const userService = new UserService();

server.registerTool('send_message', {
  title: 'Send a message',
  description: 'Send a message to a user',
  inputSchema: {
    text: z.string(),
  }
}, async(req) => {
  await emailService.saveEmail(req.text);
  return {
    content: [{
      type: 'text',
      text: `Message sent: ${req.text}`,
    }],
  }
});

server.registerTool(  
  'create_user',  
  {  
    title: 'Создание пользователя',  
    description: 'Создает пользователя. Имя и год рождения обязательные поля. Если пользователь их не передал, то их нужно запросить отдельно. Самому ИИ придумывать нельзя',  
    inputSchema: {  
      name: z.string(),  
      birthYear: z.number(),  
    },  
  },  
  async (req) => {  
    await userService.addUser({
      name: req.name,  
      birthYear: req.birthYear  
    });  
  
    return {  
      content: [  
        {  
          type: 'text',  
          text: `Пользователь ${req.name} успешно создан.`,  
        },  
      ],  
    };  
  }  
);  
  
// 📌 Инструмент: users-list
server.registerTool(  
  'users_list',  
  {  
    title: 'Получение списка пользователей',  
    description: 'Возвращает список пользователей со всеми полями',  
    outputSchema: {  
      elements: z.array(  
        z.object({
          id: z.string(),
          name: z.string(),  
          birthYear: z.number(),  
        })  
      ),  
    },  
  },  
  async () => {  
    let elements = await userService.getUsers();  
    return {  
      structuredContent: {  
        elements: elements,  
      },  
      content: [  
        {  
          type: 'text',  
          text: elements.map((u) => `${u.name} (${u.birthYear})`).join(', ') || 'Нет пользователей',  
        },  
      ],  
    };  
  }  
);  
  
server.registerTool(  
  'user_count',  
  {  
    title: 'Получить количество пользователей старше переданного возраста',  
    description: 'Возвращает количество пользователей. Если этот инструмент вызывается,' +  
      ' то он должен вернуть количество пользователей в системе и это число точно нужно передать пользователю.' +  
      'Если возраст не был передан, то подставить 0',  
    inputSchema: {  
      age: z.number().optional().default(0),  
    },  
  },  
  async (req) => {  
    const users = await userService.countUsersOlderThan(req.age);  
    return {  
      content: [{type: 'text', text: String(users)}],  
    };  
  }  
);  

const transport = new StdioServerTransport();
server.connect(transport);