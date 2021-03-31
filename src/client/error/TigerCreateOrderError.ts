import { TigerCreateOrderRequest } from '../type/TigerCreateOrderRequest';

export class TigerCreateOrderError {
  constructor(
    public readonly request: TigerCreateOrderRequest,
    public readonly cause: Error,
  ) {}
}
