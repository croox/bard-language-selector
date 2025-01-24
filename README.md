# Language Selector for Statamic

A Statamic addon that adds language selection functionality to Bard fields.

## Features

- Adds a language selector button to Bard fields
- Wraps selected text in a `<span lang="...">` tag

## Limitations

- Available languages are currently hard-coded

## Installation

You can install the package via composer:

```bash
composer require croox/language-selector
```

## Usage

1. The language selector button will appear in your Bard field toolbar
2. Select the text you want to mark with a language
3. Click the language button and select the appropriate language
4. The text will be wrapped in a `<span>` tag with the correct `lang` attribute

## Development

1. Clone this repository
2. Run `npm install`
3. Run `npm run build`

## License

MIT License 
