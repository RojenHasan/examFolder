// Execute: npx ts-node util/init-db.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.lecturer.deleteMany({});
    await prisma.user.deleteMany();

    const lecturerJP = await prisma.lecturer.create({
        data: {
            expertise: 'Full Stack Development, Front-end Development, Testing',
            user: {
                create: {
                    username: 'johanp',
                    password: 'johanp123',
                    firstName: 'Johan',
                    lastName: 'Pieck',
                    email: 'johan.pieck@ucll.be',
                },
            },
        },
    });

    const lecturerES = await prisma.lecturer.create({
        data: {
            expertise: 'Software Engineering, Back-end Development, Testing',
            user: {
                create: {
                    username: 'elkes',
                    password: 'elkes123',
                    firstName: 'Elke',
                    lastName: 'Steegmans',
                    email: 'elke.steegmans@ucll.be',
                },
            },
        },
    });
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
