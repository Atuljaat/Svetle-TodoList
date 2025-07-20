export type Todo =  {
    readonly id : string;
    text : string;
    isDone : boolean;
    time : string;
    deadline : string;
    priority : "High" | "Normal" | "Low"
}

export type sort = "Time" | "Priority" | "Deadline"