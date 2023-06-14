import { mapToStudent } from '../../mapper/student.mapper';
import userService from '../../service/user.service';
import { StudentInput } from '../../types';
import { Prisma, database } from '../../util/database';
import { Student } from '../model/student';

const getAllStudents = async (): Promise<Student[]> => {
    try {
        const studentsPrisma = 
        await database.student.findMany({
             include: { user: true } 
            });
        return studentsPrisma.map((studentPrisma) => 
        Student.from(studentPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('DB error!');
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

const addStudent = async (
    {userId,studentnumber}: 
    {userId:number,studentnumber:string}): 
    Promise<Student> => {
       /* if(userService.getUserById({id: userId})){
            throw new Error (`user with ${userId} does not exist` )
        }*/
    try {
        const studentPrisma = await database.student.create({
            data:{
                user:{
                    connect:{id:userId}
                },
                studentnumber:studentnumber,
                
            },
            include:{
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
