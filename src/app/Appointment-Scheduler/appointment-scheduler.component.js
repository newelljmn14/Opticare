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
var core_1 = require('@angular/core');
var admin_appointment_scheduler_service_1 = require('./admin-appointment-scheduler.service');
var AppointmentSchedulerComponent = (function () {
    function AppointmentSchedulerComponent(__adminAppointmentScheduler) {
        this.__adminAppointmentScheduler = __adminAppointmentScheduler;
        this.timeTemplate = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5];
    }
    AppointmentSchedulerComponent.prototype.ngOnInit = function () {
        this.adminAvailableAppointments = this.__adminAppointmentScheduler.getAvailableAdminAppointments();
    };
    AppointmentSchedulerComponent.prototype.getAvailabilityStatus = function (time, appointmentsAvailable) {
        var isAvailable = true;
        for (var _i = 0, appointmentsAvailable_1 = appointmentsAvailable; _i < appointmentsAvailable_1.length; _i++) {
            var i = appointmentsAvailable_1[_i];
            if (time === i)
                isAvailable = false;
        }
        return isAvailable;
    };
    AppointmentSchedulerComponent.prototype.alertForSelectingTime = function (time) {
        alert("Your appointment for: " + time + " has been confirmed.");
    };
    AppointmentSchedulerComponent = __decorate([
        core_1.Component({
            selector: 'appointment-scheduler',
            template: "<h1>Available appointments for (day/month): </h1>\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li *ngFor=\"let time of timeTemplate; let i=index\">\n\t\t\t\t\t\t\t<h2>######## {{time}} ########</h2>\n\t\t\t\t\t\t\t<button *ngIf=\"getAvailabilityStatus(time, adminAvailableAppointments)\"\n\t\t\t\t\t\t\t\t\t(click)=\"alertForSelectingTime(time)\">Select this time</button>\n\t\t\t\t\t\t</li> \n\t\t\t\t\t</ul>\n\t\t\t\t<h2>{{getAvailabilityStatus(11, adminAvailableAppointments)}}</h2>\n\t\t\t",
            providers: [admin_appointment_scheduler_service_1.AdminAppointmentSchedulerService],
        }), 
        __metadata('design:paramtypes', [admin_appointment_scheduler_service_1.AdminAppointmentSchedulerService])
    ], AppointmentSchedulerComponent);
    return AppointmentSchedulerComponent;
}());
exports.AppointmentSchedulerComponent = AppointmentSchedulerComponent;
//# sourceMappingURL=appointment-scheduler.component.js.map