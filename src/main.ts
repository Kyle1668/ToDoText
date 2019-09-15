import TodoistApiClient from './models/TodoistApiClient';
import TwilioApiClient from './models/TwilioApiClient';
import dotenv from 'dotenv';

if (process.env.ENV === 'dev') dotenv.config();

let todoistApiToken: string;
let twilioAccountSid: string;
let twilioAuthToken: string;
let userPhoneNumber: string;
let twilioPhoneNumber: string;

try {
    todoistApiToken = String(process.env.TODOIST_TOKEN);
    twilioAccountSid = String(process.env.TWILIO_ACCOUNT_SID);
    twilioAuthToken = String(process.env.TWILIO_AUTH_TOKEN);
    userPhoneNumber = String(process.env.USER_PHONE_NUMBER);
    twilioPhoneNumber = String(process.env.TWILIO_PHONE_NUMBER);

    const todoistClient = new TodoistApiClient(todoistApiToken);
    const twilioClient = new TwilioApiClient(twilioAccountSid, twilioAuthToken, userPhoneNumber, twilioPhoneNumber);

    todoistClient
        .getTasks()
        .then(tasks => {
            if (tasks.length > 0) {
                const message = twilioClient.generateSmsMessageBodyFromTasks(tasks);
                twilioClient.sendSmsMessage(message).then(success => {
                    return success;
                });
            } else {
                console.log('No Tasks For Today');
            }
        })
        .catch(error => {
            console.error(error);
        });
} catch (error) {
    console.error(`ENV VAR NOT SET: ${error}`);
    process.exit(1);
}

console.log('Program Completed');
