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

const router = express.Router();

router.get("/users", authMiddleware, getUsersController);

router.get("/users/:id", authMiddleware, getUserByIdController);

router.post("/users", authMiddleware, createUserController);

router.patch("/users/:id/name", authMiddleware, updateNameController);

router.patch("/users/:id/password", authMiddleware, updatePasswordController);

router.patch("/users/:id/role", authMiddleware, updateRoleController);

router.delete("/users/:id", authMiddleware, deleteUserController);

export default router;