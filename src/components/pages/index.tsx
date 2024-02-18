import { createRoute } from '@tanstack/react-router';
import React from 'react';

import { mainLayout } from '../layout/main-layout';

export const indexRoute = createRoute({
  component: Index,
  getParentRoute() {
    return mainLayout;
  },
  path: '/',
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}
