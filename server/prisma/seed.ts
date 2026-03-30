import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.rSVP.deleteMany({});
  await prisma.wedding.deleteMany({});

  const wedding = await prisma.wedding.create({
    data: {
      couple_names: 'Julian & Isabella',
      date: new Date('2026-04-14T16:00:00Z'),
      venue: 'Sonoma Valley, California',
      story: 'Seven years ago, amidst the bustling energy of a lazy afternoon in Paris, Julian and Isabella crossed paths at a small bookstore in Le Marais. What began as a brief conversation about vintage poetry transformed into a lifetime of shared sunsets and quiet morning coffees.',
    },
  });

  await prisma.rSVP.createMany({
    data: [
      { name: 'John Doe', attendance_status: 'yes', guest_count: 2, message: 'Cant wait to celebrate with you both!' },
      { name: 'Jane Smith', attendance_status: 'no', guest_count: 0, message: 'So sorry, I have a prior engagement.' },
      { name: 'Sam Wilson', attendance_status: 'maybe', guest_count: 1, message: 'Checking my flight schedule.' },
    ],
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
