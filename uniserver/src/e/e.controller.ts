import { Controller, Get, Param } from '@nestjs/common';
import { DoctorService } from 'src/doctor/service/doctor.service';
import { HospitalService } from 'src/hospital/services/hospital.service';
import { PatientService } from 'src/patient/service/patient.service';

@Controller('e')
export class EController {

    constructor(
        private hospitalService: HospitalService,
        private patientService: PatientService,
        private doctorService: DoctorService
    ) { }


    @Get("/h/:hospitalId")
    getHospitalById(@Param("hospitalId") hospitalId: string) {
        return this.hospitalService.getHospitalById({
            id: hospitalId
        })
    }

    @Get("/p/:patientId")
    async getPatientById(@Param("patientId") patientId: string) {
        return this.patientService.findPatientProfile({ id: patientId })
    }

    @Get("/d/:doctorId")
    getDoctorById(@Param("doctorId") doctorId: string) {
        console.log("DoctorId", doctorId)
        return this.doctorService.getDoctorById({
            id: doctorId
        })
    }
}
