import { PrismaClient } from "@prisma/client";
import { fakeTicketComplete } from "./types/fake-data";

const prisma = new PrismaClient();

// A `main` function so that we can use async/await
async function main() {
    for(let i = 0; i < 20; i++){
      const ticket = await prisma.ticket.create({ data: {...fakeTicketComplete(), userId: 1} });
    }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
