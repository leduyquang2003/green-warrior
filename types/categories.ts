export type TGetCategoriesResponse = {
  id: string;
  code: string;
  name: string;
  createdDate: string;
  creator: string;
  status: number;
};

export type TCreateCategoryBody = {
  name: string;
  status: number;
};

export interface ICreateCategoryForm {
  name: string;
  status?: boolean;
  id?: string;
}
