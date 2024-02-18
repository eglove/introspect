import { Button, NextUIProvider } from '@nextui-org/react';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import React from 'react';

import globalCss from '../../build.css?raw';

export const mainLayout = createRootRoute({
  component: MainLayout,
});

function MainLayout() {
  return (
    <html lang="en-US">
      <head>
        <meta charSet="utf8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Introspect</title>
        <style dangerouslySetInnerHTML={{__html: globalCss.replace(/\n/g, '')}}></style>
      </head>
      <NextUIProvider>
        <body>
          <div className="flex gap-2 p-2">
            <Link to="/" className="[&.active]:font-bold">
              Home
            </Link>{' '}
            <Link to="/about" className="[&.active]:font-bold">
              About
            </Link>
            <Button color="primary" variant="solid">
              Hello!
            </Button>
          </div>
          <hr />
          <Outlet />
          <TanStackRouterDevtools />
        </body>
      </NextUIProvider>
    </html>
  );
}
