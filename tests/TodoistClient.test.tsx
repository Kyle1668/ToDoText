import TodoistApiClient from '../src/models/TodoistApiClient';
import dotenv from 'dotenv';

if (process.env.ENV === 'dev') dotenv.config();

describe('Unit Tests for Todoist Client', () => {
    const todoistApiToken = String(process.env.TODOIST_TOKEN);

    test('api key set', () => {
        expect(todoistApiToken).toBeDefined();
    });
});

describe('Integration Tests for Todoist Client', () => {
    const todoistApiToken = String(process.env.TODOIST_TOKEN);
    const validTodoistApiClient = new TodoistApiClient(todoistApiToken);
    const invalidTodoistApiClient = new TodoistApiClient('123');

    test('desearilizing projects response', () => {
        return validTodoistApiClient.getProjects().then(response => {
            expect(response).toBeDefined();

            if (response.length > 0) {
                expect(response[0].name).toBeDefined();
                expect(response[0].id).toBeDefined();
            }
        });
    });

    test('handle bad api key in projects', () => {
        return invalidTodoistApiClient.getProjects().catch(error => {
            expect(error).toBeDefined();
            expect(error).toEqual('Unable to connect to the Todoist API: Error: Request failed with status code 403');
        });
    });

    test('desearilizing tasks response', () => {
        return validTodoistApiClient.getTasks().then(response => {
            expect(response).toBeDefined();
            if (response.length > 0) {
                expect(response[0].id).toBeDefined();
                expect(response[0].projectID).toBeDefined();
                expect(response[0].order).toBeDefined();
                expect(response[0].content).toBeDefined();
                expect(response[0].completed).toBeDefined();
                expect(response[0].id).toBeDefined();
                expect(response[0].priority).toBeDefined();
                expect(response[0].url).toBeDefined();
            }
        });
    });

    test('handle bad api key in tasks', () => {
        return invalidTodoistApiClient.getTasks().catch(error => {
            expect(error).toBeDefined();
            expect(error).toEqual('Unable to connect to the Todoist API: Error: Request failed with status code 403');
        });
    });
});
