import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { getTotalPrice } from '../../../../shared/utils.ts';
import { PositionId } from '../../positions/interfaces';
import { Order, OrderPosition } from '../interfaces/order';

@Injectable()
export class CartService {
  private _orderPositions$ = new BehaviorSubject<OrderPosition[]>([]);
  private _price = 0;

  public add({ name, cost, quantity, _id }: OrderPosition): void {
    const orderPosition: OrderPosition = Object.assign(
      {},
      {
        name,
        cost,
        quantity,
        _id,
      },
    );

    const orderPositions = this._orderPositions$.value;
    const candidate = orderPositions.find(({ _id: id }) => id === _id);

    if (candidate) {
      candidate.quantity += quantity;
    } else {
      orderPositions.push(orderPosition);
    }

    this._orderPositions$.next(orderPositions);
    this.totalPrice();
  }

  public remove(id: PositionId): void {
    const orderPositions = this._orderPositions$.value.filter(({ _id }) => _id !== id);

    this._orderPositions$.next(orderPositions);
    this.totalPrice();
  }

  public clear(): void {
    this._orderPositions$.next([]);
    this._price = 0;
  }

  public prepare(): Order {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const list = this._orderPositions$.value.map(({ _id: _, ...position }) => ({ ...position }));

    return {
      list,
    };
  }

  private totalPrice(): void {
    this._price = getTotalPrice(this._orderPositions$.value);
  }

  public get orderPositions$(): Observable<OrderPosition[]> {
    return this._orderPositions$.asObservable();
  }

  public get price(): number {
    return this._price;
  }

  public get isOrderPositions(): boolean {
    return !!this._orderPositions$.value.length;
  }
}
