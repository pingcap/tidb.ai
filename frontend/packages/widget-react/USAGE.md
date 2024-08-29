# Usage of tidb.ai widget

## Floating Button

TiDB.ai Widget will automatically create a floating button at right bottom corner of your site.

```html
<script
  async
  src="{{YOUR_SITE}}/widget.js"
  data-api-base="{{YOUR_SITE}}"
>
</script>
```

## Custom Trigger Element

TiDB.ai Widget will listen the element's `click` event. The custom trigger element must have id `tidb-ai-trigger`

```html
<button id="tidb-ai-trigger">My Trigger</button>

<!-- ... -->

<script
  async
  src="{{YOUR_SITE}}/widget.js"
  data-api-base="{{YOUR_SITE}}"
>
</script>
```

## Controlled

TiDB.ai Widget will not create or bind a trigger element. Instead, you can listen to the custom event
`tidbaiinitialized`, which indicates the `tidbai` object is ready on `Window` object.

```js
window.addEventListener('tidbaiinitialized', () => {
  window.tidbai.open = true;
})
```

The widget script tag must has a `data-controlled` attribute to prevent create a trigger button.

```html
<script
  async
  src="{{YOUR_SITE}}/widget.js"
  data-api-base="{{YOUR_SITE}}"
  data-controlled="true"
>
</script>
```
