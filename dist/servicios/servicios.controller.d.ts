import { ServiciosService } from './servicios.service';
export declare class ServiciosController {
    private readonly serviciosService;
    constructor(serviciosService: ServiciosService);
    findAll(type: string): Promise<any[]>;
    findOne(type: string, id: string): Promise<any>;
    create(type: string, data: any): Promise<any>;
    update(type: string, id: string, data: any): Promise<any>;
    remove(type: string, id: string): Promise<any>;
}
