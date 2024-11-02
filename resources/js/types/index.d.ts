export interface User {
    id: number;
    name: string;
    email: string;
    superuser: boolean;
    email_verified_at?: string;
}

export interface Server {
    id: number;
    name: string;
    address: string;
    ownerId: number;
    public: boolean;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
