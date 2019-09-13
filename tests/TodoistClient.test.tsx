import TodoistClient from '../src/models/TodoistClient';
import dotenv from 'dotenv';
dotenv.config();

describe('Unit Tests for Todoist Client', () => {
    const todoistApiToken = String(process.env.TODOIST_TOKEN);

    test('api key set', () => {
        expect(todoistApiToken).toBeDefined();
    });
});

describe('Integration Tests for Todoist Client', () => {
    const todoistApiToken = String(process.env.TODOIST_TOKEN);

    test('desearilizing projects response', () => {
        const testClient = new TodoistClient(todoistApiToken);
        return testClient.getProjects().then(response => {
            expect(response).toBeDefined();
            expect(response.length > 0).toBeTruthy();
            expect(response[0].name).toBeDefined();
            expect(response[0].id).toBeDefined();
        });
    });

    test('projects api request returns data', () => {
        const testClient = new TodoistClient('fooBar');
        return testClient.getProjects().catch(error => {
            expect(error).toBeDefined();
            expect(error).toEqual('Unable to connect to the Todoist API: Error: Request failed with status code 403');
        });
    });
});
