import { Break } from "./break";

export interface Session {
    sessionId: string;
    taskIds?: string[];
    startTime: string;
    endTime: string;
    breakTime?: Break[];
}
