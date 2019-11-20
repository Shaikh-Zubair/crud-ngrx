export interface Iuser {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    title?: string;
}

export class user implements Iuser {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
}