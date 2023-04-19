import { Category } from './index';

export interface CategoryFormModalProps {
  isEdit: boolean;
  category?: Category;
}

export interface CategoryFormModalResult {
  created?: boolean;
  edited?: boolean;
}
