import express from 'express';
import userController from '../controllers/userController.js';

const UserRouter = express.Router();

UserRouter.post('/', userController.createUser);
UserRouter.get('/', userController.getAllUsers); 
UserRouter.get('/:id', userController.getUser);
UserRouter.put('/:id', userController.updateUser);
UserRouter.delete('/:id', userController.deleteUser);
UserRouter.get('/:id/links', userController.getUserLinks);

export default UserRouter;
