const Hapi = require('@hapi/hapi');
const routes = require('./routes/index');
const Path = require('path');
const Inert = require('@hapi/inert');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      files: {
        relativeTo: Path.resolve(__dirname, '../FrontEnd'),
      },
    },
  });

  await server.register(Inert);

  // Serve static frontend
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        index: ['pages/home.html'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
