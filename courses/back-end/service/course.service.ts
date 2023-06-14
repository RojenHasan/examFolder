import courseDb from "../domain/data-access/course.db"
import { Course } from "../domain/model/course"
import { CourseInput } from "../types";

const getCourseById =async({id}: {id: number}):
Promise<Course>=>
await courseDb.getCourseById({id: id})

const getAllCourses = async(): Promise<Course[]> =>
await courseDb.getAllCourses();

const addCourse = async({name,description,phase,credits}: {name: string,description: string,phase: number,credits: number}):
    Promise<Course> =>
    await courseDb.createCourse({name,description,phase,credits})

export default {
    getAllCourses, getCourseById, addCourse
}

