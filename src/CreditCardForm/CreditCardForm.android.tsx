import {
  PaymentData,
  Configuration,
  PaymentJsonData,
  DetailsOfPayment,
} from '../types';
import { NativeModules } from 'react-native';

const { CreditCardForm: CreditCardFormManager } = NativeModules;

class CreditCardForm {
  private static instance: CreditCardForm;

  private constructor(paymentData: PaymentData, jsonData?: PaymentJsonData) {
    const jsonDataString = jsonData && JSON.stringify(jsonData);
    CreditCardFormManager.initialPaymentData(paymentData, jsonDataString);
  }

  public static initialPaymentData(
    paymentData: PaymentData,
    jsonData?: PaymentJsonData
  ): CreditCardForm {
    if (!CreditCardForm.instance) {
      CreditCardForm.instance = new CreditCardForm(paymentData, jsonData);
    }

    return CreditCardForm.instance;
  }

  public setDetailsOfPayment(details: DetailsOfPayment): void {
    CreditCardFormManager.setDetailsOfPayment(details);
  }

  public showCreditCardForm = async ({
    disableGPay,
    useDualMessagePayment,
    disableYandexPay,
    yandexPayMerchantID,
  }: Configuration): Promise<number> => {
    const transactionId: number =
      await CreditCardFormManager.showCreditCardForm({
        disableGPay,
        useDualMessagePayment,
        disableYandexPay,
        yandexPayMerchantID,
      });
    return transactionId;
  };
}

export default CreditCardForm;
