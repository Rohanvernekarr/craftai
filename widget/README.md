# CraftAI Chat Sidebar Widget

## Usage

1. **Copy the built JS file**
   - Use `dist/craftai-chat-sidebar.iife.js` for embedding.

2. **Add React and ReactDOM**
   - The widget expects React and ReactDOM to be available globally. Add these CDN links before the widget script:

```html
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
```

3. **Add the Widget Script**

```html
<script src="/path/to/craftai-chat-sidebar.iife.js"></script>
<script>
  // Auto-initialize on page load
  window.autoInitCraftAIChatSidebar = true;
</script>
```

Or, to initialize manually:

```html
<script src="/path/to/craftai-chat-sidebar.iife.js"></script>
<script>
  window.initCraftAIChatSidebar();
</script>
```

## API Endpoint

- The widget sends POST requests to `/api/generateText`.
- If your API is hosted elsewhere, you can modify the fetch URL in `ChatSidebar.jsx`.

## Customization

- You can pass options to `initCraftAIChatSidebar(options)` for future customization. 