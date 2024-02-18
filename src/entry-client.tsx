// @ts-expect-error it's fine
import { StartClient } from '@tanstack/react-router-server/client';
import ReactDOM from 'react-dom/client';

import { getRouter } from './router';

const router = getRouter();

ReactDOM.hydrateRoot(document, <StartClient router={router} />);
