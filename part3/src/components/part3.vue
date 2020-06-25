<template>
  <div class="todo">
    <form id="add" @submit.prevent="submitTask">
      <input
        type="text"
        class="task-field"
        placeholder="Task Name"
        name="description"
        v-model="newTask.description.value"
        :class="{ 'error' : newTask.description.error }"
      />
      <input 
        type="text"
        placeholder="Category"
        name="category"
        v-model="newTask.category.value"
        :class="{ 'error' : newTask.category.error }"
      />
      <input 
        type="text"
        placeholder="User"
        name="user"
        v-model="newTask.user.value"
        :class="{ 'error' : newTask.user.error }"
      />
      <input 
        type="date"
        placeholder="Date Due (yyyy-mm-dd)"
        name="date"
        v-model="newTask.due_date.value"
        :class="{ 'error' : newTask.due_date.error }"
      />
      <button class="submit-button" type="submit">Add Task</button>
      <p v-if="errors" class="error-message">Please complete the fields highlighed above</p>
    </form>
    <ul class="task-list">
      <task 
        v-for="task in tasks"
        :key="task.task_uuid"
        :task="task"
      />
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import task from '@/components/task'


const initialForm = {
  description: {
    value: "",
    error: false
  },
  category: {
    value: "",
    error: false
  },
  user: {
    value: "",
    error: false
  },
  due_date: {
    value: "",
    error: false
  }
}

export default {
  name: "Part3",
  data() {
    return {
      newTask: initialForm
    };
  },
  components: {
    task
  },
  created() {
    this.fetchTasks()
  },
  methods: {
    submitTask() {
      Object.keys(this.newTask).forEach(key => {
        if (this.newTask[key].value.trim().length === 0) {
          this.newTask[key].error = true
        } else {
          this.newTask[key].error = false
        }  
      })
      if (!this.errors) {
        const values = Object.keys(this.newTask).reduce((acc, key) => {
          return {
            ...acc,
            [key]: this.newTask[key].value
          }
        }, {})
        this.addTask(values)
        this.resetForm();
      }
    },
    resetForm() {
      this.newTask = initialForm;
    },
    ...mapActions(['fetchTasks', 'addTask'])
  },
  computed: {
    numOfTasks() {
      return this.tasks.length;
    },
    errors() {
      return Object.values(this.newTask).some(field => field.error)
    },
    ...mapState(['tasks'])
  }
};
</script>

<style scoped>

form {
  background: var(--blue-medium);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 10px 6px -10px black;
  text-align: center;
  margin-bottom: 20px; 
}

input {
  display: block;
  border: 2px solid var(--blue-dark);
  width: 100%;
  margin-bottom: 10px;
  height: 30px;
  background: var(--white);
  padding: 10px;
  box-shadow: 0 10px 6px -10px black;
}

input:focus {
  outline: 3px solid var(--blue-dark);
}

.submit-button {
  width: 100%;
  color: white;
  margin-bottom: 10px;
}

.error-message {
  color: var(--white);
  background-color: var(--red);
  border-radius: 5px;
  padding: 5px;
  box-shadow: 0 10px 6px -10px black;
}

.task-field {
  width: 100%;
}

.todo {
  width: 95%;
  margin: 0 auto;
}

.error {
  border: 2px solid var(--red);
}

/* .task-item {
  list-style: none;
  padding: 0.5rem 0;
}

.task-item input {
  display: none;
}

.task-list .task-item input[type="checkbox"]:checked + label .task-text {
  text-decoration: line-through;
} */
</style>