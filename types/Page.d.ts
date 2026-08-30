// import { User } from "@/app/generated/prisma/client"

export type PageUpdateInput = {
    id: string;
    favorite?: boolean;
    title?: string;
    blocks?: string;
    textContent?: string;
    parentId?: string;
};

export type PageCreateInput = {
    favorite?: boolean;
    title?: string;
    blocks?: string;
    textContent?: string;
    user: string; // user id to connect to
    parentId: string;
};

export type Headline = {
    ts_headline: string;
};
