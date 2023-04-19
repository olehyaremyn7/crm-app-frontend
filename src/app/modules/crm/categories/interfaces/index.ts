import { Response } from '../../../../shared/interfaces';
import { UserId } from '../../../authorization/interfaces';

export interface Category {
  name: string;
  imagePath?: string;
  positions: number;
  user?: UserId;
  _id?: CategoryId;
}

export interface CategoryResponse extends Response {
  category: Category;
}

export interface CategoriesResponse extends Response {
  categories: Category[];
}

export enum ImageFormats {
  PNG = 'image/png',
  JPEG = 'image/jpeg',
  JPG = 'image/jpg',
}

export enum Sizes {
  BYTES = 'Bytes',
  KB = 'KB',
  MB = 'MB',
  GB = 'GB',
  TB = 'TB',
}

export type CategoryId = string;
