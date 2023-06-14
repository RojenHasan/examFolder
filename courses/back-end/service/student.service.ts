import studentDb from '../domain/data-access/student.db';
import { Student } from '../domain/model/student';
import { StudentInput } from '../types';

const getAllStudents = async (): Promise<Student[]> => 
studentDb.getAllStudents();

const getStudentById = async({id}: {id: number}): Promise<Student> =>
studentDb.getStudentById({id: id})

const addStudent = async ({userId,studentnumber, scheduleId}: StudentInput):
    Promise<Student> => 
    await studentDb.addStudent({userId,studentnumber,
        scheduleId})
export default { getAllStudents , getStudentById, addStudent};
