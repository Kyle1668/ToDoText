import TodoistTask from '../src/models/TodoistTask';

describe('Unit tests for TodoistTask', () => {
    test('test getTextSummary', () => {
        const testTask = new TodoistTask('1', '2', 3, 'Finsih this test', false, 0, 'December 32nd', 'foo');
        expect(testTask.getTextSummary()).toEqual('Task: Finsih this test by December 32nd');
    });
});
