## Purpose

This stylelint plugin will warn devs when they are declaring a CSS property without a valid polaris token. Hopefully, this will reduce the amount of custom code that get's written when there should be a polaris token value in its place instead.

## Example

CSS color values should use the polaris color tokens. The following will fail the linting step because it uses custom CSS instead of a polaris token.

```
a {
  color: #9c9798
}

// -- corresponding stylelint error

src/components/TextField/TextField.scss
 57:5  ✖  Unexpected value "#9c9798" for property "color"   declaration-property-value-allowed-list
```

But this will pass with flying colors :rainbow:

```
a {
  color: var(--p-text)
}
```

## How to use

To test out how this works, run the following stylelint command. It will run on all scss files but feel free to target a specific file.

```
yarn stylelint **/*.scss
```

## How it works

:warning: This plugin is still in a test stage

Packages up polaris specific rules. Right now it's just using the built-in stylelint rule [`declaration-property-value-allowed-list`](https://stylelint.io/user-guide/rules/list/declaration-property-value-allowed-list/) to match known css properties with their allowed polaris values.

## Next steps

[ ] Add the rest of the properties and allowed values
[ ] add a custom error message to prompt dev to use polaris custom props
[ ] Resolve all linter errors by updating rules OR updating the CSS files to adhere to rules
[ ] Test in `Shopify/web`
[ ] package up for realz
[ ] profit
