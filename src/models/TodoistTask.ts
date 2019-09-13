export default class TodoistTask {
    public id: string;
    public projectID: string;
    public order: number;
    public content: string;
    public completed: boolean;
    public priority: number;
    public dueDate: string;
    public url: string;

    constructor(id: string, projectID: string, order: number, content: string, completed: boolean, priority: number, dueDate: string, url: string) {
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
