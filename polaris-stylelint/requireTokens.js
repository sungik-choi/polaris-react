const shadowFunctionRegex = '/s*shadow\\(.*\\)s*/';
const polarisCustomPropRegex = '/s*var\\(--p-.+\\)s*/';
const borderFunctionRegex = '/s*border\\(.*\\)s*/';
const highContrastFunctionRegex = '/s*ms-high-contrast-color\\(.*\\)s*/';

module.exports = {
  rules: {
    'declaration-property-value-allowed-list': {
      'box-shadow': ['none', polarisCustomPropRegex, shadowFunctionRegex],
      '/^color/': [
        'inherit',
        'transparent',
        'currentColor',
        polarisCustomPropRegex,
        highContrastFunctionRegex,
      ],
      opacity: ['0', '1', polarisCustomPropRegex],
      border: [
        'none',
        '0',
        borderFunctionRegex,
        polarisCustomPropRegex,
        highContrastFunctionRegex,
      ],
      /*
      TODO
      are values like this valid for props that have sass functions like border()?
      1px solid ms-high-contrast-color('text')
      */
    },
  },
};

// TODO add the other values and what they match

// const polarisCustomPropRegex = '/var(--p-*/';

// const matchedValues = {
//   [polarisCustomPropRegex]: ['color'],
// };

// const color = {
//   'box-shadow': ['/shadow(/'],

//   properties: [
//     'color',
//     'box-shadow',
//     'background',
//     'background-color',
//     'border',
//     'border-color',
//     'border-top',
//     'border-right',
//     'border-bottom',
//     'border-left',
//     'border-top-color',
//     'border-right-color',
//     'border-bottom-color',
//     'border-left-color',
//     'border-block-start-color',
//     'border-block-end-color',
//     'outline',
//     'outline-color',
//     'text-decoration',
//     'text-decoration-color',
//     'text-shadow',
//     'caret-color',
//     'column-rule-color',
//     'fill',
//     'stroke',
//     'opacity',
//   ],
// };

// const spaceProperties = [
//   'padding',
//   'padding-top',
//   'padding-right',
//   'padding-bottom',
//   'padding-left',
//   'margin',
//   'margin-top',
//   'margin-right',
//   'margin-bottom',
//   'margin-left',
//   'min-height',
//   'height',
//   'max-height',
//   'min-width',
//   'width',
//   'max-width',
//   'border',
//   'border-width',
//   'border-top',
//   'border-right',
//   'border-bottom',
//   'border-left',
//   'border-top-width',
//   'border-right-width',
//   'border-bottom-width',
//   'border-left-width',
//   'gap',
//   'grid-gap',
//   'row-gap',
//   'column-gap',
//   'text-indent',
//   'top',
//   'right',
//   'bottom',
//   'left',
//   'scale',
// ];

// const typeProperties = [
//   'font',
//   'font-family',
//   'font-size',
//   'font-weight',
//   'font-stretch',
//   'font-style',
//   'font-variant',
//   'font-kerning',
//   'font-variant-caps',
//   'line-height',
//   'text-transform',
//   'text-decoration',
//   'letter-spacing',
//   'word-spacing',

//   // layout
//   '@media (max-width',
//   '@media (min-width',
//   'z-index',
//   'display',
//   'text-align',
//   'position',
//   'align-items',
//   'align-self',
//   'justify-content',
//   'justify-self',
//   'flex-wrap',
//   'flex-direction',
//   'order',
//   'display',
//   'grid',
//   'grid-row-start',
//   'grid-row-end',
//   'grid-column',
//   'grid-row',
//   'grid-template',
//   'grid-template-rows',
//   'grid-template-columns',
//   'grid-template-areas',
//   'grid-area',
// ];

// const motionProperties = [
//   '@keyframes',
//   'transition',
//   'transition-delay',
//   'transition-property',
//   'transition-timing-function',
//   'animation',
//   'animation-delay',
//   'animation-direction',
//   'animation-duration',
//   'animation-fill-mode',
//   'animation-iteration-count',
//   'animation-name',
//   'animation-play-state',
//   'animation-timing-function',
// ];

// export const allowedList = [
//   // all polaris custom properties
//   'var(--p-',

//   // polaris sass functions
//   'spacing(',
//   'border(',
//   'shadow(',
//   'focus-ring',
//   'duration(',
//   'easing(',
//   'layout-width(',
//   'shadow(',
//   'z-index(',
//   'font-size(',
//   'font-family(',
//   'line-height(',

//   // valid css values
//   'transparent',
// ];

/**
 * these are separate rules
 *
  "opacity: 0",
  "opacity: 1",
 */
