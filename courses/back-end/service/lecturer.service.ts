import { Lecturer } from '../domain/model/lecturer';
import lecturerDB from '../domain/data-access/lecturer.db';
import { CourseInput, LecturerInput, UserInput } from '../types';
import courseService from './course.service';
import userService from './user.service';

const getAllLecturers = async (): Promise<Lecturer[]> => 
await lecturerDB.getAllLecturers();

const getLecturerById = async ({id} : {id: number}) : 
Promise<Lecturer> => await lecturerDB.getLecturerById({id: id})

/*const addLecturer = async ({
    userId, expertise, courses}:
    { userId:UserInput , expertise:LecturerInput, courses: CourseInput[] }):
    Promise<Lecturer> => 
    await lecturerDB.addLecturer({userId,expertise, courses})
*/
const addLecturer = async ({userId,expertise, coursesId}:
    {userId:number, expertise:string,coursesId: number[]}):Promise<Lecturer> =>{
    await handleLecturereInput({userId,expertise, coursesId})
    return await lecturerDB.addLecturer({userId,expertise, coursesId})
}

const addCoursesToLecturer = async ({lecturer, courses}: {lecturer: LecturerInput, courses: CourseInput[]}): Promise<Lecturer> => {
    if (!lecturer.id) throw new Error('Lecturer id is required');
    if (!courses.length) throw new Error('At least one courses is required');
    if (!lecturerDB.getLecturerById({ id: lecturer.id })) throw new Error('lecturer not found');

    return lecturerDB.addCoursesToLecturer({ lecturer, courses });
};

const handleLecturereInput = async ({userId,expertise, coursesId}: {userId:number, expertise:string,coursesId: number[]}) => {
    if(!expertise || expertise.trim() === ""){
        throw new Error("expertise can't be empty.")
    }
/*
    if(!user){
        throw new Error("user id can't be empty.")
    }


    if(!categoryIds || categoryIds.length === 0){
        throw new Error("Categories can't be empty.")
    }
*/
    // check if author exists
    await userService.getUserById({id: userId})


    // check if category ids exist
    for(let id=0; id<coursesId.length;id++){
        await courseService.getCourseById({id: coursesId[id]})
    }    
}
export default { getAllLecturers ,getLecturerById,addLecturer, addCoursesToLecturer};
