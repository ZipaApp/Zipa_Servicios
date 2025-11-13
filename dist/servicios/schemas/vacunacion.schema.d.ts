import { Document } from 'mongoose';
export type VacunacionDocument = Vacunacion & Document;
export declare class Vacunacion {
    name: string;
    description: string;
    price: number;
    duration: number;
    assignedTo: string;
    active: boolean;
}
export declare const VacunacionSchema: import("mongoose").Schema<Vacunacion, import("mongoose").Model<Vacunacion, any, any, any, Document<unknown, any, Vacunacion, any, {}> & Vacunacion & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Vacunacion, Document<unknown, {}, import("mongoose").FlatRecord<Vacunacion>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Vacunacion> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
