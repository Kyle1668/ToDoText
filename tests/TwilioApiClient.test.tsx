import TwilioApiClient from '../src/models/TwilioApiClient';
import TodoistTask from '../src/models/TodoistTask';
import dotenv from 'dotenv';

if (process.env.ENV === 'dev') dotenv.config();

describe('Twilio Client Tests', () => {
    test('api key set', () => {
        expect(process.env.TWILIO_ACCOUNT_SID).toBeDefined();
        expect(process.env.TWILIO_AUTH_TOKEN).toBeDefined();
        expect(process.env.USER_PHONE_NUMBER).toBeDefined();
        expect(process.env.TWILIO_PHONE_NUMBER).toBeDefined();
    });

    const accountSid = String(process.env.TWILIO_ACCOUNT_SID);
    const authToken = String(process.env.TWILIO_AUTH_TOKEN);
    const userPhoneNumber = String(process.env.USER_PHONE_NUMBER);
    const twilioPhoneNumber = String(process.env.TWILIO_PHONE_NUMBER);
    const validTwilioClient = new TwilioApiClient(accountSid, authToken, userPhoneNumber, twilioPhoneNumber);
    const invalidTwilioClient = new TwilioApiClient('AC123', '456', userPhoneNumber, twilioPhoneNumber);

    describe('Unit Tests', () => {
        test('test correct message generation', () => {
            const testTasks = [
                new TodoistTask('1', '2', 1, 'make study guide', false, 1, 'Jul 11', 'foo'),
                new TodoistTask('2', '2', 1, 'go to the gym', false, 2, 'Jul 11', 'foo'),
                new TodoistTask('3', '2', 1, 'Write emails', false, 3, 'Jul 11', 'foo'),
            ];

            const generateMessageContent = validTwilioClient.generateSmsMessageBodyFromTasks(testTasks);
            const expectedMessageBody = `
TODAY'S TASKS
-------------
        
Task: make study guide by Jul 11
Task: go to the gym by Jul 11
Task: Write emails by Jul 11

`;

            console.log(generateMessageContent);

            expect(generateMessageContent).toEqual(expectedMessageBody);
        });
    });

    describe('Integration Tests', () => {
        // test('should send SMS message', () => {
        //     return validTwilioClient.sendSmsMessage('Integration Test Triggered Message').then(response => {
        //         expect(response).toBeDefined();
        //     });
        // });

        test('should get error when sending SMS message', () => {
            return invalidTwilioClient.sendSmsMessage('Integration Test Triggered Message').catch(error => {
                expect(error).toBeDefined();
            });
        });
    });
});
