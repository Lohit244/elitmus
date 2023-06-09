import { prisma } from "./server"
import { Request, Response } from "express"


export const topTen = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    where: {
      totalTime: {
        not: 0
      },
      endAt: {
        not: null
      }
    },
    take: 10,
    select: {
      username: true,
      totalTime: true,
    },
    orderBy: {
      totalTime: 'asc'
    }
  })

  return res.json(users)
}
