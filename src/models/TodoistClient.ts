import axios, { AxiosResponse } from 'axios';

class TodoistProject {
    public id: string;
    public name: string;
    public order: number;
    public commentCount: number;

    constructor(inID: string, inName: string, inOrder: number, inCommentCount: number) {
        this.id = inID;
        this.name = inName;
        this.order = inOrder;
        this.commentCount = inCommentCount;
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
}
