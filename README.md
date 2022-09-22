# Country Currency Phone
Provides countries, currencies and phone codes base on ISO names, symbols and codes.

## Usage
```ts
import { CountryCurrencyPhone } from 'country-currency-phone';
const countryCurrencyPhone = new CountryCurrencyPhone();
```

#### Get By Country Name
```ts
const countryCurrency = countryCurrencyPhone.getByCountry('Iran');
// { country: 'Iran', iso: 'IR', currency: 'IRR', symbol: 'IRR' }
```

#### Get By Country ISO
```ts
const countryCurrency = countryCurrencyPhone.getByISO('DE');
// { country: 'Germany', iso: 'DE', currency: 'EUR', symbol: '€' }
```

#### Get By Currency
```ts
const countryCurrency1 = countryCurrencyPhone.getByCurrency('USD');
const countryCurrency2 = countryCurrencyPhone.getBySymbol('$');
// {
//   countries: [
//     { name: 'American Samoa', iso: 'AS' },
//     { name: 'Bonaire, Saint Eustatius and Saba ', iso: 'BQ' },
//     { name: 'British Indian Ocean Territory', iso: 'IO' },
//     ...
//   ],
//   currency: 'USD',
//   symbol: '$'
// }
```

#### Add New Items To The Local DB
**NB:** These items won't be stored permanently.
```ts
const item = {
  country: 'Iran (Islamic Republic of Persian Gulf)',
  iso: 'IR',
  currency: 'IRR',
  symbol: 'IRR',
};
countryCurrencyPhone.addToDB(item);

let countryCurrency = countryCurrencyPhone.getByCountry(item.country);
// { country: 'Iran (Islamic Republic of Persian Gulf)', iso: 'IR', currency: 'IRR', symbol: 'IRR' }
```

#### Get All The Local DB Items
```ts
const items = countryCurrencyPhone.getAll();
// [
//   { country: 'Afghanistan', iso: 'AF', currency: 'AFN', symbol: 'Af' },
//   { country: 'Aland Islands', iso: 'AX', currency: 'EUR', symbol: '€' },
//   { country: 'Albania', iso: 'AL', currency: 'ALL', symbol: 'ALL' },
//   ...
// ]
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
