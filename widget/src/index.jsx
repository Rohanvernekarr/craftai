import React from 'react';
import { createRoot } from 'react-dom/client';
import ChatSidebar from './ChatSidebar';

export function initCraftAIChatSidebar(options = {}) {
  let container = document.getElementById('craftai-chat-sidebar-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'craftai-chat-sidebar-container';
    document.body.appendChild(container);
  }
  const root = createRoot(container);
  root.render(<ChatSidebar {...options} />);
}

// For direct script tag usage
document.addEventListener('DOMContentLoaded', () => {
  if (window.autoInitCraftAIChatSidebar) {
    initCraftAIChatSidebar();
  }
}); 