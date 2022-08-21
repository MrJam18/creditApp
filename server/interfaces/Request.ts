import { Request } from "express";

export interface BaseRequest extends Request 
{
    user: User
}

interface User
{
    id: string
    groupId: string
}