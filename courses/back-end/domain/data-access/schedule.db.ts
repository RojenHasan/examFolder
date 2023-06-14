import { ScheduleInput, StudentInput } from '../../types';
import { database, Prisma } from '../../util/database';
import { Schedule } from '../model/schedule';
import { Student } from '../model/student';
import { Course } from '../model/course';
import { Lecturer } from '../model/lecturer';
//import { mapToSchedule } from '../../mapper/schedule.mapper';

const addSchedule = async(
    {start,end, courseId, lecturerId, studentsId}:
    {start: Date, end: Date, courseId?: number, lecturerId?: number, studentsId?: number[]}): 
    Promise<Schedule> => {
            try {
                const schedulePrisma = await database.schedule.create({
                 data :{
                    start,end,
                    course:{
                        connect:{id:courseId}
                    },
                    lecturer:{
                        connect:{id:lecturerId}
                    },
                    students:{ 
                        connect: studentsId.map((studentId) =>
                         ({ id: studentId })),
                    },
                 },
                 include: {
                    course: true,
                    lecturer:  {include : {user:true}},
                    students:  {include : {user:true}}
                 }, 
                });
                return Schedule.from(schedulePrisma)
            }catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new Error(`Lecturere with id {${lecturerId}} already exist`) 
                    }
                }
                throw new Error(error.message) 
            }
        }


const getAllSchedules = async (): Promise<Schedule[]> => 
{
    try {
        const schedulesPrisma = await database.schedule.findMany({
            include: {
                course: true,
                lecturer: { include: { user: true } },
                students: { include: { user: true } },
            },
        });
        return schedulesPrisma.map((schedulePrisma) => Schedule.from(schedulePrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getScheduleById = async ({ id }: { id: number }): Promise<Schedule> => {
    try {
        const schedulePrisma = await database.schedule.findUnique({
            where: { id },
            include: {
                course: true,
                lecturer: { include: { user: true } },
                students: { include: { user: true } },
            },
        });
        return Schedule.from(schedulePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const addStudentsToSchedule = async ({
    schedule,
    students,
}: {
    schedule: ScheduleInput;
    students: StudentInput[];
}): Promise<Schedule> => {
    try {
        await database.schedule.update({
            where: {
                id: schedule.id,
            },
            data: {
                students: {
                    connect: students.map((student) => ({ id: student.id })),
                },
            },
        });
        return getScheduleById({ id: schedule.id });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
const deleteScheduleById = async ({id}: {id:number}) :  Promise<Schedule> => {
    await getScheduleById({id:id})  // Check if Schedule exists by id
    const deleteSchedule = await database.schedule.delete({
        where: {
          id: id,
        },include : {
            lecturer: { include: { user: true } },
            students: { include: { user: true } },
            course: true
        }
      })
      return Schedule.from(deleteSchedule)
}

const updateSchedule= async ({ id, start, end, courseId, lecturerId, studentsId}:
    {
    id: number,
    start: Date,
    end: Date,
    courseId?: number,
    lecturerId?: number;
    studentsId?: number[]
}):Promise<Schedule> => {
      try {
        const schedulePrisma = await database.schedule.update({
            where: {
              id:id
            },
            data: {
                start: start,
                end: end,
                course:{
                    connect:{
                        id : courseId
                    }
                },
                lecturer:{
                    connect:{
                        id : lecturerId
                    }
                },
                students:{
                    set:[],
                    connect:studentsId.map((studentId) => ({ id: studentId }))
                }
            },
            include:{
                students: {include : {user:true}},
                course: true,
                lecturer: {include : {user:true}}
            }});
        return Schedule.from(schedulePrisma)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new Error(`lecturer with id {${lecturerId}}`) 
            }
        }
        throw new Error(error.message)     }
}
export default {
    addStudentsToSchedule,
    getAllSchedules,
    getScheduleById,
    addSchedule, 
    deleteScheduleById,
    updateSchedule

};
