export interface ICountryCurrencyPhone {
  country: {
    names: string[];
    alpha2: string;
    alpha3: string;
  };
  currency: {
    name: string;
    alpha3: string;
    symbol: string;
  };
  phoneCodes: string[];
}
