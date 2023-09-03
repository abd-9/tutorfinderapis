import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { LinkController } from '@/controllers/links.controller';
import { CreateLinkDTO, LinkFilterDTO } from '@/dtos/links.dto';

export class LinkRoute implements Routes {
  public path = '/links';
  public router = Router();
  public link = new LinkController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.link.getLinks);
    this.router.post(`${this.path}/create`, ValidationMiddleware(CreateLinkDTO), this.link.createLink);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(CreateLinkDTO), this.link.updateLink);
    this.router.delete(`${this.path}/:id`, this.link.deleteLink);
    this.router.post(`${this.path}/filter`, ValidationMiddleware(LinkFilterDTO), this.link.filterBy);
  }
}
