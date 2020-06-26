<template>
  <div class="todo">
    <h1 class="title">The Big List</h1>
    <form id="add" @submit.prevent="submitTask">
      <div class="fields">
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
      </div>
      <button class="submit-button" type="submit">Add Task</button>
      <p v-if="errors" class="error-message">Please complete the fields highlighed above</p>
    </form>
    <filters v-if="numOfTasks > 0" @clicked="onFilterClick" :fields="fields" :filters="filters" />
    <ul class="task-list">
      <task 
        v-for="task in sortedTasks"
        :key="task.task_uuid"
        :task="task"
      />
    </ul>
    <p class="no-tasks-message" v-if="numOfTasks === 0">Add a task above to get started!</p>
    <p class="no-tasks-message" v-if="allTasksFiltered">All tasks filtered, please change filter settings to view tasks</p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import task from '@/components/task'
import filters from '@/components/filters'

export default {
  name: "Part3",
  data() {
    return {
      newTask: {
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
      },
      filters: {
        field: "due_date",
        ascending: true,
        hideOld: false,
        hideCompleted: false
      }
    };
  },
  components: {
    task,
    filters
  },
  created() {
    this.fetchTasks()
  },
  computed: {
    numOfTasks() {
      return this.tasks.length;
    },
    allTasksFiltered () {
      return this.numOfTasks > 0 && this.sortedTasks.length === 0;
    },
    errors() {
      return Object.values(this.newTask).some(field => field.error);
    },
    sortedTasks() {
      const fieldToSort = this.filters.field;
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      if (this.tasks.length > 0) {
        return [...this.tasks]
        .filter(task => {
          if (this.filters.hideOld) {
            const [dueYear, dueMonth, dueDay] = task.due_date.split('-');
              if (+dueYear > year) {
                return true;
              } else if (+dueYear === year) {
                if (+dueMonth > month) {
                  return true;
                } else if (+dueMonth === month) {
                  if (+dueDay >= day) {
                    return true;
                  }
                } else { return false }
              } else { return false } 
          } else {
            return true;
          }
        })
        .filter(task => {
          return this.filters.hideCompleted ? !task.status : true;
        })
        .sort((a, b) => {
          return this.filters.ascending ? 
            a[fieldToSort].localeCompare(b[fieldToSort]) :
            b[fieldToSort].localeCompare(a[fieldToSort])
        })
      } else {
        return [];
      }
    },
    ...mapState({
      tasks: state => state.tasks,
      fields: state => state.fields,
    })
  },
  methods: {
    onFilterClick(obj) {
      this.filters = {
        ...this.filters,
        ...obj
      }
    },
    submitTask() {
      Object.keys(this.newTask).forEach(key => {
        if (this.newTask[key].value.trim().length === 0) {
          this.newTask[key].error = true;
        } else {
          this.newTask[key].error = false;
        }  
      })
      if (!this.errors) {
        const values = Object.keys(this.newTask).reduce((acc, key) => {
          return {
            ...acc,
            [key]: this.newTask[key].value
          }
        }, {})
        this.addTask(values);
        this.resetForm();
      }
    },
    resetForm() {      
      Object.keys(this.newTask).forEach(key => {
        this.newTask[key] = {
          value: "",
          error: false
        };
      })
    },
    ...mapActions(['fetchTasks', 'addTask'])
  },
};
</script>

<style scoped>
.title {
  text-align: center;
  color: var(--white);
  margin-bottom: 20px;
}

form {
  background: var(--blue-medium);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 10px 6px -10px var(--black);
  text-align: center;
  margin-bottom: 20px; 
}

.fields {
  display: flex;
  flex-direction: column;
}

@media(min-width: 600px) {
  .fields {
    flex-direction: row;
    justify-content: space-between;
    flex-flow: wrap;
  }
}

input {
  display: block;
  border: 2px solid var(--blue-dark);
  width: 100%;
  margin-bottom: 10px;
  height: 30px;
  background: var(--white);
  padding: 10px;
  box-shadow: 0 10px 6px -10px var(--black);
}

@media(min-width: 600px) {
  input {
    width: 49%;
    display: block;
  }
}

input:focus {
  outline: 3px solid var(--blue-dark);
}

.submit-button {
  width: 100%;
  color: var(--white);
  margin-bottom: 10px;
}

.submit-button:hover {
  box-shadow: inset 0 0 4px var(--white);
}

.error-message {
  color: var(--white);
  background-color: var(--red);
  border-radius: 5px;
  padding: 5px;
  box-shadow: 0 10px 6px -10px black;
}

.todo {
  width: 95%;
  margin: 0 auto;
}

.error {
  border: 2px solid var(--red);
}

.no-tasks-message {
  color: var(--white);
  text-align: center;
}
</style>