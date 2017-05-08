import { Component, OnInit } from '@angular/core';
import { AdminAppointmentSchedulerService } from './admin-appointment-scheduler.service';

@Component({
	selector: 'appointment-scheduler',
	template: `<h1>Available appointments for (day/month): </h1>
					<ul>
						<li *ngFor="let time of timeTemplate; let i=index">
							<h2>######## {{time}} ########</h2>
							<button *ngIf="getAvailabilityStatus(time, adminAvailableAppointments)"
									(click)="alertForSelectingTime(time)">Select this time</button>
						</li> 
					</ul>
			`,
	providers: [AdminAppointmentSchedulerService],
})

export class AppointmentSchedulerComponent implements OnInit {
	timeTemplate: number[] = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5];
	adminAvailableAppointments: number[];

	constructor(private __adminAppointmentScheduler: AdminAppointmentSchedulerService) {}

	ngOnInit() {
		this.adminAvailableAppointments = this.__adminAppointmentScheduler.getAvailableAdminAppointments();
	}

	public getAvailabilityStatus(time: number, appointmentsAvailable: number[]): boolean {
		let isAvailable: boolean = true;
		for(let i of appointmentsAvailable) {
			if(time === i) {
				isAvailable = false;
			}
		}
		return isAvailable;
	}

	public alertForSelectingTime(time: number) {
		alert("Your appointment for: " + time + " has been confirmed.");
	}
}
