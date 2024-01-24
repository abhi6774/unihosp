import { Injectable, Logger } from '@nestjs/common';
import { Hospital, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateHospitalInput, CreateMultipleHospitalInput } from 'src/interfaces/hospital';

@Injectable()
export class HospitalService {

  logger = new Logger(HospitalService.name);

  constructor(private readonly prismaService: PrismaService) { }

  createOneHospital(input: CreateHospitalInput) {
    return this.prismaService.hospital.create({
      data: {
        name: input.name,
        coordinates: {
          create: input.coordinates
        },
        handle: input.handle,
        location: input.location
      },
      include: {
        coordinates: true
      }
    });
  }

  async createHandle(name: string, count = 0): Promise<string> {
    const splittedName = name.split(" ");
    const generated = "@" + splittedName.map(v => v.slice(-3 - count)).join("")
    const alreadyThere = await this.prismaService.hospital.findUnique({ where: { handle: generated } });
    if (alreadyThere) {
      return this.createHandle(name, - count);
    }
    return generated;
  }

  async createManyHospital(inputs: CreateMultipleHospitalInput) {

    // for (const input of inputs) {
    //   let handle = "";
    //   if (!input.handle) {
    //     handle = await this.createHandle(input.name);
    //   }
    //   data.push({ ...input, handle });
    // }


    // return this.prismaService.hospital.createMany({
    //   data: [],
    //   skipDuplicates: true
    // }).catch((err) => ({
    //   message: err.message
    // }));

    this.prismaService.hospital.createMany
    const resposne = {
      totalCreated: 0,
    }
    inputs.forEach((value) => {
      this.createOneHospital(value)
      resposne.totalCreated++;
    })
    return resposne
  }

  getHospitals(input: Prisma.HospitalWhereInput) {
    return this.prismaService.hospital.findMany({
      where: input
    })
  }

  getHospitalById(input: Prisma.HospitalWhereUniqueInput) {
    return this.prismaService.hospital.findUnique({
      where: {
        id: input.id,
        handle: input.handle,
      },
      include: {
        doctor: true,
        allowedPatientProfiles: true,
        Appointments: true
      }
    }).catch((err) => {
      return {
        "message": "Something Went wrong"
      }
    })
  }

  updateHospital(where: Prisma.HospitalWhereUniqueInput, data: Prisma.HospitalUpdateInput) {
    return this.prismaService.hospital.update({
      where,
      data,
    })
  }

  deleteHospitalById(hospitalId: string) {
    return this.prismaService.hospital.delete({
      where: {
        id: hospitalId
      }
    })
  }
}
