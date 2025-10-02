import { Document } from 'mongoose';
export type PaseoDocument = Paseo & Document;
export declare class Paseo {
    name: string;
    description: string;
    price: number;
    duration: number;
    assignedTo: string;
    active: boolean;
}
export declare const PaseoSchema: import("mongoose").Schema<Paseo, import("mongoose").Model<Paseo, any, any, any, Document<unknown, any, Paseo, any, {}> & Paseo & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Paseo, Document<unknown, {}, import("mongoose").FlatRecord<Paseo>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Paseo> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
