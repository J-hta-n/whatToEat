import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const database = globalThis.prisma ?? prismaClientSingleton();

export default database;

if (process.env.NODE_ENV !== "production") globalThis.prisma = database;
