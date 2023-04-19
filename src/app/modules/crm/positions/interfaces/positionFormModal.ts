import { Position } from './index';

export interface PositionFormModalResult {
  created?: boolean;
  edited?: boolean;
}

export interface PositionFormModalProps {
  isEdit: boolean;
  position?: Position;
}
