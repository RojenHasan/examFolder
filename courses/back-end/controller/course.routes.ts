/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Course:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Course name.
 *            description:
 *              type: string
 *              description: Course description.
 *            phase:
 *              type: number
 *              description: Course name.
 *            credits:
 *              type: number
 *              description: Course credits.
 *      CourseInput:
 *         type: object
 *         properties:
 *            id:
 *              type: number
 *              format: int64
 *              required: false
 *            name:
 *              type: string
 *              description: Course name.
 *              required: true
 *            description:
 *              type: string
 *              description: Course description.
 *              required: true
 *            phase:
 *              type: number
 *              description: Course name.
 *              required: true
 *            credits:
 *              type: number
 *              description: Course credits.
 *              required: true
 *         
 * 
 */
import express, { Request, Response } from 'express';
import courseService from '../service/course.service';

const courseRouter = express.Router();

/**
* @swagger
* /course/{id}:
*   get:
*     security:
*       - bearerAuth: []
*     summary: Get a country by id.
*     responses:
*       200:
*         description: Returns a country, if not then an error is returned 
*         content:
*           application/json:
*             schema:
*                $ref: '#/components/schemas/Course'
*     parameters :
*        - name: id
*          in: path
*          description: id of the country
*          required: true
*          type: integer
*          format: int64    
*    
*/
courseRouter.get("/:id",async (req:Request, res:Response) =>{
    try{
        const int:number = parseInt(req.params.id)
        const course = await courseService.getCourseById({id: int});
        res.status(200).json(course)
    }catch(error){
        res.status(500).json({status:'error', errorMessage: error.message})
    }
})

/**
* @swagger
* /course:
*   post:
*     security:
*       - bearerAuth: []
*     summary: Add a course
*     requestBody: 
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/CourseInput'
*     responses:
*       200:
*         description: The new course
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Course'
*       404:
*         description: Error
*/

courseRouter.post("/",async(req:Request, res: Response) =>{
    const newCourse = req.body
    try {
        const category = await courseService.addCourse(newCourse)
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})


/**
*  @swagger
* /course:
*   get:
*     security:
*       - bearerAuth: []
*     summary: Get list of courses.
*     responses:
*       200:
*         description: List of all courses
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Course'
*       404:
*         description: Error
*    
*/
courseRouter.get("/",async (req:Request, res:Response) =>{
    try{
        const courses = await courseService.getAllCourses();
        res.status(200).json(courses)
        console.log(courses)
    }catch(error){
        res.status(500).json({status:'error', errorMessage: error.message})
    }
})

export { courseRouter };
