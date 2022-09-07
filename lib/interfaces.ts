export interface ICountryCurrency {
  country: string;
  iso: string;
  currency: string;
  symbol: string;
}

export interface ICountry {
  name: string;
  iso: string;
}

export interface ICountryCurrencyList {
  countries: ICountry[];
  currency: string;
  symbol: string;
}

export interface IDBItem {
  country: string;
  iso: string;
  currency: string;
  symbol: string;
}
