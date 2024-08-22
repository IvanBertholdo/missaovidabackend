const Fastify = require('fastify');

const app = Fastify({ logger: true });
const PORT = process.env.PORT || 3333;

// Rota GET para "/"
app.get('/', async (request, reply) => {
  reply.send({ message: 'Olá, mundo!' });
});

// Iniciar o servidor
app.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server is running on port ${PORT} at ${address}`); 
});
