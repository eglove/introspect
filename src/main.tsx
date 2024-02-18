import { createRouter, RouterProvider } from '@tanstack/react-router';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { mainLayout } from './components/layout/main-layout';
import { indexRoute } from './components/pages';
import { aboutRoute } from './components/pages/about';
import {NextUIProvider} from "@nextui-org/react";

const routeTree = mainLayout.addChildren([indexRoute, aboutRoute]);

const router = createRouter({ defaultPreload: 'intent', routeTree });

declare module '@tanstack/react-router' {
  // @ts-expect-error
  type Register = {
    router: typeof router;
  };
}

const rootElement = document.querySelector('#app');
if (rootElement !== null && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </StrictMode>,
  );
}
