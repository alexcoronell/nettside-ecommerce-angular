export interface ItemResult<T> {
  data: T;
  statusCode: number;
  message?: string;
}
