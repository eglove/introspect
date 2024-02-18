import type { ServerResponse } from 'node:http';

import { createMemoryHistory } from '@tanstack/react-router';
// @ts-expect-error it's fine
import { StartServer } from '@tanstack/react-router-server/server';
import type express from 'express';
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';

import { getRouter } from './router';

export async function render(options: {
  head: string;
  req: express.Request;
  res: ServerResponse;
  url: string;
}) {
  const router = getRouter();

  const memoryHistory = createMemoryHistory({
    initialEntries: [options.url],
  });

  // Update the history and context
  router.update({
    context: {
      ...router.options.context,
      head: options.head,
    },
    history: memoryHistory,
  });

  // Since we're using renderToString, Wait for the router to finish loading
  await router.load();

  // Render the app
  const appHtml = ReactDOMServer.renderToString(
    <StartServer router={router} />,
  );

  options.res.statusCode = 200;
  options.res.setHeader('Content-Type', 'text/html');
  options.res.end(`<!DOCTYPE html>${appHtml}`);
}
