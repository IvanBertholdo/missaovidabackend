const fastify = require('fastify')({ logger: true });

fastify.get('/', async (request, reply) => {
  reply.send({ message: 'Servidor online!' });
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();