import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { ILink, LINK_STATUS } from '@/interfaces/link.interface';
import { LinkService } from '@/services/links.service';
import { RESPONSE_STATUS } from '@/exceptions/httpException';
import { LinkFilterDTO } from '@/dtos/links.dto';
import { PaginationDTO } from '@/dtos/pagination.dto';
import { ICustomer } from '@/interfaces/users.interface';
import { UserService } from '@/services/users.service';
export class LinkController {
  public link = Container.get(LinkService);
  public user = Container.get(UserService);

  public getLinks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body: LinkFilterDTO & PaginationDTO = req.body;
      body.limit = body.limit < 300 ? body.limit : 100;
      const findAllLinksData: { list: ILink[] } & PaginationDTO = await this.link.findALlLinks(body);
      res.status(RESPONSE_STATUS.OK).json({ data: findAllLinksData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
  public filterBy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body: LinkFilterDTO & PaginationDTO = req.body;
      // const pagination: PaginationDTO = extractPaginationDTO(req.body);
      const findAllLinksData: { list: ILink[] } & PaginationDTO = await this.link.findALlLinksByFilter(body);
      res.status(RESPONSE_STATUS.OK).json({ data: findAllLinksData, message: 'findAllByFilter' });
    } catch (error) {
      next(error);
    }
  };

  // public getUserById = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const userId: string = req.params.id;
  //     const findOneUserData: IUser = await this.user.findUserById(userId);

  //     res.status(200).json({ data: findOneUserData, message: 'findOne' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  public createLink = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const linkData: ILink & { owner: ICustomer | string } = req.body;
      linkData.status = LINK_STATUS.INQUEUE;

      const createCustomerData: ICustomer = await this.link.findOrCreateCustomer(linkData.owner);
      linkData.owner = createCustomerData;
      const createLinkData: ILink = await this.link.createLink(linkData);

      res.status(RESPONSE_STATUS.OK).json({ data: createLinkData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateLink = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const linkId: string = req.params.id;
      const userData: ILink = req.body;
      const updateUserData: ILink = await this.link.updateLink(linkId, userData);

      res.status(RESPONSE_STATUS.OK).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteLink = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const linkId: string = req.params.id;
      const deleteLinkData: ILink = await this.link.deleteLink(linkId);

      res.status(RESPONSE_STATUS.OK).json({ data: deleteLinkData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
