import { Course as CoursePrisma } from '@prisma/client';
import { CoursePrisma as prismaCourse} from "../util/database";
import { Course } from '../domain/model/course';


const mapToCourse = ({name,description,phase, credits,
    createdAt, updatedAt, id}:  CoursePrisma): 
Course => Course.create(name,description,phase, credits,
    createdAt, updatedAt, id)


const mapToCourses = (coursePrisma: CoursePrisma[]): 
Course[]  =>  coursePrisma.map(mapToCourse)
//coursePrisma.map(Course.from)

export {
    mapToCourse, mapToCourses
}