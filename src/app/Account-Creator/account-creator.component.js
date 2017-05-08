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
var AccountCreatorComponent = (function () {
    function AccountCreatorComponent() {
        this.wasClicked = false;
        this.model = { nameCombo: "",
            email: "",
            password: "", };
    }
    AccountCreatorComponent.prototype.submitAccountInfo = function () {
        this.submittedAccountInfo = this.model;
        this.wasClicked = true;
    };
    AccountCreatorComponent = __decorate([
        core_1.Component({
            selector: 'account-creator',
            template: " <h1>Create a New Account</h1>\n\t\t\t\t<div class=\"container\">\n\t\t\t\t\t<form>\n\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t<label for=\"nameCombo\">Enter your first and last name: </label>\n\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"nameCombo\" required\n\t\t\t\t\t\t\t\t   [(ngModel)]=\"model.nameCombo\" name=\"nameCombo\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t<label for=\"email\">Enter your email: </label>\n\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" required id=\"email\"\n\t\t\t\t\t\t\t\t   [(ngModel)]=\"model.email\" name=\"email\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t<label for=\"password\">Enter a password for your account</label>\n\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" required id=\"password\"\n\t\t\t\t\t\t\t\t   [(ngModel)]=\"model.password\" name=\"password\">\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<button type=\"submit\" class=\"btn btn-success\"\n\t\t\t\t\t\t\t\t(click)=\"submitAccountInfo()\">Submit</button>\n\t\t\t\t\t</form>\n\t\t\t\t</div>\n\n\n\t"
        }), 
        __metadata('design:paramtypes', [])
    ], AccountCreatorComponent);
    return AccountCreatorComponent;
}());
exports.AccountCreatorComponent = AccountCreatorComponent;
//# sourceMappingURL=account-creator.component.js.map