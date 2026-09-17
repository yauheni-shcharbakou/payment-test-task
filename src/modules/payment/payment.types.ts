export interface IPaymentCreate {
  userId: number;
  itemId: number;
}

export interface IPaymentResult {
  success: boolean;
  remainingBalance: number;
}
