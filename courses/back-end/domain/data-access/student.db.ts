import { mapToStudent } from '../../mapper/student.mapper';
import { StudentInput } from '../../types';
import { Prisma, database } from '../../util/database';
import { Student } from '../model/student';

const getAllStudents = async (): Promise<Student[]> => {
    try {
        const studentsPrisma = await database.student.findMany({ include: { user: true } });
        return studentsPrisma.map((studentPrisma) => Student.from(studentPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getStudentById  = async({id} : {id : number}): Promise<Student> =>{
    try {
        const student= await database.student.findUnique({
            where: {id: id},
            include :{user: true}
        })
        return mapToStudent(student)
    }catch(error){
        throw new Error(`student with id {${id}} couldn't be found`)
    }
}

const addStudent = async ({userId,studentnumber, scheduleId}: 
    {userId:number,studentnumber:string,scheduleId: number}): 
    Promise<Student> => {
    try {
        const studentPrisma = await database.student.create({
            data:{
                user:{
                    connect:{id:userId}
                },
                studentnumber:studentnumber,
                schedule:{
                    connect:{id:scheduleId}
                },
                
            },
            include:{
                schedule: true,
                user:true
            }
        });
        return mapToStudent(studentPrisma)
    }catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new Error(`Author with name  already exists`) 
            }
        }
    }
};
export default {
    getAllStudents,getStudentById, addStudent
}
