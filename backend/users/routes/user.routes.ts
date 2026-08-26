import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { 
    createUserController, 
    deleteUserController, 
    getUserByIdController, 
    getUsersController,
    updateFCMTokenController,
    updateIsActiveController,
    updateNameController,
    updatePhoneNumberController,
    updateRoleController
} from "../controllers/user.controller";
import adminMiddleware from "../middlewares/admin.middleware";


const router = express.Router();


router.get("/users", authMiddleware, getUsersController);

router.get("/users/:id", authMiddleware, getUserByIdController);

router.post("/users", authMiddleware, createUserController);

router.patch("/users/:id/name", authMiddleware, updateNameController);

router.patch("/users/:id/phonenumber", authMiddleware, updatePhoneNumberController);

router.patch("/users/:id/fcmtoken", authMiddleware, updateFCMTokenController);

router.patch("/users/:id/isactive", authMiddleware, updateIsActiveController);

router.patch("/users/:id/role", authMiddleware, adminMiddleware, updateRoleController);

router.delete("/users/:id", authMiddleware, deleteUserController);

export default router;