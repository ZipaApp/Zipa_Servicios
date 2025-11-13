import { Model } from 'mongoose';
import { VacunacionDocument } from './schemas/vacunacion.schema';
import { PaseoDocument } from './schemas/paseo.schema';
import { BanoDocument } from './schemas/bano.schema';
import { CorteUnasDocument } from './schemas/corteUnas.schema';
export declare class ServiciosService {
    private vacunacionModel;
    private paseoModel;
    private banoModel;
    private corteUnasModel;
    constructor(vacunacionModel: Model<VacunacionDocument>, paseoModel: Model<PaseoDocument>, banoModel: Model<BanoDocument>, corteUnasModel: Model<CorteUnasDocument>);
    private getModel;
    findAll(type: string): Promise<any[]>;
    findOne(type: string, id: string): Promise<any>;
    create(type: string, data: any): Promise<any>;
    update(type: string, id: string, data: any): Promise<any>;
    remove(type: string, id: string): Promise<any>;
}
