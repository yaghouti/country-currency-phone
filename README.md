# Country Currency Phone
Provides countries, currencies and phone codes base on ISO names, symbols and codes.

It supports multiple names and phone codes for each country.

## Usage
```ts
import { CountryCurrencyPhone } from 'country-currency-phone';
const countryCurrencyPhone = new CountryCurrencyPhone();
```

#### Get By Country Name
```ts
const record = countryCurrencyPhone.getByCountryName('Iran');
// {
//   country: {
//     names: ['Iran', 'Iran, Islamic Republic of'],
//     alpha2: 'IR',
//     alpha3: 'IRN'
//   },
//   currency: {
//     name: 'Iranian Rial',
//     alpha3: 'IRR',
//     symbol: 'IRR'
//   },
//   phoneCodes: ['+98']
// }
```

#### Get By Country Alpha2 or Alpha3
```ts
const record1 = countryCurrencyPhone.getByCountryAlpha2('DE');
const record2 = countryCurrencyPhone.getByCountryAlpha2('DEU');
// {
//   country: {
//     names: ['Germany'],
//     alpha2: 'DE',
//     alpha3: 'DEU'
//   },
//   currency: {
//     name: 'Euro',
//     alpha3: 'EUR',
//     symbol: '€'
//   },
//   phoneCodes: ['+49']
// }
```

#### Get By Currency Name or Alpha3 or Symbol
```ts
const records1 = countryCurrencyPhone.getByCurrencyName('US Dollar');
const records2 = countryCurrencyPhone.getByCurrencyAlpha3('USD');
const records3 = countryCurrencyPhone.getByCurrencySymbol('$');
// [
//   { country: { names: ['American Samoa'], alpha2: 'AS', alpha3: 'ASM' }, currency: { name: 'US Dollar', alpha3: 'USD', symbol: '$' }, phoneCodes: ['+1 684'] },
//   { country: { names: ['Bonaire, Saint Eustatius and Saba'], alpha2: 'BQ', alpha3: 'BES' }, currency: { name: 'US Dollar', alpha3: 'USD', symbol: '$' }, phoneCodes: ['+599 7'] },
//   { country: { names: ['British Indian Ocean Territory'], alpha2: 'IO', alpha3: 'IOT' }, currency: { name: 'US Dollar', alpha3: 'USD', symbol: '$' }, phoneCodes: ['+246'] },
//   ...
// ]
```

#### Get By Phone Code
```ts
const records = countryCurrencyPhone.getByPhoneCode('+55');
// [
//   { country: { names: ['Brazil'], alpha2: 'BR', alpha3: 'BRA' }, currency: { name: 'Brazilian Real', alpha3: 'BRL', symbol: 'R$' }, phoneCodes: ['+55'] },
//   { country: { names: ['Bouvet Island'], alpha2: 'BV', alpha3: 'BVT' }, currency: { name: 'Norwegian Krone', alpha3: 'NOK', symbol: 'Nkr' }, phoneCodes: ['+55'] },
// ]
```

#### Get All Records
```ts
const items = countryCurrencyPhone.getAll();
// [
//   { country:{ names: ['Andorra'], alpha2: 'AD', alpha3: 'AND' }, currency: { name: 'Euro', alpha3: 'EUR', symbol: '€' }, phoneCodes: ['+376'] },
//   { country: { names: ['United Arab Emirates'], alpha2: 'AE', alpha3: 'ARE' }, currency: { name: 'UAE Dirham', alpha3: 'AED', symbol: 'AED' }, phoneCodes: ['+971'] },
//   { country: { names: ['Afghanistan'], alpha2: 'AF', alpha3: 'AFG' }, currency: { name: 'Afghani', alpha3: 'AFN', symbol: 'Af' }, phoneCodes: ['+93'] },
//   ...
// ]
```

#### Add New records
**NB:** These items won't be stored permanently.
```ts
const item = {
  country: {
    names: ['Iran (Islamic Republic of Persian Gulf)'],
    alpha2: 'IR',
    alpha3: 'IRN',
  },
  currency: {
    name: 'Iranian Rial',
    alpha3: 'IRR',
    symbol: 'IRR',
  },
  phoneCodes: ['+98']
};
// As there is a record with country alpha2 and alpha3 in the db, that record will be replaced with this one.
// If only one of the country alpha2 or alpha3 exists in the db, calling `addToDB` will throw error.
countryCurrencyPhone.addToDB(item);

let record = countryCurrencyPhone.getByCountry(item.country.names[0]);
// {
//   country: {
//     names: ['Iran (Islamic Republic of Persian Gulf)'],
//     alpha2: 'IR',
//     alpha3: 'IRN'
//   },
//   currency: {
//     name: 'Iranian Rial',
//     alpha3: 'IRR',
//     symbol: 'IRR'
//   },
//   phoneCodes: ['+98']
// }
```

# License
MIT License

Copyright (c) 2022 Majid Yaghouti

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
