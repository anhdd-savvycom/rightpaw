-- CreateEnum
CREATE TYPE "PetExp" AS ENUM ('Y', 'N');

-- CreateTable
CREATE TABLE "tbl_users" (
    "id" BIGSERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "petExp" "PetExp" NOT NULL DEFAULT E'Y',

    CONSTRAINT "tbl_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_users_uuid_key" ON "tbl_users"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_users_email_key" ON "tbl_users"("email");
