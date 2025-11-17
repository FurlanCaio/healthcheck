🩺 HealthCheck Service – Monitoramento de Dependências em Tempo Real

Este projeto é uma API de Health Check desenvolvida com Node.js + Express, criada para monitorar o status de serviços externos essenciais ao funcionamento de um sistema.
O objetivo é validar a disponibilidade e conectividade de dependências críticas e retornar um relatório centralizado e confiável.

O projeto também inclui uma funcionalidade opcional de alerta automático por e-mail, acionado quando múltiplas dependências estão fora do ar simultaneamente.

🔍 Funcionalidades

✔ Endpoint único /healthcheck que verifica o status de todas as dependências
✔ Teste de conexão com MongoDB
✔ Teste de conexão com RabbitMQ
✔ Resposta em formato JSON com status de cada serviço
✔ Cálculo do status geral da aplicação
✔ Envio de e-mail caso múltiplas dependências retornem DOWN

🧠 Motivação

Este projeto foi criado com foco em:

Observabilidade
Alta disponibilidade
Arquitetura resiliente
Boas práticas de sistemas distribuídos
Um healthcheck bem implementado permite que aplicações detectem falhas antes do usuário final sentir o impacto, reduzindo downtime e acelerando o processo de diagnóstico.

🚀 Tecnologias utilizadas
Tecnologia	Função
Node.js / Express	Backend da API
MongoDB	Banco de dados
RabbitMQ	Mensageria
Axios / Fetch	Verificação da API externa
Nodemailer	Envio de alertas por e-mail
Docker	Container para o RabbitMQ

📦 Requisitos antes de rodar

Clonar o repositório
git clone https://github.com/FurlanCaio/healthcheck.git
cd healthcheck-service

🐇 Subindo o RabbitMQ com Docker

Caso não tenha o RabbitMQ rodando, execute:

docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:4-management

▶ Como rodar o projeto

Instalar dependências:

npm install

Rodar a aplicação:

npm run dev (frontend), node app (backend)

🧪 Como testar

Chamando o endpoint de health:

GET http://localhost:3000/healthcheck


Resposta esperada:

{
  "mongo": {
    "status": "UP",
    "time": tempo em ms( exemplo: 53)
  },
  "rabbit": {
    "status": "UP",
    "time": tempo em ms ( exemplo: 22)
  }
}

✉ Alerta por e-mail

O alerta é enviado automaticamente quando todas dependências estão DOWN.

(Necessário configuração, olhar no arquivo .env)

🗺 Próximas melhorias (roadmap)

Logging estruturado com Winston / Pino
Dashboard visual de monitoramento
Suporte para Redis, PostgreSQL e Kafka
Armazenamento histórico dos healthchecks
Métricas para Prometheus

🏆 O que foi aprendido neste projeto

🔹 Conexão com múltiplos serviços externos
🔹 Boas práticas de observabilidade
🔹 Monitoramento de dependências e sistemas distribuídos
🔹 Arquitetura resiliente e tratamento de falhas
🔹 Validação de serviços via ping aplicacional
🔹 Uso de Docker para mensageria
🔹 Automação de notificação por e-mail

⭐ Se gostou, deixe uma estrela no repositório!
