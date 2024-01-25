-- CreateTable
CREATE TABLE "UserHospitalAdmin" (
    "userId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,

    CONSTRAINT "UserHospitalAdmin_pkey" PRIMARY KEY ("userId","hospitalId")
);

-- CreateTable
CREATE TABLE "_HospitalToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HospitalToUser_AB_unique" ON "_HospitalToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_HospitalToUser_B_index" ON "_HospitalToUser"("B");

-- AddForeignKey
ALTER TABLE "UserHospitalAdmin" ADD CONSTRAINT "UserHospitalAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHospitalAdmin" ADD CONSTRAINT "UserHospitalAdmin_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HospitalToUser" ADD CONSTRAINT "_HospitalToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Hospital"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HospitalToUser" ADD CONSTRAINT "_HospitalToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
