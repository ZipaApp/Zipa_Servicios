import { Document } from 'mongoose';
export type BanoDocument = Bano & Document;
export declare class Bano {
    name: string;
    description: string;
    price: number;
    duration: number;
    assignedTo: string;
    active: boolean;
}
export declare const BanoSchema: import("mongoose").Schema<Bano, import("mongoose").Model<Bano, any, any, any, Document<unknown, any, Bano, any, {}> & Bano & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Bano, Document<unknown, {}, import("mongoose").FlatRecord<Bano>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Bano> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
