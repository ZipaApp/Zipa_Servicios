"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiciosModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const servicios_service_1 = require("./servicios.service");
const servicios_controller_1 = require("./servicios.controller");
const vacunacion_schema_1 = require("./schemas/vacunacion.schema");
const paseo_schema_1 = require("./schemas/paseo.schema");
const bano_schema_1 = require("./schemas/bano.schema");
const corteUnas_schema_1 = require("./schemas/corteUnas.schema");
let ServiciosModule = class ServiciosModule {
};
exports.ServiciosModule = ServiciosModule;
exports.ServiciosModule = ServiciosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: vacunacion_schema_1.Vacunacion.name, schema: vacunacion_schema_1.VacunacionSchema },
                { name: paseo_schema_1.Paseo.name, schema: paseo_schema_1.PaseoSchema },
                { name: bano_schema_1.Bano.name, schema: bano_schema_1.BanoSchema },
                { name: corteUnas_schema_1.CorteUnas.name, schema: corteUnas_schema_1.CorteUnasSchema },
            ]),
        ],
        controllers: [servicios_controller_1.ServiciosController],
        providers: [servicios_service_1.ServiciosService],
    })
], ServiciosModule);
//# sourceMappingURL=servicios.module.js.map