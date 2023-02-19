import { PrismaClient } from "@prisma/client";
import { add } from "date-fns";
import { id } from "date-fns/locale";

// Instantiate Prisma Client
const prisma = new PrismaClient();

// A `main` function so that we can use async/await
async function main() {
  // ! Delete on Production
  await prisma.courseEnrollment.deleteMany({})
  await prisma.testResult.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.test.deleteMany({})
  await prisma.course.deleteMany({})

  // * Teacher
  const grace = await prisma.user.create({
    data: {
      email: "grace@example.com",
      firstName: "grace",
      lastName: "harold",
      social: {
        facebook: "haroldbg",
        twitter: "adamdawats",
      },
    },
  })

  const weekFromNow = add(new Date(), { days: 7 });
  const twoWeeksFromNow = add(new Date(), { days: 14 })
  const threeWeeksFromNow = add(new Date(), { days: 28 })

// * Course
  const course = await prisma.course.create({
    data: {
      name: "JavaScript Jams",
      tests: {
        create: [
          {
            name: "Test One",
            date: weekFromNow,
          },
          {
            name: "Test Two",
            date: twoWeeksFromNow,
          },
          {
            name: "Test Three",
            date: threeWeeksFromNow,
          },
        ],
      },
      courseEnrollment: {
        create: {
          role: "TEACHER",
          user: {
            connect: {
              id: grace.id
            }
          }
        }
      }
    },
    include: {
      tests: true,
      courseEnrollment: {
        include: { user: true }
      }
    }
  })

  // * Students
  const david = await prisma.user.create({
    data: {
      email: 'david@example.com',
      firstName: 'David',
      lastName: 'Jones',
      social: {
        facebook: 'davidjstone'
      },
      courses: {
        create: {
          role: 'STUDENT',
          course: {
            connect: { id: course.id }
          }
        }
      }
    }
  })

  const sara = await prisma.user.create({
    data: {
      email: 'sara@example.com',
      firstName: 'sara',
      lastName: 'davis',
      social: {
        facebook: 'sarapdavis'
      },
      courses: {
        create: {
          role: 'STUDENT',
          course: {
            connect: { id: course.id }
          }
        }
      }
    }
  })

  const hannah = await prisma.user.create({
    data: {
      email: 'hannah@example.com',
      firstName: 'hannah',
      lastName: 'parks',
      social: {
        facebook: 'hannahbanana'
      },
      courses: {
        create: {
          role: 'STUDENT',
          course: {
            connect: { id: course.id }
          }
        }
      }
    }
  })

// * Test Results
  const davidTestResults = [800, 950, 700]
  const saraTestResults = [600, 750, 775]
  const hannahTestResults = [900, 850, 950]

  let counter = 0
  for (const test of course.tests) {
    await prisma.testResult.create({
      data: {
        gradedBy: { 
          connect: { id: grace.id }
        },
        student: {
          connect: { id: david.id }
        },
        test: {
          connect: { id: test.id },
        },
        result: davidTestResults[counter]
      }
    })

    await prisma.testResult.create({
      data: {
        gradedBy: { 
          connect: { id: grace.id }
        },
        student: {
          connect: { id: sara.id }
        },
        test: {
          connect: { id: test.id },
        },
        result: saraTestResults[counter]
      }
    })

    await prisma.testResult.create({
      data: {
        gradedBy: { 
          connect: { id: grace.id }
        },
        student: {
          connect: { id: hannah.id }
        },
        test: {
          connect: { id: test.id },
        },
        result: hannahTestResults[counter]
      }
    })

    counter++;
  }

  // * Aggregating the test results
for (const test of course.tests) {
  const results = await prisma.testResult.aggregate({
    where: {
      testId: test.id
    },
    _avg: { result: true },
    _min: { result: true },
    _max: { result: true },
    _count: true
  })
  console.log(`test: ${test.name} (id: ${test.id})`, results)
}

// * Aggregating the test results per student
const davidAggregates = await prisma.testResult.aggregate({
  where: {
    student: { email: david.email }
  },
  _avg: { result: true },
  _min: { result: true },
  _max: { result: true },
  _count: true
})
console.log(`David's results (email: ${david.email})`, davidAggregates)


const saraAggregates = await prisma.testResult.aggregate({
  where: {
    student: { email: sara.email }
  },
  _avg: { result: true },
  _min: { result: true },
  _max: { result: true },
  _count: true
})
console.log(`sara's results (email: ${sara.email})`, saraAggregates)


const hannahAggregates = await prisma.testResult.aggregate({
  where: {
    student: { email: hannah.email }
  },
  _avg: { result: true },
  _min: { result: true },
  _max: { result: true },
  _count: true
})
console.log( `hannah's results (email: ${hannah.email})`, hannahAggregates)

}




main()
  .catch((e: Error) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Disconnect Prisma Client
    await prisma.$disconnect();
  });
