<template>
  <h1 style="text-align: center;"
    >System Status:
    <span :class="{
      'ups': system_status === 'UP',
      'downs': system_status === 'DOWN',
      'degraded': system_status === 'DEGRADED'
    }">
      {{system_status }}
    </span>
    </h1>
  <div class="status-container">
    <div class="card" :class="{'up': dbStatus === 'UP', 'down': dbStatus === 'DOWN'}">
      <h3>MongoDB</h3>
      <p>{{ dbStatus === 'UP' ? 'Status: UP' : 'Status: DOWN' }}</p>
      <p v-if="dbStatus === 'DOWN'" class="message">Error: {{ dbMessage }}</p>
      <p>Time: {{ dbTime }}ms</p>
    </div>

    <div class="card" :class="{'up': rabbitStatus === 'UP', 'down': rabbitStatus === 'DOWN'}">
      <h3>RabbitMQ</h3>
      <p>{{ rabbitStatus === 'UP' ? 'Status: UP' : 'Status: DOWN' }}</p>
      <p v-if="rabbitStatus === 'DOWN'">Error: {{ rabbitMessage }}</p>
      <p>Time: {{ rabbitTime }}ms</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dbStatus: "",
      rabbitStatus: "",
      dbMessage: "",
      rabbitMessage: "",
      dbTime: "",
      rabbitTime: "",
      system_status: "UP"
    };
  },
  mounted() {
    this.checkHealthStatus();
  },
  methods: {
    async checkHealthStatus() {
      try {
        const response = await axios.get("http://localhost:3000/healthcheck");
        
        const data = response.data;
        
        this.dbTime = data.mongo.time
        this.rabbitTime = data.rabbit.time

        this.dbStatus = data.mongo.status;
        if (this.dbStatus === "DOWN" && data.mongo.message) {
          this.dbMessage = data.mongo.message;
          this.system_status = "DEGRADED"
        }
        
        this.rabbitStatus = data.rabbit.status;
        if (this.rabbitStatus === "DOWN" && data.rabbit.message) {
          this.rabbitMessage = data.rabbit.message;
          this.system_status = "DEGRADED"
        }

        if (this.rabbitStatus === "DOWN" && this.dbStatus === "DOWN") {
          this.system_status = "DOWN"
        }

        if(this.rabbitStatus === "UP" && this.dbStatus === "UP") {
          this.system_status = "UP"
        }
        console.log(data)
      } catch (error) {
        console.log(data)
        console.error("Erro ao acessar o status da API:", error);
        this.dbMessage = "Erro ao conectar com o MongoDB.";
        this.rabbitMessage = "Erro ao conectar com o RabbitMQ.";
      }
    },
  },
};
</script>

<style scoped>
.status-container {
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
}

.card {
  width: 200px;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.card h3 {
  margin-bottom: 10px;
  font-size: 1.5rem;
}

.ups {
  color: green;
}

.degraded {
  color: lightcoral;
}

.downs {
  color: red;
}

.card p {
  font-size: 1rem;
  font-weight: bold;
  margin-top: 10px;
}

.card .message {
  font-size: 0.9rem;
  color: white; /* erro */
  margin-top: 10px;
}

.up {
  background-color: #4CAF50;
  color: white;
}

.down {
  background-color: #f44336;
  color: white;
}
</style>
