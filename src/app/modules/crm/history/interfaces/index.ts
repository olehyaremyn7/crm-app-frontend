import { Nullable } from '../../../../shared/interfaces';

export interface Filter {
  order?: number;
  start?: Nullable<Date>;
  end?: Nullable<Date>;
}

export interface DateRangeGroup {
  start: Nullable<Date>[];
  end: Nullable<Date>[];
}
