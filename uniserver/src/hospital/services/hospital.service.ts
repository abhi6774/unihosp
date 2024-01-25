import { Injectable, Logger } from '@nestjs/common';
import { Hospital, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateHospitalInput, CreateMultipleHospitalInput } from 'src/interfaces/hospital';

@Injectable()
export class HospitalService {

  logger = new Logger(HospitalService.name);

  constructor(private readonly prismaService: PrismaService) { }

  async createOneHospital(input: CreateHospitalInput) {
    const handle = input.handle || await this.createHandle(input.name);
    return this.prismaService.hospital.create({
      data: {
        name: input.name,
        coordinates: {
          create: input.coordinates
        },
        handle,
        location: input.location,
        userHospitalOwner: {
          create: {
            user: {
              connect: {
                id: input.ownerId
              }
            },
          }
        }
      },
      include: {
        coordinates: {
          select: {
            latitude: true,
            longitude: true
          }
        },
        userHospitalOwner: {
          include: {
            user: {
              select: {
                id: true,
              }
            }
          }
        }
      }
    });
  }

  async createHandle(name: string, count = 0): Promise<string> {

    if (typeof name !== 'string' || typeof count !== 'number') {
      throw new Error('Invalid input parameters');
    }

    const splittedName = name.split(" ");
    const generated = "@" + splittedName.map(v => v.slice(-3 - count)).join("");

    // Check for handle uniqueness
    const alreadyExists = await this.isHandleExists(generated);
    if (alreadyExists) {
      // If handle already exists, recursively call with a decremented count
      return this.createHandle(name, count - 1);
    }

    return generated;
  }

  async isHandleExists(handle: string): Promise<boolean> {
    // Check if the handle already exists in the database
    const existingHospital = await this.prismaService.hospital.findUnique({ where: { handle } });
    return !!existingHospital;
  }


  async createManyHospital(inputs: CreateMultipleHospitalInput, ownerId?: string) {

    let totalCreated = 0

    for (let hospital of inputs) {
      if (!hospital.ownerId) {
        hospital.ownerId = ownerId
      }
      await this.createOneHospital(hospital);
      totalCreated++;
    }

    return { totalCreated };
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
