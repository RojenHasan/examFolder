/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Student:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            user:
 *              $ref: '#/components/schemas/User'
 *            studentnumber:
 *              type: string
 *              description: Student number.
 *            lecturerId:
 *              $ref: '#/components/schemas/Schedule'
 *      StudentInput:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64 
 *             description: Id of the
 *           user:
 *             type: number
 *             format: int64 
 *             description: Id of the
 *           studentnumber:
 *             type: string
 *             description: Student number.
 *           lecturerId:
 *             type: number
 *             format: int64 
 *             description: Id of the
 */
import express, { Request, Response } from 'express';
import studentService from '../service/student.service';
import { StudentInput } from '../types';

const studentRouter = express.Router();

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get a list of all students.
 *     responses:
 *       200:
 *         description: A list of students.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Student'
 */
studentRouter.get('/', async (req: Request, res: Response) => {
    try {
        const students = await studentService.getAllStudents();
        res.status(200).json(students);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});
/**
* @swagger
* /student:
*   post:
*     security:
*       - bearerAuth: []
*     summary: Add a student
*     requestBody: 
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/StudentInput'
*     responses:
*       200:
*         description: The new student
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Student'
*       404:
*         description: Error
*/

studentRouter.post("/",async(req:Request, res: Response) =>{
    const newStudent =<StudentInput> req.body
    try {
        const student = await studentService.addStudent(newStudent)
        res.status(200).json(student)
    } catch (error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})
/**
* @swagger
* /student/{id}:
*   get:
*     security:
*       - bearerAuth: []
*     summary: Get an student by id.
*     responses:
*       200:
*         description: Returns an student, if not then an error is returned 
*         content:
*           application/json:
*             schema:
*                $ref: '#/components/schemas/Student'
*     parameters :
*        - name: id
*          in: path
*          description: id of the student
*          required: true
*          type: integer
*          format: int64    
*    
*/
studentRouter.get("/:id",async (req:Request, res:Response) =>{
    try{
        const id:number = parseInt(req.params.id)
        const student = await studentService.getStudentById({id: id});
        res.status(200).json(student)
    }catch(error){
        res.status(500).json({status:'error', errorMessage: error.message})
    }
})

export { studentRouter };
