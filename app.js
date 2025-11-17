require("dotenv").config()
const express = require("express")
const app = express();
const cors = require("cors")

const checkConnectionMongoDB = require("./banco/banco");
const checkConnectionChannelRabbit = require("./rabbitmq/queueProducer");
const sendEmail = require("./utils/sendEmail")

app.use(cors());

app.get("/healthcheck", async (req, res) => {
  try {
    const dbStatus = await checkConnectionMongoDB();
    const rabbitStatus = await checkConnectionChannelRabbit();

    if (dbStatus.status === "DOWN" && rabbitStatus.status === "DOWN") {
      const msg = `
        🚨 ALERTA — TODAS AS DEPENDÊNCIAS ESTÃO FORA DO AR

        MongoDB → DOWN (${dbStatus.message})
        RabbitMQ → DOWN (${rabbitStatus.message})

        Horário do incidente: ${new Date().toLocaleString()}
      `;
      
      sendEmail("🚨 ALERTA — Sistema indisponível", msg).catch(console.error);
    }
    
    res.status(200).json({
      mongo: dbStatus,
      rabbit: rabbitStatus
    });
  } catch (error) {
    console.error("Erro ao verificar status de dependências:", error);
    
    res.status(500).json({
      mongo: { status: 'DOWN', message: 'Erro ao conectar ao MongoDB' },
      rabbit: { status: 'DOWN', message: 'Erro ao conectar ao RabbitMQ' }
    });
  }
});


app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})