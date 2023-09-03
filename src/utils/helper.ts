import { PaginationDTO } from '@/dtos/pagination.dto';
import _ from 'lodash';

export const extractPaginationDTO = (obj: any): PaginationDTO => {
  const paginationDTO = new PaginationDTO();
  paginationDTO.page = obj.page;
  paginationDTO.limit = obj.limit;
  paginationDTO.total = obj.total;

  return paginationDTO;
};
