import { createRouter } from '@tanstack/react-router';

import { mainLayout } from './components/layout/main-layout';
import { indexRoute } from './components/pages';
import { aboutRoute } from './components/pages/about';

const routeTree = mainLayout.addChildren([indexRoute, aboutRoute]);

export function getRouter() {
  return createRouter({ defaultPreload: 'intent', routeTree });
}

declare module '@tanstack/react-router' {
  // @ts-expect-error
  type Register = {
    router: ReturnType<typeof getRouter>;
  };
}
