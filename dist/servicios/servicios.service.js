"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiciosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const vacunacion_schema_1 = require("./schemas/vacunacion.schema");
const paseo_schema_1 = require("./schemas/paseo.schema");
const bano_schema_1 = require("./schemas/bano.schema");
const corteUnas_schema_1 = require("./schemas/corteUnas.schema");
let ServiciosService = class ServiciosService {
    vacunacionModel;
    paseoModel;
    banoModel;
    corteUnasModel;
    constructor(vacunacionModel, paseoModel, banoModel, corteUnasModel) {
        this.vacunacionModel = vacunacionModel;
        this.paseoModel = paseoModel;
        this.banoModel = banoModel;
        this.corteUnasModel = corteUnasModel;
    }
    getModel(type) {
        switch (type.toLowerCase()) {
            case 'vacunacion': return this.vacunacionModel;
            case 'paseo': return this.paseoModel;
            case 'bano': return this.banoModel;
            case 'corteunas': return this.corteUnasModel;
            default: throw new Error('Tipo de servicio no válido');
        }
    }
    async findAll(type) {
        return this.getModel(type).find().exec();
    }
    async findOne(type, id) {
        return this.getModel(type).findById(id).exec();
    }
    async create(type, data) {
        const doc = new (this.getModel(type))(data);
        return doc.save();
    }
    async update(type, id, data) {
        return this.getModel(type).findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async remove(type, id) {
        return this.getModel(type).findByIdAndDelete(id).exec();
    }
};
exports.ServiciosService = ServiciosService;
exports.ServiciosService = ServiciosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(vacunacion_schema_1.Vacunacion.name)),
    __param(1, (0, mongoose_1.InjectModel)(paseo_schema_1.Paseo.name)),
    __param(2, (0, mongoose_1.InjectModel)(bano_schema_1.Bano.name)),
    __param(3, (0, mongoose_1.InjectModel)(corteUnas_schema_1.CorteUnas.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ServiciosService);
//# sourceMappingURL=servicios.service.js.map