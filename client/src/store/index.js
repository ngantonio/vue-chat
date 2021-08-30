import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const authUrl = 'http://localhost:4000/api';

export default new Vuex.Store({
   state: {
    // User
    user: JSON.parse(localStorage.getItem('user')) || null,
    onlineUsers: [],
    messages: [],
    chatMessages: [],
    searchContext: false,
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
    setOnlineUsers(state, userList) {
      state.onlineUsers = userList;
    },

    pushNewMessage(state, newMessage) {
      state.chatMessages.push(newMessage);
      if (!state.searchContext) {
        state.chatMessages = state.messages;
      }
      
    },
    setChatList(state, chatList) {
      state.messages = chatList;
      state.chatMessages = state.messages;
      state.searchContext = false
    },
    setResultList(state, resultList) {
      state.messages = resultList
      state.searchContext = true
    },
    switchToChat(state) {
      state.messages = state.chatMessages
      state.searchContext = false
      console.log(state.messages);
    }


  },
  actions: {
    // User
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios({ url: `${authUrl}/auth/login`, data: user, method: 'POST' })
          .then((resp) => {
            localStorage.setItem('user', JSON.stringify(resp.data.result));
            commit('auth_success', resp.data.result);
            resolve(resp);
          })
          .catch((err) => {
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
            localStorage.setItem('user', JSON.stringify(resp.data.result));
            commit('auth_success', resp.data.result);
            resolve(resp);
          })
          .catch((err) => {
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
    setOnlineUsers({ commit }, userList) {
      commit('setOnlineUsers', userList);
    },

    addNewMessage({ commit }, message) {
      commit('pushNewMessage', message)
    },

    setSearchContext({ commit }, resultList) {
      commit('setResultList', resultList)
    },
    setLiveChatContext({ commit }, chatList) {
      console.log(chatList);
      commit('setChatList', chatList);

    },
    switchContext({ commit }){
      commit('switchToChat');
    }
    
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    getUser: (state) => state.user,
    onlineUsers: (state) => state.onlineUsers,
    allMessages: (state) => state.messages,
    searchContext: (state) => state.searchContext
  },
  modules: {
  },


});
