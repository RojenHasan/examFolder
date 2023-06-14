import { mapToCourse, mapToCourses } from '../../mapper/course.mapper';
import { CourseInput } from '../../types';
import { Prisma, database } from '../../util/database';
import { Course } from '../model/course';

const createCourse = async ({
    name,
    description,
    phase,
    credits,
}: CourseInput): Promise<Course> => {
    try {
        const coursePrisma = await database.course.create({
            data: {
                name,
                description,
                phase,
                credits,
            },
        });

        return Course.from(coursePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getCourseById= async({id}:{id: number}):
Promise<Course> =>{
    const course = await database.course.findUnique({
        where: {
            id:id
        }
    })
    if(!course){
        throw new Error(`Course with id ${id} couldn't be found`)
    }
    return mapToCourse(course)
}
const getAllCourses = async() : Promise<Course[]> => {
    const courses = await database.course.findMany({
        orderBy: {
            id: "asc"
        }
    })
    return mapToCourses(courses)
}


const updateCoures =  async ({id, name, description,phase,
    credits, createdAt, updatedAt}:
    {id: number, name: string, description: string,
    phase: number,credits: number, createdAt?: Date,updatedAt?: Date})
 : Promise<Course> =>{
    await getCourseById({id}) // Check if course exists by id 
    try{
        const course = await database.course.update({
                where: {
                    id
                },
                data: {
                    name, description, phase, credits,
                    createdAt, updatedAt
                },
        })
        return mapToCourse(course)

    }catch(error){
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new Error(`Course with name {${name}} already exists`) 
            }
        }
    }
   
}

export default {
    createCourse,getCourseById,getAllCourses, updateCoures
};
