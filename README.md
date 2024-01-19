todo

# Greek utils

> Greek Utils is a library focused on solving problems that we face daily in applications development for Greek businesses.

## Installation

```shell
# NPM
npm install @tsevdos/el-utils
# or Yarn
yarn add @tsevdos/el-utils
# or PNPM
pnpm add @tsevdos/el-utils
```

## Usage

To use one of the available utilities you just need to import the required function as in the example below:

```js
// CommonJS
const DateUtils = require("@tsevdos/el-utils").DateUtils;
const GeoUtils = require("@tsevdos/el-utils").GeoUtils;

// ESM
import { DateUtils, GeoUtils } from "@tsevdos/el-utils";
```

After that you can use any method / property of the improted object like this:

```js
GeoUtils.getAdministrativeRegions();
```

## License

MIT© [John Tsevdos](http://tsevdos.me)
