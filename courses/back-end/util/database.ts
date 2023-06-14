import { PrismaClient,Prisma } from '@prisma/client';

const database = new PrismaClient();

type CoursePrisma = Prisma.CourseGetPayload<{

}>
type SchedulePrisma  = Prisma.ScheduleGetPayload<{
    include:{lecturer:{include:{user:true}}}
}>
type LecturerPrisma  = Prisma.LecturerGetPayload<{
}>
type UserPrisma  = Prisma.UserGetPayload<{

}>
type StudentPrisma  = Prisma.StudentGetPayload<{
    //include:{user:true}  
}>
export {database,Prisma, SchedulePrisma, 
   CoursePrisma, LecturerPrisma, UserPrisma, StudentPrisma};
