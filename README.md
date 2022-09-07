# Country Currency ISO
Provides countries and currencies based on ISO names and symbols

## Install
> npm install country-currency-iso

## Usage
```ts
import { CountryCurrencyIso } from 'country-currency-iso';
const countryCurrencyIso = new CountryCurrencyIso();
```

#### Get By Country Name
```ts
const countryCurrency1 = countryCurrencyIso.getByCountry('Iran');
// { country: 'Iran', iso: 'IR', currency: 'IRR', symbol: 'IRR' }
```

#### Get By Country ISO
```ts
const countryCurrency2 = countryCurrencyIso.getByISO('DE');
// { country: 'Germany', iso: 'DE', currency: 'EUR', symbol: '€' }
```

#### Get By Currency
```ts
const countryCurrency3 = countryCurrencyIso.getByCurrency('USD');
const countryCurrency4 = countryCurrencyIso.getBySymbol('$');
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

#### Get All Items In Local DB
```ts
const items = countryCurrencyIso.getAll();
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
