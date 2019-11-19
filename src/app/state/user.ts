export interface Iuser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    title?: string;
}

export class user implements Iuser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}