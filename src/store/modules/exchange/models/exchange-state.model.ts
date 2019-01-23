import Exchange from '@/store/modules/exchange/models/exchange.model'
import ExchangeRequest from '@/store/modules/exchange/models/exchange-request.model'

export default interface ExchangeState {
  request: ExchangeRequest | null;
  rates: any;
  errorState: boolean;
  errorMessage: string;
}
