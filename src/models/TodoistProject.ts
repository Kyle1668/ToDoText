export default class TodoistProject {
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
