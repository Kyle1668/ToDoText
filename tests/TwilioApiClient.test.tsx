import TwilioApiClient from '../src/models/TwilioApiClient';
import dotenv from 'dotenv';

if (process.env.ENV === 'dev') dotenv.config();

describe('Unit Tests for TwilioApiClient', () => {
    test('api key set', () => {
        expect(process.env.TWILIO_ACCOUNT_SID).toBeDefined();
        expect(process.env.TWILIO_AUTH_TOKEN).toBeDefined();
        expect(process.env.USER_PHONE_NUMBER).toBeDefined();
        expect(process.env.TWILIO_PHONE_NUMBER).toBeDefined();
    });
});

describe('Integration tests for TwilioApiClient', () => {
    const accountSid = String(process.env.TWILIO_ACCOUNT_SID);
    const authToken = String(process.env.TWILIO_AUTH_TOKEN);
    const userPhoneNumber = String(process.env.USER_PHONE_NUMBER);
    const twilioPhoneNumber = String(process.env.TWILIO_PHONE_NUMBER);
    const validTwilioClient = new TwilioApiClient(accountSid, authToken, userPhoneNumber, twilioPhoneNumber);
    const invalidTwilioClient = new TwilioApiClient('AC123', '456', userPhoneNumber, twilioPhoneNumber);

    test('should send SMS message', () => {
        return validTwilioClient.sendSmsMessage('Integration Test Triggered Message').then(response => {
            expect(response).toBeDefined();
        });
    });

    test('should get error when sending SMS message', () => {
        return invalidTwilioClient.sendSmsMessage('Integration Test Triggered Message').catch(error => {
            expect(error).toBeDefined();
        });
    });
});
