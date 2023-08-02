<template>
  <div>
    <!-- Formulário para adicionar uma nova tarefa -->
    <h1>Task Manager</h1>
    <div class="form-card">
      <input v-model="newTaskTitle" type="text" placeholder="Título da Tarefa">
      <input v-model="newTaskDescription" type="text" placeholder="Descrição">
      <button @click="addTask">Adicionar Tarefa</button>
    </div>

    <!-- Lista de tarefas -->
    <div class="task-container">
      <div v-for="task in tasks" :key="task._id" class="task-card">
        <h2 v-if="!isEditing || task._id !== editedTaskId">Tarefa:</h2>
        <input
          v-else
          v-model="editedTaskTitle"
          type="text"
          :placeholder="task.title"
          :class="{ 'edited-input': isEditing }" 
        >
        <span v-if="!isEditing || task._id !== editedTaskId">{{ task.title }}</span>

        <h2 v-if="!isEditing || task._id !== editedTaskId">Descrição:</h2>
        <input
          v-else
          v-model="editedTaskDescription"
          type="text"
          :placeholder="task.description"
          :class="{ 'edited-input': isEditing }"
        >
        <span v-if="!isEditing || task._id !== editedTaskId">{{ task.description }}</span>

        <div>
          <button v-if="!isEditing" @click="startEditTask(task._id)">
            <font-awesome-icon :icon="currentIcon" />
          </button>
          <button v-else @click="saveEditedTask">
            <font-awesome-icon :icon="currentIcon" />
          </button>
          <button @click="deleteTask(task._id)">
            <font-awesome-icon icon="trash-alt" />
          </button>
          <button @click="toggleTaskStatus(task._id, task.status)">
            <font-awesome-icon :icon="getTaskIcon(task)" />
            <span>{{ task.status === 'concluída' ? '' : '' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tasks: [],
      newTaskTitle: '',
      newTaskDescription: '',
      isEditing: false,
      editedTaskId: null,
      editedTaskTitle: '',
      editedTaskDescription: '',
      editedTaskStatus: '', 
      currentIcon: 'edit',
    };
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    fetchTasks() {
      axios
        .get('http://localhost:5000/tasks')
        .then((response) => {
          this.tasks = response.data;
          // Inverte a ordem das tarefas (do mais recente ao mais antigo)
          this.tasks.reverse();
        })
        .catch((error) => {
          console.error('Erro ao buscar tarefas:', error);
        });
    },
    addTask() {
      const newTask = {
        title: this.newTaskTitle,
        description: this.newTaskDescription,
      };

      axios
        .post('http://localhost:5000/tasks', newTask)
        .then((response) => {
          // Adicionar a nova tarefa no início da lista (unshift())
          this.tasks.unshift(response.data);

          this.newTaskTitle = '';
          this.newTaskDescription = '';
        })
        .catch((error) => {
          console.error('Erro ao adicionar tarefa:', error);
        });
    },
    editTask(taskId, newTitle, newDescription) {
      // Faz uma requisição PUT para atualizar uma tarefa
      const updatedTask = {
        title: newTitle,
        description: newDescription,
      };

      axios
        .put(`http://localhost:5000/tasks/${taskId}`, updatedTask)
        .then((response) => {
          // Atualiza a tarefa na lista de tarefas com os novos dados
          const index = this.tasks.findIndex((task) => task._id === taskId);
          if (index !== -1) {
            this.tasks[index] = response.data;
          }
        })
        .catch((error) => {
          console.error('Erro ao atualizar tarefa:', error);
        });
    },
    deleteTask(taskId) {
      // Exibe uma mensagem de confirmação antes de excluir a tarefa
      const confirmDelete = window.confirm("Tem certeza que deseja excluir esta tarefa?");

      if (confirmDelete) {
        // Faz uma requisição DELETE para remover a tarefa
        axios
          .delete(`http://localhost:5000/tasks/${taskId}`)
          .then(() => {
            // Remove a tarefa excluída da lista de tarefas
            this.tasks = this.tasks.filter((task) => task._id !== taskId);
          })
          .catch((error) => {
            console.error('Erro ao excluir tarefa:', error);
          });
      }
  },
    toggleTaskStatus(taskId, status) {
        const updatedStatus = status ? 'pendente' : 'concluída';

        const updatedTask = {
          status: updatedStatus,
        };

        axios
          .put(`http://localhost:5000/tasks/${taskId}`, updatedTask)
          .then((response) => {
            // Atualiza a tarefa na lista de tarefas com os novos dados
            const index = this.tasks.findIndex((task) => task._id === taskId);
            if (index !== -1) {
              this.tasks[index] = response.data;
            }
          })
          .catch((error) => {
            console.error('Erro ao atualizar status da tarefa:', error);
          });
      },


    formatDate(dateString) {
      const date = new Date(dateString);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    },

    startEditTask(taskId) {
      // Busca a tarefa pelo ID para obter os valores atuais do título e descrição
      const task = this.tasks.find((task) => task._id === taskId);
      if (task) {
        // Armazena os valores atuais da tarefa nas variáveis de edição
        this.editedTaskId = task._id;
        this.editedTaskTitle = task.title;
        this.editedTaskDescription = task.description;
        this.isEditing = true; // Define a flag de edição para true
        this.currentIcon = 'check-circle'; // Altera o ícone para "check-circle" quando entra em modo de edição
      }
    },

    saveEditedTask() {
      // Faz uma requisição PUT para atualizar a tarefa
      const updatedTask = {
        title: this.editedTaskTitle,
        description: this.editedTaskDescription,
      };

      axios
        .put(`http://localhost:5000/tasks/${this.editedTaskId}`, updatedTask)
        .then((response) => {
          // Atualiza a tarefa na lista de tarefas com os novos dados
          const index = this.tasks.findIndex((task) => task._id === this.editedTaskId);
          if (index !== -1) {
            this.tasks[index] = response.data;
          }
          // Limpa as variáveis de edição e redefine a flag de edição para false
          this.editedTaskId = null;
          this.editedTaskTitle = '';
          this.editedTaskDescription = '';
          this.isEditing = false; // Define a flag de edição para false
          this.currentIcon = 'edit'; // Altera o ícone de volta para "edit" após salvar a tarefa editada
        })
        .catch((error) => {
          console.error('Erro ao atualizar tarefa:', error);
        });
    },

    getTaskIcon(task) {
      return task.status === 'concluida' ? 'check-circle' : 'circle';
    },
  },
};
</script>

<style>
body {
  background-image: url(../dist/img/bg.52d990f9.jpg);
  background-size: 150%;
  background-position: center;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

/* Estilo do card do formulário */
.form-card {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  color: white;
  background-color: black;
  border: 1px solid #0a4847; 
  border-radius: 5px;
  display: flex;
  flex-direction: column; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
}

.form-card input,
.form-card button {
  margin: 5px 0;
}

.form-card input{
  border-radius: 5px;
  text-align: center;
}

/* Container para as tasks */
.task-container {
  display: flex;
  flex-wrap: wrap;
  margin: 20px 100px;
  justify-content: space-between;
}

/* Estilo do card da task */
.task-card {
  width: 200px; 
  height: 150px; 
  margin: 10px 0;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #0a4847; 
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  flex: 0 0 200px; 
  box-sizing: border-box; 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
}

/* Estilo dos botões  */
.form-card button,
.task-card button {
  background-color: #0a4847; 
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  display: inline-block; 
  align-items: center;
  margin: 2px;
  justify-content: center;
}

.form-card button:hover,
.task-card button:hover{
  transform: scale(1.1);
  background-color: #083534;
}

/* Estilo dos textos */
h2{
  font-size: 16px;
  margin: 0;
}

h1{
  font-size: 50px;
  margin: 2rem 0;
  color: white;
  display: flex;
  justify-content: center;
}

span{
  font-size: 10px;
  color: gray;
  margin: 0;
}

/* Estilo do input ao editar */
.edited-input {
    width: 100px; 
    border-radius: 5px;
    border-color: rgb(229, 229, 229);
  }

@media screen and (max-width: 600px) {
  .task-card {
    max-width: 100%; 
  }
  
}
</style>

