import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const authUrl = 'http://localhost:4000/api';

export default new Vuex.Store({
   state: {
    // User
    user: JSON.parse(localStorage.getItem('user')) || null,
  },
  mutations: {
    // Users
    auth_success(state, user) {
      state.status = 'success';
      state.user = user;
    },
    auth_error(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      state.user = null;
    },

  },
  actions: {
    // User
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios({ url: `${authUrl}/auth/login`, data: user, method: 'POST' })
          .then((resp) => {
            console.log(resp.data.result);
            localStorage.setItem('user', JSON.stringify(resp.data.result));
            commit('auth_success', resp.data.result);
            resolve(resp);
          })
          .catch((err) => {
            console.log(err);
            commit('auth_error');
            localStorage.removeItem('token');
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios({ url: `${authUrl}/auth/register`, data: user, method: 'POST' })
          .then((resp) => {
            console.log(resp.data.result);
            localStorage.setItem('user', JSON.stringify(resp.data.result));
            commit('auth_success', resp.data.result);
            resolve(resp);
          })
          .catch((err) => {
            console.log(err);
            commit('auth_error', err);
            localStorage.removeItem('token');
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout');
        localStorage.removeItem('user');
        resolve();
      });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    getUser: (state) => state.user,
  },
  modules: {
  },


});
