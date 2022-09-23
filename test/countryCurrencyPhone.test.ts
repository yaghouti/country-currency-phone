import { expect } from 'chai';
import { describe, it } from 'mocha';
import { CountryCurrencyPhone } from '../lib';
import { ICountryCurrencyPhone } from '../lib/interfaces';
import * as fs from 'fs';

const db: ICountryCurrencyPhone[] = JSON.parse(
  fs.readFileSync('./db/db.json', 'utf-8'),
);

function getSampleRecord(): ICountryCurrencyPhone {
  const index = Math.floor(Math.random() * db.length);
  return db[index];
}

function compare(
  record: ICountryCurrencyPhone | undefined,
  expected: ICountryCurrencyPhone,
): void {
  expect(record).to.exist;
  expect(record?.country).to.exist;
  expect(Array.isArray(record?.country.names)).to.equal(true);
  expect(record?.country.names.length).to.equal(expected.country.names.length);
  record?.country.names.forEach((name, index) => {
    expect(name).to.equal(expected.country.names[index]);
  });
  expect(record?.country.alpha2).to.equal(expected.country.alpha2);
  expect(record?.country.alpha3).to.equal(expected.country.alpha3);
  expect(record?.currency).to.exist;
  expect(record?.currency.name).to.equal(expected.currency.name);
  expect(record?.currency.alpha3).to.equal(expected.currency.alpha3);
  expect(record?.currency.symbol).to.equal(expected.currency.symbol);
  expect(Array.isArray(record?.phoneCodes)).to.equal(true);
  expect(record?.phoneCodes.length).to.equal(expected.phoneCodes.length);
  record?.phoneCodes.forEach((phoneCode, index) => {
    expect(phoneCode).to.equal(expected.phoneCodes[index]);
  });
}

describe('CountryCurrencyPhone', () => {
  it('should create an instance of CountryCurrencyPhone', () => {
    const countryCurrencyPhone = new CountryCurrencyPhone();
    expect(countryCurrencyPhone).to.exist;
  });

  describe('getByCountryName', () => {
    let countryCurrencyPhone: CountryCurrencyPhone;
    let sampleRecord: ICountryCurrencyPhone;

    beforeEach(() => {
      countryCurrencyPhone = new CountryCurrencyPhone();
      sampleRecord = getSampleRecord();
    });

    it('should get record', () => {
      const record = countryCurrencyPhone.getByCountryName(
        sampleRecord.country.names[
          Math.floor(Math.random() * sampleRecord.country.names.length)
        ],
      );

      compare(record, sampleRecord);
    });
    it('should get undefined', () => {
      const record = countryCurrencyPhone.getByCountryName('Unknown country');

      expect(record).to.not.exist;
    });
  });

  describe('getByCountryAlpha2', () => {
    let countryCurrencyPhone: CountryCurrencyPhone;
    let sampleRecord: ICountryCurrencyPhone;

    beforeEach(() => {
      countryCurrencyPhone = new CountryCurrencyPhone();
      sampleRecord = getSampleRecord();
    });

    it('should get record', () => {
      const record = countryCurrencyPhone.getByCountryAlpha2(
        sampleRecord.country.alpha2,
      );

      compare(record, sampleRecord);
    });
    it('should get undefined', () => {
      const record = countryCurrencyPhone.getByCountryAlpha2('UK');

      expect(record).to.not.exist;
    });
  });

  describe('getByCountryAlpha3', () => {
    let countryCurrencyPhone: CountryCurrencyPhone;
    let sampleRecord: ICountryCurrencyPhone;

    beforeEach(() => {
      countryCurrencyPhone = new CountryCurrencyPhone();
      sampleRecord = getSampleRecord();
    });

    it('should get record', () => {
      const record = countryCurrencyPhone.getByCountryAlpha3(
        sampleRecord.country.alpha3,
      );

      compare(record, sampleRecord);
    });
    it('should get undefined', () => {
      const record = countryCurrencyPhone.getByCountryAlpha3('UnK');

      expect(record).to.not.exist;
    });
  });

  describe('getByCurrencyName', () => {
    let countryCurrencyPhone: CountryCurrencyPhone;
    let sampleRecord: ICountryCurrencyPhone;

    beforeEach(() => {
      countryCurrencyPhone = new CountryCurrencyPhone();
      sampleRecord = getSampleRecord();
    });

    it('should get records', () => {
      const records = countryCurrencyPhone.getByCurrencyName(
        sampleRecord.currency.name,
      );

      expect(records).to.exist;
      expect(Array.isArray(records)).to.equal(true);
      expect(records?.length).to.greaterThanOrEqual(1);
      let foundIndex = -1;
      records?.forEach((record, index) => {
        if (record.country.alpha2 === sampleRecord.country.alpha2) {
          foundIndex = index;
        }
      });
      expect(foundIndex).to.greaterThanOrEqual(0);
    });
    it('should get undefined', () => {
      const records =
        countryCurrencyPhone.getByCurrencyName('Unknown currency');

      expect(records?.length).to.equal(0);
    });
  });

  describe('getByCurrencyAlpha3', () => {
    let countryCurrencyPhone: CountryCurrencyPhone;
    let sampleRecord: ICountryCurrencyPhone;

    beforeEach(() => {
      countryCurrencyPhone = new CountryCurrencyPhone();
      sampleRecord = getSampleRecord();
    });

    it('should get records', () => {
      const records = countryCurrencyPhone.getByCurrencyAlpha3(
        sampleRecord.currency.alpha3,
      );

      expect(records).to.exist;
      expect(Array.isArray(records)).to.equal(true);
      expect(records?.length).to.greaterThanOrEqual(1);
      let foundIndex = -1;
      records?.forEach((record, index) => {
        if (record.country.alpha2 === sampleRecord.country.alpha2) {
          foundIndex = index;
        }
      });
      expect(foundIndex).to.greaterThanOrEqual(0);
    });
    it('should get undefined', () => {
      const records = countryCurrencyPhone.getByCurrencyAlpha3('UnK');

      expect(records?.length).to.equal(0);
    });
  });

  describe('getByCurrencySymbol', () => {
    let countryCurrencyPhone: CountryCurrencyPhone;
    let sampleRecord: ICountryCurrencyPhone;

    beforeEach(() => {
      countryCurrencyPhone = new CountryCurrencyPhone();
      sampleRecord = getSampleRecord();
    });

    it('should get records', () => {
      const records = countryCurrencyPhone.getByCurrencySymbol(
        sampleRecord.currency.symbol,
      );

      expect(records).to.exist;
      expect(Array.isArray(records)).to.equal(true);
      expect(records?.length).to.greaterThanOrEqual(1);
      let foundIndex = -1;
      records?.forEach((record, index) => {
        if (record.country.alpha2 === sampleRecord.country.alpha2) {
          foundIndex = index;
        }
      });
      expect(foundIndex).to.greaterThanOrEqual(0);
    });
    it('should get undefined', () => {
      const records =
        countryCurrencyPhone.getByCurrencySymbol('Unknown symbol');

      expect(records?.length).to.equal(0);
    });
  });

  describe('getByPhoneCode', () => {
    let countryCurrencyPhone: CountryCurrencyPhone;
    let sampleRecord: ICountryCurrencyPhone;

    beforeEach(() => {
      countryCurrencyPhone = new CountryCurrencyPhone();
      sampleRecord = getSampleRecord();
    });

    it('should get records', () => {
      const records = countryCurrencyPhone.getByPhoneCode(
        sampleRecord.phoneCodes[
          Math.floor(Math.random() * sampleRecord.phoneCodes.length)
        ],
      );

      expect(records).to.exist;
      expect(Array.isArray(records)).to.equal(true);
      expect(records?.length).to.greaterThanOrEqual(1);
      let foundIndex = -1;
      records?.forEach((record, index) => {
        if (record.country.alpha2 === sampleRecord.country.alpha2) {
          foundIndex = index;
        }
      });
      expect(foundIndex).to.greaterThanOrEqual(0);
    });
    it('should get undefined', () => {
      const records = countryCurrencyPhone.getByPhoneCode('+0');

      expect(records.length).to.equal(0);
    });
  });

  describe('getAll', () => {
    let countryCurrencyPhone: CountryCurrencyPhone;

    beforeEach(() => {
      countryCurrencyPhone = new CountryCurrencyPhone();
    });

    it('should get all records', () => {
      const records = countryCurrencyPhone.getAll();

      expect(records).to.exist;
      expect(records.length).to.equal(db.length);
    });
  });

  describe('addToDB', () => {
    let countryCurrencyPhone: CountryCurrencyPhone;
    let sampleRecord: ICountryCurrencyPhone;

    beforeEach(() => {
      countryCurrencyPhone = new CountryCurrencyPhone();
      sampleRecord = getSampleRecord();
    });

    it('should add to db', () => {
      const item: ICountryCurrencyPhone = {
        country: {
          names: sampleRecord.country.names.concat(['Name 1', 'Name 2']),
          alpha2: sampleRecord.country.alpha2,
          alpha3: sampleRecord.country.alpha3,
        },
        currency: {
          name: sampleRecord.currency.name,
          alpha3: sampleRecord.currency.alpha3,
          symbol: sampleRecord.currency.symbol,
        },
        phoneCodes: sampleRecord.phoneCodes,
      };
      let record = countryCurrencyPhone.getByCountryName('Name 1');
      expect(record).to.not.exist;

      countryCurrencyPhone.addToDB(item);

      record = countryCurrencyPhone.getByCountryName(item.country.names[0]);
      compare(record, item);
    });

    it('should throw country alpha2 already exists', () => {
      const item: ICountryCurrencyPhone = {
        country: {
          names: ['Name 1', 'Name 2'],
          alpha2: sampleRecord.country.alpha2,
          alpha3: 'ZZZ',
        },
        currency: {
          name: sampleRecord.currency.name,
          alpha3: sampleRecord.currency.alpha3,
          symbol: sampleRecord.currency.symbol,
        },
        phoneCodes: ['+123456'],
      };
      const record = countryCurrencyPhone.getByCountryName(
        item.country.names[0],
      );
      expect(record).to.not.exist;

      expect(
        countryCurrencyPhone.addToDB.bind(countryCurrencyPhone, item),
      ).to.throw('Country alpha2 already exists!');
    });

    it('should throw country alpha3 already exists', () => {
      const item: ICountryCurrencyPhone = {
        country: {
          names: ['Name 1', 'Name 2'],
          alpha2: 'ZZ',
          alpha3: sampleRecord.country.alpha3,
        },
        currency: {
          name: sampleRecord.currency.name,
          alpha3: sampleRecord.currency.alpha3,
          symbol: sampleRecord.currency.symbol,
        },
        phoneCodes: ['+123456'],
      };
      const record = countryCurrencyPhone.getByCountryName(
        item.country.names[0],
      );
      expect(record).to.not.exist;

      expect(
        countryCurrencyPhone.addToDB.bind(countryCurrencyPhone, item),
      ).throw('Country alpha3 already exists!');
    });
  });
});
