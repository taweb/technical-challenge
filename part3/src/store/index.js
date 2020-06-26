import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    fields: [
      {
        type: 'description',
        label: 'Task Name'
      },
      {
        type: 'category',
        label: 'Category'
      },
      {
        type: 'user',
        label: 'User'
      },
      {
        type: 'due_date',
        label: 'Due Date'
      }
    ]
  },
  mutations: {
    SET_TASKS(state, payload) {
      state.tasks = payload;
    },
    SET_TASK(state, payload) {
      state.tasks.push(payload);
    },
    PUT_TASK(state, payload) {
      state.tasks = state.tasks.map(task => {
        return task.task_uuid === payload.task_uuid ? payload : task;
      });
    },
    DELETE_TASK(state, id) {
      state.tasks = state.tasks.filter(task => task.task_uuid !== id);
    }
  },
  actions: {
    async fetchTasks({ commit }) {
      try {
        const result = await fetch('http://localhost:8080/DelightedDingo/api/tasks/')
        const data = await result.json();
        commit('SET_TASKS', data);
      } catch (err) {
        console.log(err);
      }
    },
    async addTask({ commit }, payload) {
      try {
        const result = await fetch('http://localhost:8080/DelightedDingo/api/tasks/',
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(payload)
          }
        );
        const data = await result.json();
        commit('SET_TASK', data);
      } catch (err) {
        console.log(err);
      }
    },
    async checkTask({ commit }, payload) {
      try {
        const result = await fetch('http://localhost:8080/DelightedDingo/api/tasks/',
          {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(payload)
          }
        );
        const data = await result.json();
        commit('PUT_TASK', data);
      } catch (err) {
        throw new err;
      }
    },
    async deleteTask({ commit }, id) {
      const payload = {
        task_uuid: id
      };
      try {
        const result = await fetch('http://localhost:8080/DelightedDingo/api/tasks/',
          {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(payload)
          }
        )
        if (result.status === 200) {
          commit('DELETE_TASK', id);
        } else {
          throw "Error deleting task";
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  modules: {}
});