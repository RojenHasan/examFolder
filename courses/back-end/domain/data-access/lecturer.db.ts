import { userInfo } from 'os';
//import { mapToLecturer } from '../../mapper/lecturer.mapper';
import { CourseInput, LecturerInput } from '../../types';
import { Prisma, database } from '../../util/database';
import { Lecturer } from '../model/lecturer';

const getAllLecturers = async (): Promise<Lecturer[]> => {
    try {
        const lecturersPrisma = 
        await database.lecturer.findMany({
            include: { user: true, courses: true },
        });
        return lecturersPrisma.map((lecturerPrisma) => 
        Lecturer.from(lecturerPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('DB error!');
    }
};

const getLecturerById = async({id} :{id: number}): Promise<Lecturer> => {
    try {
        const lecturer = await database.lecturer.findUnique({
            where :{id: id},
            include :{user: true}
        })
        return Lecturer.from(lecturer)
    }catch(error){
        throw new Error(`Lecturer with id {${id}} could not be found`)
    }
}

const addLecturer = async (
    {userId,expertise, coursesId}:
    {userId:number, expertise:string,coursesId: number[]}):
     Promise<Lecturer> => {
        try {
        const lecturerPrisma = await database.lecturer.create({
            data:{
                expertise,
                user:{
                    connect:{id: userId}
               },
               courses:{ 
                connect: coursesId.map((coursesId) =>
                 ({ id: coursesId })),
            }
            }, 
            include:{
                user:true,
                courses: true
            }

        })
        return Lecturer.from(lecturerPrisma)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new Error(`Lecturer with name {${expertise}} already exists`) 
            }
        }
        throw new Error(error.message) 
    }

}


const addCoursesToLecturer = async ({
    lecturer,
    courses,
}: {
    lecturer: LecturerInput;
    courses: CourseInput[];
}): Promise<Lecturer> => {
    try {
        await database.lecturer.update({
            where: {
                id: lecturer.id,
            },
            data: {
                courses: {
                    connect: courses.map((course) => ({ id: course.id })),
                },
            },
        });
        return getLecturerById({ id: lecturer.id });
    } catch (error) {
        console.error(error);
        throw new Error('DB error!');
    }
};
 


export default {
    getAllLecturers,getLecturerById, addLecturer, addCoursesToLecturer
};
