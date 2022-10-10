import { TaskTimestamp } from "./taskTimestamp";

export interface Todo {
    taskId: number;
    title: string;
    timeStamps?: TaskTimestamp[];
    isCompleted: boolean;
    isFavorite: boolean;
    isArchived: boolean;
    date: Date;
    // date?: Date; make it optional 
}