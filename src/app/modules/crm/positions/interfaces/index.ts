import { Response } from '../../../../shared/interfaces';
import { UserId } from '../../../authorization/interfaces';
import { CategoryId } from '../../categories/interfaces';

export interface Position {
  name: string;
  cost: number;
  user?: UserId;
  category: CategoryId;
  _id?: PositionId;
  quantity?: number;
}

export interface PositionsResponse extends Response {
  positions: Position[];
}

export interface PositionResponse extends Response {
  position: Position;
}

export type PositionId = string;
