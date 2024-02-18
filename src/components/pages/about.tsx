import { createRoute } from '@tanstack/react-router';
import React from 'react';

import { mainLayout } from '../layout/main-layout';

export const aboutRoute = createRoute({
  component: About,
  getParentRoute() {
    return mainLayout;
  },
  path: '/about',
});

function About() {
  return <div className="p-2">Hello from About!</div>;
}
