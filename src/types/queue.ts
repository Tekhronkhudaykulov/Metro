export type QueueParamsType = {
    category_id: number
}

export type CheckType = {
    category_id?: {
        int?: number;
        category?: {
            name?: string;
        }
    };
    created_at?: {
        date?: string
    };
    number?: string;
    prefix?: string;
}