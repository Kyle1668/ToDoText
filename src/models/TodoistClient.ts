import axios, { AxiosResponse } from 'axios';

class TodoistProject {
    public id: string;
    public name: string;
    public order: number;
    public commentCount: number;

    constructor(id: string, name: string, order: number, commentCount: number) {
        this.id = id;
        this.name = name;
        this.order = order;
        this.commentCount = commentCount;
    }
}

class TodoistTask {
    public id: string;
    public projectID: string;
    public order: number;
    public content: string;
    public completed: boolean;
    public priority: number;
    public dueDate: string;
    public url: string;

    constructor(id, projectID, order, content, completed, priority, dueDate, url) {
        this.id = id;
        this.projectID = projectID;
        this.order = order;
        this.content = content;
        this.completed = completed;
        this.priority = priority;
        this.dueDate = dueDate;
        this.url = url;
    }

    public getTextSummary(): string {
        return `Task: ${this.content} by ${this.dueDate}`;
    }
}

export default class TodoistClient {
    private apiToken: string;

    constructor(token: string) {
        this.apiToken = token;
    }

    public async getProjects(): Promise<Array<TodoistProject>> {
        const projectEndpointUrl = 'https://api.todoist.com/rest/v1/projects';
        const axiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${this.apiToken}`,
            },
        };

        try {
            const result: AxiosResponse = await axios.get(projectEndpointUrl, axiosRequestConfig);
            const responseData = result.data.map(element => {
                return new TodoistProject(element.id, element.name, element.order, element.number);
            });
            return responseData;
        } catch (error) {
            throw `Unable to connect to the Todoist API: ${error}`;
        }
    }

    public async getTasks();
}
