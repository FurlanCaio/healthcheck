const amqplib = require('amqplib');

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Connection timeout')), ms))
  ]);
}

async function checkConnectionChannelRabbit() {
  const startTime = Date.now();
  let connection;
  let channel;
  try {
    connection = await withTimeout(amqplib.connect('amqp://localhost'), 200);
    channel = await withTimeout(connection.createChannel(),200);

    const queue = 'healthcheck';
    await withTimeout(channel.assertQueue(queue, { durable: true }), 200);
    console.log(`Fila "${queue}" verificada com sucesso!`);

    const endTime = Date.now();
    const time = endTime - startTime;

    const message = { status: 'UP', time };
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
    console.log(`Mensagem enviada para a fila "${queue}": ${JSON.stringify(message)}`);

    await channel.close().catch(() => {});
    await connection.close().catch(() => {});

    return { status: 'UP', time };
  } catch (err) {
    const endTime = Date.now();
    const time = endTime - startTime;

    if (channel) {
      try { await channel.close(); } catch (_) {}
    }
    if (connection) {
      try { await connection.close(); } catch (_) {}
    }

    return { status: 'DOWN', time, message: err.message || err.code };
  }
}

module.exports = checkConnectionChannelRabbit
