// import { appointmentsAvailableForGivenDay } from '../Admin-Mock-Appointments-Available/admin-mock-appointments-available';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminAppointmentSchedulerService {
	// availableAdminAppointments: number[] = appointmentsAvailableForGivenDay;

	public getAvailableAdminAppointments(): number[] {
		return [9, 2, 4];
	}
}
