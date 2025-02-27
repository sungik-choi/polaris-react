---
name: Tag
category: Forms
platforms:
  - android
  - ios
  - web
keywords:
  - indicator
  - label
  - label objects
  - organize objects
  - categorize objects
  - categories
  - keywords
---

# Tag

Tags represent a set of interactive, merchant-supplied keywords that help label, organize, and categorize objects. Tags can be added or removed from an object by merchants.

---

## Best practices

Tags should:

- Be presented close to or within the input control that allows merchants to add and remove tags

---

## Examples

### Default tag

Use to signify the attributes of an object.

```jsx
<Tag>Wholesale</Tag>
```

### Removable tag

Use to allow merchants to remove attributes from an object.

```jsx
function RemovableTagExample() {
  const [selectedTags, setSelectedTags] = useState([
    'Rustic',
    'Antique',
    'Vinyl',
    'Refurbished',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at ipsum quam. Aliquam fermentum bibendum vestibulum. Vestibulum condimentum luctus metus, sed sagittis magna pellentesque eget. Duis dapibus pretium nisi, et venenatis tortor dignissim ut. Quisque eget lacus ac ex eleifend ultrices. Phasellus facilisis ex sit amet leo elementum condimentum. Ut vel maximus felis. Etiam eget diam eu eros blandit interdum. Sed eu metus sed justo aliquam iaculis ac sit amet ex. Curabitur justo magna, porttitor non pulvinar eu, malesuada at leo. Cras mollis consectetur eros, quis maximus lorem dignissim at. Proin in rhoncus massa. Vivamus lectus nunc, fringilla euismod risus commodo, mattis blandit nulla.',
  ]);

  const removeTag = useCallback(
    (tag) => () => {
      setSelectedTags((previousTags) =>
        previousTags.filter((previousTag) => previousTag !== tag),
      );
    },
    [],
  );

  const tagMarkup = selectedTags.map((option) => (
    <Tag key={option} onRemove={removeTag(option)}>
      {option}
    </Tag>
  ));

  return <Stack spacing="tight">{tagMarkup}</Stack>;
}
```

### Clickable tag

Use to allow merchants to add attributes to an object.

```jsx
<Tag onClick={() => console.log('Clicked')}>Wholesale</Tag>
```

### Tag with link

Use to allow merchants to navigate to a resource. For example a customer segment or a smart collection

```jsx
function URLTagExample() {
  return <Tag url="/collections/wholesale">Wholesale</Tag>;
}
```

### Tag with custom content

Use when a tag needs to be visually distinguished from others, like when it's added automatically.

```jsx
<Tag url="/collections/wholesale">
  <Stack spacing="extraTight">
    <Icon source={WandMinor} />
    <span>Wholesale</span>
  </Stack>
</Tag>
```

<!-- content-for: android -->

![Tag for Android](/public_images/components/Tag/android/default@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Tag for iOS](/public_images/components/Tag/ios/default@2x.png)

<!-- /content-for -->

---

## Related components

- To show the status of an object, [use the badge component](https://polaris.shopify.com/components/images-and-icons/badge)
- To add and remove tags, [use the text field component](https://polaris.shopify.com/components/forms/text-field)

---

## Accessibility

<!-- content-for: android -->

See Material Design and development documentation about accessibility for Android:

- [Accessible design on Android](https://material.io/design/usability/accessibility.html)
- [Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility/)

<!-- /content-for -->

<!-- content-for: ios -->

See Apple’s Human Interface Guidelines and API documentation about accessibility for iOS:

- [Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/ios/app-architecture/accessibility/)
- [Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

<!-- /content-for -->

<!-- content-for: web -->

### Labeling

The button to remove a tag is automatically given a label using `aria-label` so that screen reader users can distinguish which tag will be removed.

### Keyboard support

The control to remove a tag is implemented as a button with standard keyboard support.

- Give buttons keyboard focus with the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)
- To activate a button, press the <kbd>enter</kbd>/<kbd>return</kbd> or <kbd>space</kbd> key

When a merchant uses the button to remove a tag, it is important to make sure that keyboard focus is managed. Moving focus to the next element in the page is recommended.

<!-- /content-for -->
