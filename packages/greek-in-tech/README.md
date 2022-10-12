# greek-in-tech

> Learn which words used on modern computing and software engineering, come straight from the greek language/mythology. Visit [greekintech.com](http://greekintech.com) to read all entries.

## Install

```shell
npm install greek-in-tech
```

or

```shell
yarn add greek-in-tech
```

## Usage

```js
import GreekInTech, { all, random, getEntry } from "greek-in-tech";

### GreekInTech.all: object[]
### all: object[]
//=> All entries.

### GreekInTech.random(): object
### random(): object
//=> Random entry.

### GreekInTech.getEntry(id: number): object
### getEntry(id: number): object
//=> Specific entry.
```

A single entry looks like this:

```js
{
  id: 2,
  title: 'Daemon',
  description: 'The term coined by programmers of MIT\'s Project MAC, was inspired by the physicist James Clerk Maxwell\'s demon. It originated as an imaginary being from a thought experiment that constantly works in the background sorting molecules. In Greek mythology, a daemon is a supernatural being working in the background, with no particular bias towards good or evil. The daemon concept was subsequently adopted by Unix systems, however, BSD and some of its derivatives have used a Christian interpretation of the mythological deamon as their mascot rather than a Greek daemon.',
  categories: [ 'OS', 'unix', 'linux', 'open source' ],
  references: [
    {
      name: 'Wikipedia',
      source: 'https://en.wikipedia.org/wiki/Daemon_(computing)#Etymology'
    }
  ]
}
```

## Contributing

All the entries are located into a single [JSON file](data/entries.json). Just add your entry, check everything using `npm run prepublish` and create a pull request.

## Related

- [greekintech.com](http://greekintech.com) - greekintech.com site
- [greek-in-tech-site](https://github.com/tsevdos/greek-in-tech-site/) - Repo of the greekintech.com

## License

MIT© [John Tsevdos](http://tsevdos.me)
