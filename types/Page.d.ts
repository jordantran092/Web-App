// import { User } from "@/app/generated/prisma/client"

export type PageUpdateInput = {
    id: string;
    favorite?: boolean;
    title?: string;
    blocks?: string;
    parentPageId?: string;
};

export type PageCreateInput = {
    favorite?: boolean;
    title?: string;
    blocks?: string;
    user: string;
    parentPageId: string;
};
