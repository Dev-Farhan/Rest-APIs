import express from 'express';
const router = express.Router();
import * as userController from "../controller/userController.js"

router.post("/save",userController.save);

router.get("/fetch",userController.fetch);

router.delete("/delete/:id",userController.deleteUser);

router.patch("/update",userController.updateUser)

router.post("/login",userController.login)

export default router;