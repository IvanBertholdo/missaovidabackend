const Fastify = require('fastify');
const fastifycors = require('@fastify/cors');
const swagger = require('@fastify/swagger');
const swaggerui = require('@fastify/swagger-ui');
const fastifyJwt = require('@fastify/jwt');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const openApiDocs = require('./openapi');
const strongPassword = require('./passwordUtils');
const acolhidoRoutes = require('./routes/acolhidoRoutes');

const app = Fastify({ logger: true });
const PORT = process.env.PORT || 3333;

app.get('/', async (request, reply) => {
    reply.send({ message: 'Servidor online!' });
  });

app.register(fastifycors);

app.register(fastifyJwt, {
    secret: strongPassword
});

// Middleware de autenticação
app.decorate("authenticate", async (request, reply) => {
    try {
        await request.jwtVerify();
    } catch (err) {
        reply.send(err);
    }
})

app.register(swagger, openApiDocs);
app.register(swaggerui, openApiDocs);

// Registre suas rotas aqui:
app.register(acolhidoRoutes, { prefix: '/api' });
app.register(userRoutes, { prefix: '/api' });
app.register(authRoutes, { prefix: '/api/auth' });

// Iniciar o servidor 
app.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`Server is running on port ${PORT} at ${address}`); 
});
