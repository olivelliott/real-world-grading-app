import { PrismaClient } from '@prisma/client'
import { add } from 'date-fns'

// Instantiate Prisma Client
const prisma = new PrismaClient()

// A `main` function so that we can use async/await
async function main() {

  const user = await prisma.user.create({
    data: {
      email: 'adam@test.com',
      firstName: 'Adam',
      lastName: 'Watkins',
      social: {
        facebook: 'adamwats',
        twitter: 'adamdawats'
      }
    }
  })
}

main()
  .catch((e: Error) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    // Disconnect Prisma Client
    await prisma.$disconnect()
  })
