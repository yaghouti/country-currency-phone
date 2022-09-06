import * as fs from 'fs';
import { ICountry, ICountryCurrency, ICountryCurrencyList, IDBItem } from "./interfaces";

export class CountryCurrencyIso {
  private readonly countries: Map<string, string>;
  private readonly countryISOs: Map<string, string>;
  private readonly currencies: Map<string, string>;
  private readonly currencySymbols: Map<string, string>;
  private readonly country_currency: Map<string, string>;
  private readonly currency_countries: Map<string, Set<string>>;

  constructor() {
    this.loadDb();
  }

  public getByCountry(country: string): ICountryCurrency {
    const iso = this.countries.get(country);
    if (!iso) {
      return null;
    }
    const currency = this.country_currency.get(country);
    if (!currency) {
      return null;
    }
    const symbol = this.currencies.get(currency);
    return { country, iso, currency, symbol };
  }

  public getByISO(iso: string): ICountryCurrency {
    const country = this.countryISOs.get(iso);
    if (!country) {
      return null;
    }
    const currency = this.country_currency.get(country);
    const symbol = this.currencies.get(currency);
    return { country, iso, currency, symbol };
  }

  public getByCurrency(currency: string): ICountryCurrencyList {
    const symbol = this.currencies.get(currency);
    if (!symbol) {
      return null;
    }
    const countryNames = this.currency_countries.get(currency);
    const countries: ICountry[] = [];
    countryNames.forEach(country => {
      const countryCurrency = this.getByCountry(country);
      if (countryCurrency) {
        countries.push({ name: country, iso: countryCurrency.iso });
      }
    });
    return { countries, currency, symbol };
  }

  public getBySymbol(symbol: string): ICountryCurrencyList {
    const currency = this.currencySymbols.get(symbol);
    if (!currency) {
      return null;
    }
    const countryNames = this.currency_countries.get(currency);
    const countries: ICountry[] = [];
    countryNames.forEach(country => {
      const countryCurrency = this.getByCountry(country);
      if (countryCurrency) {
        countries.push({ name: country, iso: countryCurrency.iso });
      }
    });
    return { countries, currency, symbol };
  }

  public addToDB(item: IDBItem): void {
    this.countries.set(item.country, item.iso);
    this.countryISOs.set(item.iso, item.country);
    this.currencies.set(item.currency, item.symbol);
    this.currencySymbols.set(item.symbol, item.currency);
    this.country_currency.set(item.country, item.currency);
    const countries = this.currency_countries.get(item.currency);
    if (countries) {
      countries.add(item.country);
    } else {
      const countries = new Set<string>().add(item.country);
      this.currency_countries.set(item.currency, countries);
    }
  }

  private loadDb(): void {
    const countries = JSON.parse(fs.readFileSync('../db/countries.json', 'utf-8'));
    const currencies = JSON.parse(fs.readFileSync('../db/currencies.json', 'utf-8'));
    const country_currency = JSON.parse(fs.readFileSync('../db/country_currency.json', 'utf-8'));

    for (const country in countries) {
      this.countries.set(country, countries[country]);
      this.countryISOs.set(countries[country], country);
    }
    for (const currency in currencies) {
      this.currencies.set(currency, currencies[currency]);
      this.currencySymbols.set(currencies[currency], currency);
    }
    for (const cc in country_currency) {
      this.country_currency.set(cc, country_currency[cc]);

      const countries = this.currency_countries.get(country_currency[cc]);
      if (countries) {
        countries.add(cc);
      } else {
        const countries = new Set<string>().add(cc);
        this.currency_countries.set(country_currency[cc], countries);
      }
    }
  }
}

