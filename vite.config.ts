import {babel} from '@rollup/plugin-babel';
import react from '@vitejs/plugin-react';
import {startMockServer} from 'mock-config-server';
import path from 'node:path';
import {defineConfig} from 'vite';

import {mockServerConfig} from './mock-server.config';

startMockServer(mockServerConfig);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    babel({extensions: ['.ts', '.tsx'], babelHelpers: 'bundled', skipPreflightCheck: true}),
    react({fastRefresh: false}),
  ],
  resolve: {
    alias: [
      {
        find: '~',
        replacement: path.resolve('src'),
      },
    ],
  },
});
