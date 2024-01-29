import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { BloodGroupType, Patient } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  private currentProfile = new BehaviorSubject<Patient | null>(null);

  get current() {
    return this.currentProfile.pipe(
      map((patient) => {
        if (patient !== null) return patient;
        let p: Patient;
        const sub = this.http
          .get<Patient>('/patient/user')
          .subscribe((patient) => {
            p = patient;
            this.profile = patient;
            sub.unsubscribe();
          });
        return p!;
      })
    );
  }

  set profile(profile: Patient) {
    this.currentProfile.next(profile);
  }

  checkHandle(handle: string) {
    return this.http.post<{ handle: boolean }>(`/patient/exists`, {
      handle,
    });
  }

  updateAvatar(formData: FormData) {
    return this.http.post('/avatars', formData);
  }

  createPatientProfile({
    fName,
    lName,
    dateOfBirth,
    handle,
    bloodGroup,
  }: {
    fName: string;
    lName: string;
    dateOfBirth: string | Date;
    handle?: string;
    bloodGroup: BloodGroupType;
  }) {
    const patient = this.http.post<Patient>(`/patient`, {
      fName,
      lName,
      dateOfBirth,
      handle,
      bloodGroup,
    });

    patient.subscribe((patient) => {
      this.currentProfile.next(patient);
    });
    return patient;
  }
}
