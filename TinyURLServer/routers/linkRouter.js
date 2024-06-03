import express from 'express';
import linkController from '../controllers/linkController.js';

const LinkRouter = express.Router();

LinkRouter.post('/', linkController.createLink);
LinkRouter.get('/', linkController.getAllLinks); 
LinkRouter.get('/:id', linkController.getLink);
LinkRouter.put('/:id', linkController.updateLink);
LinkRouter.delete('/:id', linkController.deleteLink);
LinkRouter.get('/redirect/:id', linkController.redirectLink);
LinkRouter.get('/:id/clicks', linkController.getLinkClicks);


export default LinkRouter;
