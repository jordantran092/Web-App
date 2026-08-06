// import { User } from "@/app/generated/prisma/client"

export type PageUpdateInput = {
  id: string
  favorite?: boolean
  title?: string
  blocks: string
}