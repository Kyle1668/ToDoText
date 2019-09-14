import TwilioLibraryClient from 'twilio';
import TodoistTask from './TodoistTask';

export default class TwilioApiClient {
    private accountSid: string;
    private authToken: string;
    private userSmsNumber: string;
    private twilioSmsNumber: string;
    private client: TwilioLibraryClient.Twilio;

    constructor(accountSid: string, authToken: string, userSmsNumber: string, twilioSmsNumber: string) {
        this.accountSid = accountSid;
        this.authToken = authToken;
        this.userSmsNumber = userSmsNumber;
        this.twilioSmsNumber = twilioSmsNumber;
        this.client = TwilioLibraryClient(this.accountSid, this.authToken);
    }

    public async sendSmsMessage(messageContent: string): Promise<boolean> {
        return this.client.messages
            .create({
                body: messageContent,
                from: this.twilioSmsNumber,
                to: this.userSmsNumber,
            })
            .then(message => {
                console.log(JSON.stringify(message));
                return true;
            })
            .catch(error => {
                console.error(JSON.stringify(error));
                return false;
            });
    }

    public generateSmsMessageBodyFromTasks(todaysTasks: Array<TodoistTask>): string {
        let response = `
TODAY'S TASKS
-------------
        `;

        todaysTasks.forEach(task => {
            response += '\n' + task.getTextSummary();
        });

        response += '\n\n';

        return response;
    }
}
