// Prisma
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

declare global {
  var prisma: PrismaClient | undefined
}

export const db = global.prisma || new PrismaClient().$extends(withAccelerate())

// @ts-ignore
if (process.env.NODE_ENV !== "production") global.prisma = db