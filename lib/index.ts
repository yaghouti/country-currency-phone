import * as fs from 'fs';
import {
  ICountry,
  ICountryCurrency,
  ICountryCurrencyList,
  IDBItem,
} from './interfaces';

export class CountryCurrencyIso {
  private readonly countries: Map<string, string>;
  private readonly countryISOs: Map<string, Set<string>>;
  private readonly currencies: Map<string, string>;
  private readonly symbols: Map<string, string>;
  private readonly country_currency: Map<string, string>;
  private readonly currency_countries: Map<string, Set<string>>;

  constructor() {
    this.countries = new Map<string, string>();
    this.countryISOs = new Map<string, Set<string>>();
    this.currencies = new Map<string, string>();
    this.symbols = new Map<string, string>();
    this.country_currency = new Map<string, string>();
    this.currency_countries = new Map<string, Set<string>>();
    this.loadDb();
  }

  public getByCountry(country: string): ICountryCurrency | undefined {
    const iso = this.countries.get(country);
    if (!iso) {
      return;
    }
    const currency = this.country_currency.get(country) ?? '';
    const symbol = this.currencies.get(currency) ?? '';
    return { country, iso, currency, symbol };
  }

  public getByISO(iso: string): ICountryCurrencyList | undefined {
    iso = iso.toUpperCase();
    const countryNames = this.countryISOs.get(iso);
    if (!countryNames || !countryNames.size) {
      return;
    }
    const countries: ICountry[] = [];
    countryNames.forEach((country) => {
      const countryCurrency = this.getByCountry(country);
      if (countryCurrency) {
        countries.push({ name: country, iso: countryCurrency.iso });
      }
    });
    const item = this.getByCountry(countries[0].name);
    return {
      countries,
      currency: item?.currency ?? '',
      symbol: item?.symbol ?? '',
    };
  }

  public getByCurrency(currency: string): ICountryCurrencyList | undefined {
    const symbol = this.currencies.get(currency);
    if (!symbol) {
      return;
    }
    const countryNames = this.currency_countries.get(currency) ?? [];
    const countries: ICountry[] = [];
    countryNames.forEach((country) => {
      const countryCurrency = this.getByCountry(country);
      if (countryCurrency) {
        countries.push({ name: country, iso: countryCurrency.iso });
      }
    });
    return { countries, currency, symbol };
  }

  public getBySymbol(symbol: string): ICountryCurrencyList | undefined {
    const currency = this.symbols.get(symbol);
    if (!currency) {
      return;
    }
    const countryNames = this.currency_countries.get(currency) ?? [];
    const countries: ICountry[] = [];
    countryNames.forEach((country) => {
      const countryCurrency = this.getByCountry(country);
      if (countryCurrency) {
        countries.push({ name: country, iso: countryCurrency.iso });
      }
    });
    return { countries, currency, symbol };
  }

  public getAll(): IDBItem[] {
    const items: IDBItem[] = [];
    this.countries.forEach((iso, country) => {
      const countryCurrency = this.getByCountry(country);
      if (countryCurrency) {
        items.push(countryCurrency);
      }
    });

    return items;
  }

  public addToDB(item: IDBItem): void {
    this.countries.set(item.country, item.iso);
    let isoCountries = this.countryISOs.get(item.iso);
    if (isoCountries) {
      isoCountries.add(item.country);
    } else {
      isoCountries = new Set<string>().add(item.country);
      this.countryISOs.set(item.iso, isoCountries);
    }
    this.currencies.set(item.currency, item.symbol);
    this.symbols.set(item.symbol, item.currency);
    this.country_currency.set(item.country, item.currency);
    let currencyCountries = this.currency_countries.get(item.currency);
    if (currencyCountries) {
      currencyCountries.add(item.country);
    } else {
      currencyCountries = new Set<string>().add(item.country);
      this.currency_countries.set(item.currency, currencyCountries);
    }
  }

  private loadDb(): void {
    const countries = JSON.parse(
      fs.readFileSync('./db/countries.db.json', 'utf-8'),
    );
    const currencies = JSON.parse(
      fs.readFileSync('./db/currencies.db.json', 'utf-8'),
    );
    const country_currency = JSON.parse(
      fs.readFileSync('./db/country_currency.db.json', 'utf-8'),
    );

    for (const country in countries) {
      this.countries.set(country, countries[country]);
      let isoCountries = this.countryISOs.get(countries[country]);
      if (isoCountries) {
        isoCountries.add(country);
      } else {
        isoCountries = new Set<string>().add(country);
        this.countryISOs.set(countries[country], isoCountries);
      }
    }
    for (const currency in currencies) {
      this.currencies.set(currency, currencies[currency]);
      this.symbols.set(currencies[currency], currency);
    }
    for (const cc in country_currency) {
      this.country_currency.set(cc, country_currency[cc]);

      let currencyCountries = this.currency_countries.get(country_currency[cc]);
      if (currencyCountries) {
        currencyCountries.add(cc);
      } else {
        currencyCountries = new Set<string>().add(cc);
        this.currency_countries.set(country_currency[cc], currencyCountries);
      }
    }
  }
}
