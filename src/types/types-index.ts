export enum ViewOption {
    TableView = "Table View",
    CardView = "Card View"
}

export interface Repository {
    createdAt: string;
    description: string;
    language: string;
    license: string;
    name: string;
    owner: string;
    score: number;
    size: number;
    url: string;
    watchersCount: number;
}
