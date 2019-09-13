import axios, { AxiosResponse } from 'axios';
import TodoistProject from './TodoistProject';
import TodoistTask from './TodoistTask';

export default class TodoistClient {
    private apiToken: string;
    private baseEndpointUrl = 'https://api.todoist.com/rest/v1/';

    constructor(token: string) {
        this.apiToken = token;
    }

    public async getProjects(): Promise<Array<TodoistProject>> {
        const projectEndpointUrl = this.baseEndpointUrl + 'projects';
        const axiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${this.apiToken}`,
            },
        };

        try {
            const result: AxiosResponse = await axios.get(projectEndpointUrl, axiosRequestConfig);
            const responseData = result.data.map(rawProjectData => {
                return new TodoistProject(rawProjectData.id, rawProjectData.name, rawProjectData.order, rawProjectData.number);
            });
            return responseData;
        } catch (error) {
            throw `Unable to connect to the Todoist API: ${error}`;
        }
    }

    public async getTasks(): Promise<Array<TodoistTask>> {
        const tasksEndpointUrl = this.baseEndpointUrl + 'tasks?filter=(overdue%20%7C%20today)';
        const axiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${this.apiToken}`,
            },
        };

        try {
            const result: AxiosResponse = await axios.get(tasksEndpointUrl, axiosRequestConfig);
            const responseData = result.data.map(rawTaskData => {
                return new TodoistTask(
                    rawTaskData.id,
                    rawTaskData.project_id,
                    rawTaskData.order,
                    rawTaskData.content,
                    rawTaskData.completed,
                    rawTaskData.priority,
                    rawTaskData.due.string,
                    rawTaskData.url,
                );
            });
            return responseData;
        } catch (error) {
            throw `Unable to connect to the Todoist API: ${error}`;
        }
    }
}
