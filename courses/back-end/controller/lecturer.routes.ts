
/**
 * @swagger
 *   components:
 *    schemas:
 *      Lecturer:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: int64
 *          user:
 *            $ref: '#/components/schemas/User'
 *          courses:
 *            type: array
 *            items:
 *            $ref: '#/components/schemas/Course'
 *          expertise:
 *            type: string
 *            description: Lecturer expertise.
 *      LecturerInput:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: int64  
 *          userId:
 *            type: number
 *            format: int64 
 *            description: Id of the author we should already have an author id to link the book to it 
 *          courses:
*             type: array
*             items:
*                type: number
*                format: int64
*                description: course ids, we should already have the courses id to link the lecturer to it
 *          expertise:
 *            type: string
 *            description: Book title
 */
import express, { Request, Response } from 'express';
import lecturerService from '../service/lecturer.service';
import { CourseInput, LecturerInput } from '../types';

const lecturerRouter = express.Router();

/**
 * @swagger
 * /lecturer:
 *   get:
 *     summary: Get a list of all lecturers.
 *     responses:
 *       200:
 *         description: A list of lecturers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Lecturer'
 */
lecturerRouter.get('/', async (req: Request, res: Response) => {
    try {
        const lecturers = await lecturerService.getAllLecturers();
        res.status(200).json(lecturers);
        console.log(lecturers)
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
* @swagger
* /lecturer:
*   post:
*     security:
*       - bearerAuth: []
*     summary: Add a lecturer
*     requestBody: 
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/LecturerInput'
*     responses:
*       200:
*         description: The new lecturer
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Lecturer'
*       404:
*         description: Error
*/

lecturerRouter.post("/",async(req:Request, res: Response) =>{
    const newLecturer =req.body
    try {
        const lecturer = await lecturerService.addLecturer(newLecturer)
        res.status(200).json(lecturer)
    } catch (error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})


/**
* @swagger
* /lecturer/{id}:
*   get:
*     security:
*       - bearerAuth: []
*     summary: Get an lecturer by id.
*     responses:
*       200:
*         description: Returns an lecturer, if not then an error is returned 
*         content:
*           application/json:
*             schema:
*                $ref: '#/components/schemas/Lecturer'
*     parameters :
*        - name: id
*          in: path
*          description: id of the lecturer
*          required: true
*          type: integer
*          format: int64    
*    
*/
lecturerRouter.get("/:id",async (req:Request, res:Response) =>{
    try{
        const id:number = parseInt(req.params.id)
        const lecturer = await lecturerService.getLecturerById({id: id});
        res.status(200).json(lecturer)
    }catch(error){
        res.status(500).json({status:'error', errorMessage: error.message})
    }
})

/**
 * @swagger
 * /lecturer/course:
 *   post:
 *      summary: add Courses to a lecturer.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Course'
 *      responses:
 *         200:
 *            description: The schedule with all enrolled students.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Lecturer'
 */
lecturerRouter.post('/course', async (req: Request, res: Response) => {
    try {
        const lecturer: LecturerInput = req.body;
        const courses: CourseInput[] = req.body;
        const result = await lecturerService.addCoursesToLecturer(lecturer, courses);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});
/**

const addCoursesToLecturer = async (lecturer, courses):*/

export { lecturerRouter };
