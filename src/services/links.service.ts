import { Service } from 'typedi';
import { HttpException, RESPONSE_STATUS } from '@exceptions/httpException';
import { LinkModel } from '@/models/link.model';
import { ILink, LINK_STATUS } from '@/interfaces/link.interface';
import { LinkFilterDTO } from '@/dtos/links.dto';
import { PaginationDTO } from '@/dtos/pagination.dto';
import { ICustomer } from '@/interfaces/users.interface';
import { CustomerModel } from '@/models/users.model';

@Service()
export class LinkService {
  public async findALlLinks(filter: LinkFilterDTO & PaginationDTO): Promise<{ list: ILink[] } & PaginationDTO> {
    // LinkModel.updateMany({}, { $set: { status: '2' } }, { limit: 100 }, (err, result) => {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     console.log(`${result.nModified} documents updated.`);
    //   }
    // });
    const linksList: ILink[] = await LinkModel.find({ status: LINK_STATUS.APPROVED }).limit(filter.limit);
    const totalNumber: number = await LinkModel.countDocuments({ status: LINK_STATUS.APPROVED });
    const pagination: PaginationDTO = new PaginationDTO();
    pagination.total = totalNumber;
    pagination.limit = filter.limit;
    pagination.page = filter.page;

    if (!(linksList.length > 0)) throw new HttpException(RESPONSE_STATUS.NotFound, 'No result  found');

    return { list: linksList, ...pagination };
  }
  public async findLinkById(linkId: string): Promise<ILink> {
    const findLink: ILink = await LinkModel.findOne({ _id: linkId });
    if (!findLink) throw new HttpException(409, "ILink doesn't exist");

    return findLink;
  }
  public async findALlLinksByFilter(filter: LinkFilterDTO & PaginationDTO): Promise<{ list: ILink[] } & PaginationDTO> {
    const query = {
      $and: [
        { status: LINK_STATUS.APPROVED },
        { name: { $regex: filter.name, $options: 'i' } },
        // { tags: { $in: filter.tags } },
        // { description: filter.description },
      ],
    };
    const linksList: ILink[] = await LinkModel.find(query).limit(filter.limit);
    const totalNumber: number = await LinkModel.countDocuments(query);
    const pagination: PaginationDTO = new PaginationDTO();
    pagination.total = totalNumber;
    pagination.limit = filter.limit;
    pagination.page = filter.page;

    if (!(linksList.length > 0)) throw new HttpException(RESPONSE_STATUS.NotFound, 'No result  found');

    return { list: linksList, ...pagination };
  }

  public async createLink(linkData: ILink): Promise<ILink> {
    const findLink: ILink = await LinkModel.findOne({ url: linkData.url });
    if (findLink) {
      if (findLink.status === LINK_STATUS.INREVIEW)
        throw new HttpException(RESPONSE_STATUS.NotAcceptable, `This URL under ${linkData.name} name is under review.`);
      if (findLink.status === LINK_STATUS.INQUEUE)
        throw new HttpException(RESPONSE_STATUS.NotAcceptable, `This URL under ${linkData.name} name is in queue.`);
      if (findLink.status === LINK_STATUS.REJECTED)
        throw new HttpException(RESPONSE_STATUS.NotAcceptable, `This URL under ${linkData.name} name has been rejected.`);
      // if (findLink.status === LINK_STATUS.APPROVED)
      // should call payment service here to extending the subsicrption

      // throw new HttpException(409, `This URL ${linkData.url} already exists`);
    }
    const formatedLink: ILink = linkData;
    formatedLink.customer = linkData.owner;
    const createdLink: ILink = await LinkModel.create(linkData);

    return createdLink;
  }
  public async findOrCreateCustomer(customerData: ICustomer): Promise<ICustomer> {
    const findCustomer: ICustomer = await CustomerModel.findOne({ email: customerData.email });

    if (findCustomer) {
      return findCustomer;
    }

    const createdCustomer: ICustomer = await CustomerModel.create(customerData);

    return createdCustomer;
  }

  public async updateLink(linkId: string, linkData: ILink): Promise<ILink> {
    const updateUserById: ILink = await LinkModel.findByIdAndUpdate(linkId, linkData, { new: true });
    if (!updateUserById) throw new HttpException(RESPONSE_STATUS.NotFound, "Link doesn't exist");

    return updateUserById;
  }

  public async deleteLink(linkId: string): Promise<ILink> {
    const deleteLinkById: ILink = await LinkModel.findByIdAndDelete(linkId);
    if (!deleteLinkById) throw new HttpException(RESPONSE_STATUS.DoesNotExist, "Link doesn't exist");

    return deleteLinkById;
  }
}
