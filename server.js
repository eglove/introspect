import express from 'express';
import getPort, { portNumbers } from 'get-port';

const isTest =
  process.env.NODE_ENV === 'test' || Boolean(process.env.VITE_TEST_BUILD);

export async function createServer(
  root = process.cwd(),
  isProduction = process.env.NODE_ENV === 'production',
  hmrPort,
) {
  const app = express();

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite;
  if (isProduction) {
    app.use((await import('compression')).default());
  } else {
    vite = await (
      await import('vite')
    ).createServer({
      appType: 'custom',
      logLevel: isTest ? 'error' : 'info',
      root,
      server: {
        hmr: {

          port: hmrPort,
        },
        middlewareMode: true,
        watch: {
          interval: 100,
          /*
           * During tests we edit the files too fast and sometimes chokidar
           * misses change events, so enforce polling for consistency
           */
          usePolling: true,
        },
      },
    });
    // use vite's connect instance as middleware
    app.use(vite.middlewares);
  }

  app.use('*', async (request, res) => {
    try {
      const url = request.originalUrl;

      if (url.includes('.')) {
        console.warn(`${url} is not valid router path`);
        res.status(404);
        res.end(`${url} is not valid router path`);
        return;
      }

      // Extract the head from vite's index transformation hook
      let viteHead = isProduction
        ? ''
        : await vite.transformIndexHtml(
            url,
            `<html><head></head><body></body></html>`,
          );

      viteHead = viteHead.substring(
        viteHead.indexOf('<head>') + 6,
        viteHead.indexOf('</head>'),
      );

      const entry = await (async () => {
        if (!isProduction) {
          return vite.ssrLoadModule('/src/entry-server.tsx');
        }
        return import('./dist/server/entry-server.js');
      })();

      console.log('Rendering:', url, '...');
      entry.render({ head: viteHead, req: request, res, url });
    } catch (error) {
      !isProduction && vite.ssrFixStacktrace(error);
      console.log(error.stack);
      res.status(500).end(error.stack);
    }
  });

  return { app, vite };
}

if (!isTest) {
  const serverPort = await getPort({ port: portNumbers(3000, 3100) });

  createServer().then(async ({ app }) => {
    return app.listen(serverPort, () => {
      console.log(`Client Server: http://localhost:${serverPort}`);
    });
  });
}
