import * as fs from 'fs';
import { ICountryCurrencyPhone } from './interfaces';

export class CountryCurrencyPhone {
  private readonly countryNames: Map<string, ICountryCurrencyPhone>;
  private readonly countryAlpha2s: Map<string, ICountryCurrencyPhone>;
  private readonly countryAlpha3s: Map<string, ICountryCurrencyPhone>;
  private readonly currencyNames: Map<string, Set<ICountryCurrencyPhone>>;
  private readonly currencyAlpha3s: Map<string, Set<ICountryCurrencyPhone>>;
  private readonly currencySymbols: Map<string, Set<ICountryCurrencyPhone>>;
  private readonly phoneCodes: Map<string, Set<ICountryCurrencyPhone>>;

  constructor() {
    this.countryNames = new Map<string, ICountryCurrencyPhone>();
    this.countryAlpha2s = new Map<string, ICountryCurrencyPhone>();
    this.countryAlpha3s = new Map<string, ICountryCurrencyPhone>();
    this.currencyNames = new Map<string, Set<ICountryCurrencyPhone>>();
    this.currencyAlpha3s = new Map<string, Set<ICountryCurrencyPhone>>();
    this.currencySymbols = new Map<string, Set<ICountryCurrencyPhone>>();
    this.phoneCodes = new Map<string, Set<ICountryCurrencyPhone>>();
    this.loadDb();
  }

  public getByCountryName(name: string): ICountryCurrencyPhone | undefined {
    return this.countryNames.get(name);
  }

  public getByCountryAlpha2(alpha2: string): ICountryCurrencyPhone | undefined {
    return this.countryAlpha2s.get(alpha2);
  }

  public getByCountryAlpha3(alpha3: string): ICountryCurrencyPhone | undefined {
    return this.countryAlpha3s.get(alpha3);
  }

  public getByCurrencyName(name: string): ICountryCurrencyPhone[] | undefined {
    const items: ICountryCurrencyPhone[] = [];
    this.currencyNames.get(name)?.forEach((item) => {
      items.push(item);
    });

    return items;
  }

  public getByCurrencyAlpha3(
    alpha3: string,
  ): ICountryCurrencyPhone[] | undefined {
    const items: ICountryCurrencyPhone[] = [];
    this.currencyAlpha3s.get(alpha3)?.forEach((item) => {
      items.push(item);
    });

    return items;
  }

  public getByCurrencySymbol(
    symbol: string,
  ): ICountryCurrencyPhone[] | undefined {
    const items: ICountryCurrencyPhone[] = [];
    this.currencySymbols.get(symbol)?.forEach((item) => {
      items.push(item);
    });

    return items;
  }

  public getByPhoneCode(phoneCode: string): ICountryCurrencyPhone[] {
    const items: ICountryCurrencyPhone[] = [];
    this.phoneCodes.get(phoneCode)?.forEach((item) => {
      items.push(item);
    });

    return items;
  }

  public getAll(): ICountryCurrencyPhone[] {
    const items: ICountryCurrencyPhone[] = [];
    this.countryAlpha2s.forEach((item) => {
      items.push(item);
    });

    return items;
  }

  public addToDB(item: ICountryCurrencyPhone): void {
    let existingRecord = this.getByCountryAlpha2(item.country.alpha2);
    if (
      existingRecord &&
      existingRecord.country.alpha3 !== item.country.alpha3
    ) {
      throw new Error('Country alpha2 already exists!');
    }

    existingRecord = this.getByCountryAlpha3(item.country.alpha3);
    if (
      existingRecord &&
      existingRecord.country.alpha2 !== item.country.alpha2
    ) {
      throw new Error('Country alpha3 already exists!');
    }

    for (const name of item.country.names) {
      this.countryNames.set(name, item);
    }

    this.countryAlpha2s.set(item.country.alpha2, item);

    this.countryAlpha3s.set(item.country.alpha3, item);

    let itemSet = this.currencyNames.get(item.currency.name);
    if (itemSet) {
      itemSet.add(item);
    } else {
      itemSet = new Set<ICountryCurrencyPhone>().add(item);
      this.currencyNames.set(item.currency.name, itemSet);
    }

    itemSet = this.currencyAlpha3s.get(item.currency.alpha3);
    if (itemSet) {
      itemSet.add(item);
    } else {
      itemSet = new Set<ICountryCurrencyPhone>().add(item);
      this.currencyAlpha3s.set(item.currency.alpha3, itemSet);
    }

    itemSet = this.currencySymbols.get(item.currency.symbol);
    if (itemSet) {
      itemSet.add(item);
    } else {
      itemSet = new Set<ICountryCurrencyPhone>().add(item);
      this.currencySymbols.set(item.currency.symbol, itemSet);
    }

    item.phoneCodes.forEach((phoneCode) => {
      itemSet = this.phoneCodes.get(phoneCode);
      if (itemSet) {
        itemSet.add(item);
      } else {
        itemSet = new Set<ICountryCurrencyPhone>().add(item);
        this.phoneCodes.set(phoneCode, itemSet);
      }
    });
  }

  private loadDb(): void {
    const db: ICountryCurrencyPhone[] = JSON.parse(
      fs.readFileSync('./db/db.json', 'utf-8'),
    );

    for (const item of db) {
      this.addToDB(item);
    }
  }
}
