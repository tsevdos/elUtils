# Contributing to elUtils

First off, thanks for taking the time to contribute! ❤️

## Table of Contents

- [I have a question](#i-have-a-question)
- [Reporting bugs](#reporting-bugs)
- [Suggesting enhancements](#suggesting-enhancements)
- [Submitting a pull request](#submitting-a-pull-request)
- [How do I submit a good pull request?](#how-do-I-submit-a-good-pull-request?)

## I have a question

> If you want to ask a question, we assume that you have read the available [Documentation](https://github.com/tsevdos/elUtils/blob/main/docs/).

Before you ask a question, it is best to search for existing [Issues](https://github.com/tsevdos/elUtils/issues) or [Discussions](https://github.com/tsevdos/elUtils/discussions) that might help you. In case you have found a suitable issue and still need clarification, you can write your question in this issue.

If you then still feel the need to ask a question and need clarification, we recommend the following:

- Open a [Discussion](https://github.com/tsevdos/elUtils/discussions/new/choose).
- Provide as much context as you can about what you're running into.

We will then take care of the issue as soon as possible.

## Reporting bugs

Please try to collect information and describe the issue in detail in your report. An `ISSUE_TEMPLATE` will be created soon to make things even easier.

- Make sure that you are using the latest version.
- Determine if your bug is really a bug and not an error on your side.
- To see if other users have experienced (and potentially already solved) the same issue you are having, check if there is not already a bug report existing for your bug or error in the [issues](https://github.com/tsevdos/elUtils/issues).
- Collect information about the bug:
  - Stack trace (Traceback)
  - OS, Platform and Version (Windows, Linux, macOS, x86, ARM)
  - Version of the interpreter, compiler, SDK, runtime environment, package manager, depending on what seems relevant.
  - Possibly your input and the output
  - Can you reliably reproduce the issue? And can you also reproduce it with older versions?

## Suggesting enhancements

Please submit your enhancement idea in this [discussions area](https://github.com/tsevdos/elUtils/discussions/categories/ideas). I will personally communicate with you to work on the solution together.

## Submitting a pull request

Please don't make any pull request before finalizing all the requested changes in a descriptive/detailed issue. Pull requests that change only documentation (`.md` files) do not need an issue.

To set up the environment is really easy and straight-forward. You just need the latest node version 16 or above (I personally use the latest LTS version), to write and test your code. After that, you only need to complete the below steps:

1. Fork the repository
2. Clone your fork
3. Run npm install to set up dependencies

Do all your changes to a new branch and please don't forget to add tests to your contributions. Of course, if you need any help on anything, feel free to ping me on the [Discussions](https://github.com/tsevdos/elUtils/discussions).

The most common commands you'll need are the below:

```shell
# runs all tests
npm test

# run tests in watch mode in order to focus on a specific test suite
npm run test:watch

# checks types, linting and formating in code base
npm run check

# fix formatting
npm run format:fix
```

## How do I submit a good pull request?

- Use a clear and descriptive title for the pull request using [**Convention Commits**](https://www.conventionalcommits.org/en/v1.0.0/) to identify the suggestion.
- Be detailed about the changes you've made.
- For code changes, include tests that validate the change.
- When changing the public API, you update the related documentation.
- Provide a step-by-step description of the suggested enhancement in as many details as possible.
