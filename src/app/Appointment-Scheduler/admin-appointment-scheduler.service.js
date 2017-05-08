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
var admin_mock_appointments_available_1 = require('../Admin-Mock-Appointments-Available/admin-mock-appointments-available');
var core_1 = require('@angular/core');
var AdminAppointmentSchedulerService = (function () {
    function AdminAppointmentSchedulerService() {
    }
    // availableAdminAppointments: number[] = appointmentsAvailableForGivenDay;
    AdminAppointmentSchedulerService.prototype.getAvailableAdminAppointments = function () {
        return admin_mock_appointments_available_1.appointmentsAvailableForGivenDay;
    };
    AdminAppointmentSchedulerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AdminAppointmentSchedulerService);
    return AdminAppointmentSchedulerService;
}());
exports.AdminAppointmentSchedulerService = AdminAppointmentSchedulerService;
//# sourceMappingURL=admin-appointment-scheduler.service.js.map