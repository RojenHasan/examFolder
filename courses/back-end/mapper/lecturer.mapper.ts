import { Course } from "../domain/model/course";
import { Lecturer } from "../domain/model/lecturer";
import { UserPrisma,LecturerPrisma, CoursePrisma } from "../util/database";
import { mapToCourses } from "./course.mapper";
import { mapToUser } from "./user.mapper";
/*
const mapToLecturer = 
({user, expertise,courses}: LecturerPrisma &
    {user: UserPrisma} & {courses: CoursePrisma[]}):
Lecturer => 
Lecturer.create( 
    mapToUser(user), expertise, mapToCourses() )



const mapToLecturers = (lecturerPrisma :LecturerPrisma[]):
Lecturer[] =>
lecturerPrisma.map(Lecturer.from)

export {mapToLecturer, mapToLecturers}*/