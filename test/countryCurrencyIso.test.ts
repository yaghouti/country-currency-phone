import { expect } from 'chai';
import { before, describe, it } from 'mocha';
import { CountryCurrencyIso } from '../lib';

describe('CountryCurrencyIso', () => {
  it('should create an instance of CountryCurrencyIso', () => {
    const countryCurrencyIso = new CountryCurrencyIso();
    expect(countryCurrencyIso).to.exist;
  });

  describe('Get By Country', () => {
    let countryCurrencyIso: CountryCurrencyIso;

    before(() => {
      countryCurrencyIso = new CountryCurrencyIso();
    });

    it('should get info', () => {
      const countryCurrency = countryCurrencyIso.getByCountry(
        'Iran, Islamic Republic of Persian Gulf',
      );

      expect(countryCurrency).to.exist;
      expect(countryCurrency?.country).to.equal(
        'Iran, Islamic Republic of Persian Gulf',
      );
      expect(countryCurrency?.iso).to.equal('IR');
      expect(countryCurrency?.currency).to.equal('IRR');
      expect(countryCurrency?.symbol).to.equal('IRR');
    });
    it('should get undefined', () => {
      const countryCurrency =
        countryCurrencyIso.getByCountry('Unknown country');

      expect(countryCurrency).to.not.exist;
    });
  });

  describe('Get By Iso', () => {
    let countryCurrencyIso: CountryCurrencyIso;

    before(() => {
      countryCurrencyIso = new CountryCurrencyIso();
    });

    it('should get info', () => {
      const countryCurrency = countryCurrencyIso.getByISO('IR');

      expect(countryCurrency).to.exist;
      expect(countryCurrency?.countries).to.exist;
      expect(Array.isArray(countryCurrency?.countries)).to.equal(true);
      expect(countryCurrency?.countries.length).to.equal(4);
      countryCurrency?.countries.forEach((country) => {
        expect(country?.name).to.exist;
        expect(country?.iso).to.equal('IR');
      });
      expect(countryCurrency?.currency).to.equal('IRR');
      expect(countryCurrency?.symbol).to.equal('IRR');
    });
    it('should get undefined', () => {
      const countryCurrency =
        countryCurrencyIso.getByCurrency('Unknown currency');

      expect(countryCurrency).to.not.exist;
    });
  });

  describe('Get By Currency', () => {
    let countryCurrencyIso: CountryCurrencyIso;

    before(() => {
      countryCurrencyIso = new CountryCurrencyIso();
    });

    it('should get info', () => {
      const countryCurrency = countryCurrencyIso.getByCurrency('IRR');

      expect(countryCurrency).to.exist;
      expect(countryCurrency?.countries).to.exist;
      expect(Array.isArray(countryCurrency?.countries)).to.equal(true);
      expect(countryCurrency?.countries.length).to.equal(4);
      countryCurrency?.countries.forEach((country) => {
        expect(country?.name).to.exist;
        expect(country?.iso).to.equal('IR');
      });
      expect(countryCurrency?.currency).to.equal('IRR');
      expect(countryCurrency?.symbol).to.equal('IRR');
    });
    it('should get undefined', () => {
      const countryCurrency =
        countryCurrencyIso.getByCurrency('Unknown currency');

      expect(countryCurrency).to.not.exist;
    });
  });

  describe('Get By Symbol', () => {
    let countryCurrencyIso: CountryCurrencyIso;

    before(() => {
      countryCurrencyIso = new CountryCurrencyIso();
    });

    it('should get info', () => {
      const countryCurrency = countryCurrencyIso.getBySymbol('IRR');

      expect(countryCurrency).to.exist;
      expect(countryCurrency?.countries).to.exist;
      expect(Array.isArray(countryCurrency?.countries)).to.equal(true);
      expect(countryCurrency?.countries.length).to.equal(4);
      countryCurrency?.countries.forEach((country) => {
        expect(country?.name).to.exist;
        expect(country?.iso).to.equal('IR');
      });
      expect(countryCurrency?.currency).to.equal('IRR');
      expect(countryCurrency?.symbol).to.equal('IRR');
    });
    it('should get undefined', () => {
      const countryCurrency =
        countryCurrencyIso.getByCurrency('Unknown currency');

      expect(countryCurrency).to.not.exist;
    });
  });

  describe('Get All', () => {
    let countryCurrencyIso: CountryCurrencyIso;

    before(() => {
      countryCurrencyIso = new CountryCurrencyIso();
    });

    it('should get all items', () => {
      const items = countryCurrencyIso.getAll();

      expect(items).to.exist;
      expect(items.length).to.be.greaterThan(0);
      items.forEach((item) => {
        expect(item.country).to.exist;
        expect(item.iso).to.exist;
        expect(item.currency).to.exist;
        expect(item.symbol).to.exist;
      });
    });
  });

  describe('Add To DB', () => {
    let countryCurrencyIso: CountryCurrencyIso;

    before(() => {
      countryCurrencyIso = new CountryCurrencyIso();
    });

    it('should add to db', () => {
      const item = {
        country: 'Iran (Islamic Republic of Persian Gulf)',
        iso: 'IR',
        currency: 'IRR',
        symbol: 'IRR',
      };
      let countryCurrency = countryCurrencyIso.getByCountry(item.country);
      expect(countryCurrency).to.not.exist;

      countryCurrencyIso.addToDB(item);

      countryCurrency = countryCurrencyIso.getByCountry(item.country);
      expect(countryCurrency).to.exist;
      expect(countryCurrency?.country).to.equal(item.country);
      expect(countryCurrency?.iso).to.equal(item.iso);
      expect(countryCurrency?.currency).to.equal(item.currency);
      expect(countryCurrency?.symbol).to.equal(item.symbol);
    });
  });
});
