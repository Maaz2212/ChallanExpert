import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import handler from './api/challan.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables
  const env = loadEnv(mode, process.cwd(), '');
  // Assign to process.env so the handler can access them
  Object.assign(process.env, env);

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'api-server',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (!req.url.startsWith('/api/challan')) return next();

            // Parse body
            if (req.method === 'POST') {
              const buffers = [];
              for await (const chunk of req) {
                buffers.push(chunk);
              }
              const data = Buffer.concat(buffers).toString();
              try {
                req.body = JSON.parse(data);
              } catch (e) {
                req.body = {};
              }
            }

            // Polyfill res methods
            res.status = (code) => {
              res.statusCode = code;
              return res;
            };
            res.json = (data) => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return res;
            };

            try {
              await handler(req, res);
            } catch (err) {
              console.error('API Error:', err);
              res.status(500).json({ error: 'Internal Server Error' });
            }
          });
        },
      },
    ],
  }
})
