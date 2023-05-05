export interface IInvoiceInputDTO {
  id: number,
  customerName: string,
  productName: string,
  productQty: number,
  productPrice: number,
  total: number,
  date: Date;
  deleted: boolean;
}
