import { PetExp } from "@prisma/client";

export class UserListDto {
  state?: string;
  petExp?: PetExp;
  name?: string;
  email?: string;
  limit?: number;
  offset?: number;
}

export class UserListResponseItem {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  state: string;
  petExp: PetExp;
}

export class UserListResponse {
  items: UserListResponseItem[];
  pagination: {
    perPage: number;
    totalPage: number;
    currentPage: number;
  }
}