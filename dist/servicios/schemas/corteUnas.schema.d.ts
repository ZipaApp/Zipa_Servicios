import { Document } from 'mongoose';
export type CorteUnasDocument = CorteUnas & Document;
export declare class CorteUnas {
    name: string;
    description: string;
    price: number;
    duration: number;
    assignedTo: string;
    active: boolean;
}
export declare const CorteUnasSchema: import("mongoose").Schema<CorteUnas, import("mongoose").Model<CorteUnas, any, any, any, Document<unknown, any, CorteUnas, any, {}> & CorteUnas & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CorteUnas, Document<unknown, {}, import("mongoose").FlatRecord<CorteUnas>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<CorteUnas> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
