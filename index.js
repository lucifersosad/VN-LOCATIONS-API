const fastify = require('fastify')({ logger: true });
const { pad0 } = require('./utils');

require('dotenv').config();

// Đăng ký plugin CORS với cấu hình mặc định
fastify.register(require('@fastify/cors'));

const tinhThanh = require('./data/tinh_tp.json');
const quanHuyen = require('./data/quan_huyen.json');

fastify.get('/', async (request, reply) => {
  reply.code('404').send("What you're looking for is not here.");
});

fastify.get('/ping', async (request, reply) => {
  return { pong: 'It worked!' };
});

fastify.get('/city', async (request, reply) => {
  return {
    data: Object.values(tinhThanh),
    code: 200
  };
});

fastify.get('/city/:code', async (request, reply) => {
  try {
    const code = pad0(request.params.code, 2);
    const quanHuyen = require(`./data/quan-huyen/${code}.json`);
    return {
      data: Object.values(quanHuyen),
      code: 200
    };
  } catch (err) {
    reply.code('404').send({ message: 'Mã tỉnh thành không tồn tại!' });
  }
});

fastify.get('/district', async (request, reply) => {
  return {
    data: Object.values(quanHuyen),
    code: 200
  };
});

fastify.get('/district/:code', async (request, reply) => {
  try {
    const code = pad0(request.params.code, 3);
    const xaPhuong = require(`./data/xa-phuong/${code}.json`);
    return {
      data: Object.values(xaPhuong),
      code: 200
    };
  } catch (err) {
    reply.code('404').send({ message: 'Mã quận huyện không tồn tại!' });
  }
});

const start = async () => {
  try {
    await fastify.listen({
      port: parseInt(process.env.PORT, 10) || 3000,
      host: process.env.HOST || '127.0.0.1'
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
