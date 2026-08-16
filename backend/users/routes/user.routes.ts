import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { 
    createUserController, 
    deleteUserController, 
    getUserByIdController, 
    getUsersController,
    updateNameController,
    updatePasswordController,
    updateRoleController
} from "../controllers/user.controller";
import adminMiddleware from "../middlewares/admin.middleware";


const router = express.Router();

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     description: Returns all users. If an email query parameter is provided, returns the user associated with that email.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: email
 *         required: false
 *         schema:
 *           type: string
 *           format: email
 *         description: Filter users by email.
 *         example: adam@example.com
 *
 *     responses:
 *       200:
 *         description: Users successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Successfully Extracted All Users
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *
 *       401:
 *         description: Authentication failed
 *
 *       404:
 *         description: User with the specified email was not found
 *
 *       500:
 *         description: Internal server error
 */
router.get("/users", authMiddleware, getUsersController);


/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Returns a single user using the user's unique ID.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique user ID.
 *         example: "USR-550e8400-e29b-41d4-a716-446655440000"
 *
 *     responses:
 *       200:
 *         description: User successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Successfully found the user!
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *
 *       401:
 *         description: Authentication failed
 *
 *       404:
 *         description: User not found
 *
 *       500:
 *         description: Internal server error
 */
router.get("/users/:id", authMiddleware, getUserByIdController);


/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user account.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *
 *     responses:
 *       201:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Successfully Created the User!
 *
 *       400:
 *         description: Unable to create user
 *
 *       401:
 *         description: Authentication failed
 *
 *       500:
 *         description: Internal server error
 */
router.post("/users", authMiddleware, createUserController);


/**
 * @swagger
 * /api/v1/users/{id}/name:
 *   patch:
 *     summary: Update user name
 *     description: Updates the name of an existing user.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique user ID.
 *         example: "USR-550e8400-e29b-41d4-a716-446655440000"
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateName'
 *
 *     responses:
 *       200:
 *         description: User name successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Successfully Updated the name
 *
 *       400:
 *         description: Unable to update user name
 *
 *       401:
 *         description: Authentication failed
 *
 *       500:
 *         description: Internal server error
 */
router.patch("/users/:id/name", authMiddleware, updateNameController);


/**
 * @swagger
 * /api/v1/users/{id}/password:
 *   patch:
 *     summary: Update user password
 *     description: Updates the password of an existing user.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique user ID.
 *         example: "USR-550e8400-e29b-41d4-a716-446655440000"
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePassword'
 *
 *     responses:
 *       200:
 *         description: Password successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Successfully Updated the Password!
 *
 *       400:
 *         description: Unable to update password
 *
 *       401:
 *         description: Authentication failed
 *
 *       500:
 *         description: Internal server error
 */
router.patch("/users/:id/password", authMiddleware, updatePasswordController);


/**
 * @swagger
 * /api/v1/users/{id}/role:
 *   patch:
 *     summary: Update user role
 *     description: Updates a user's role. Only administrators are allowed to perform this operation.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique user ID.
 *         example: "USR-550e8400-e29b-41d4-a716-446655440000"
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRole'
 *
 *     responses:
 *       200:
 *         description: User role successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Successfully Update the Role for the User!
 *
 *       400:
 *         description: Unable to update role
 *
 *       401:
 *         description: Authentication failed
 *
 *       403:
 *         description: Administrator access required
 *
 *       500:
 *         description: Internal server error
 */
router.patch("/users/:id/role", authMiddleware, adminMiddleware, updateRoleController);


/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete user
 *     description: Deletes an existing user by ID.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique user ID.
 *         example: "USR-550e8400-e29b-41d4-a716-446655440000"
 *
 *     responses:
 *       200:
 *         description: User successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Successfully deleted the User!
 *
 *       400:
 *         description: Unable to delete user
 *
 *       401:
 *         description: Authentication failed
 *
 *       500:
 *         description: Internal server error
 */
router.delete("/users/:id", authMiddleware, deleteUserController);

export default router;