export type HospitalDetials = {
  name: string;
  handle: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  doctor: any;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  admins: any;
}


export type DoctorDetails = {
  id: string;
  fName: string;
  lName: string;
  handle: string;
  hospitalId: string;
  createdAt: string;
  updatedAt: null | string;
  notificationChannel: string;
  userId: string;
  owner: {
    id: string;
    email: string;
    password: string;
    name: string;
    contact: string;
    avatarUrl: null | string;
    country: null | string;
    role: string;
    createdAt: string;
    updatedAt: null | string;
    verified: boolean;
  };
  allowedPatientProfiles: any[]; // Replace 'any' with the actual type if known
  Appointments: any[]; // Replace 'any' with the actual type if known
  hospital: {
    id: string;
    name: string;
    handle: string;
    location: string;
    createdAt: string;
    updatedAt: null | string;
  };
  notification: any[]; // Replace 'any' with the actual type if known
};
