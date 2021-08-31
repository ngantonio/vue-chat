import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const authUrl = 'http://localhost:4000/api';

export default new Vuex.Store({
   state: {
    /** GLOBAL USER VARIABLES  */
    user: JSON.parse(localStorage.getItem('user')) || null,
    onlineUsers: [],

    /** GLOBAL MESSAGE VARIABLES  */

    /** 
     * CONTEXTO: Hay dos posibilidades de obtener mensajes, dos contextos:
     * - El historial de mensajes junto a los mensajes que van llegando en tiempo real
     * - Los mensajes resultantes luego de una busqueda.
     * 
     * Ambos deben renderizarse en el mismo contenedor, bajo el mismo ciclo, pero en contextos diferentes.
     * 
     * Cuando el usuario se encuentra observando el resultado de su búsqueda, el socket sigue escuchando los
     * mensajes entrantes, por esto, esos mensajes deben irse encolando en una lista, aunque esta no sea la
     * que se está renderizando al momento.
     * 
     * Por ello se tiene:
     * 
     * 1. Una lista global de mensajes que se itera en el componente MessageList, según el contexto, 
     *    va a contener la lista del historial de mensajes y la lista de los mensajes resultantes de la búsqueda
     * 2. Una lista local que va a contener solo el historial de mensajes y se irá actualizando cada vez que llega uno nuevo.
     */
    messages: [],         // 1
    chatMessages: [],     // 2
    searchContext: false, // Indica el contexto
  },
  mutations: {

    /** GLOBAL USER MUTATIONS  */
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

    /** GLOBAL MESSAGE MUTATIONS  */

    /** Cada vez que llegue un mensaje en tiempo real, se agrega a la lista chatMessages
     * pero, si el usuario está observando los resultados de su búsqueda, no quiere ver 
     * los nuevos mensajes alli, puesto que no está observando el timeline en ese momento.
     */
    pushNewMessage(state, newMessage) {
      state.chatMessages.push(newMessage);
      if (!state.searchContext) {
        state.messages = state.chatMessages
      }
    },
    /** Se ejecuta cuando se recupera el historial de mensajes de la base de datos,
     * antes de escuchar el socket; chatList es el resultado de la consulta que
     * se asigna a ambas listas.
     */
    setChatList(state, chatList) {
      state.messages = chatList;
      state.chatMessages = state.messages;
      state.searchContext = false
    },
    /** Se ejecuta cuando el usuario quiere hacer una búsqueda en el chat. 
     * resultList es un arreglo con todas las coincidencias de lo que el usuario escribió
     * y se asigna a *messages para que pueda ser renderizada en la vista de inmediato.
     * Cuando esto pasa, estamos en el contexto de busqueda.
     */
    setResultList(state, resultList) {
      state.messages = resultList
      state.searchContext = true
    },
    /** Se ejecuta cuando el usuario presiona *back, luego de realizar una búsqueda,
     * la variable chatMessages que sigue conteniendo el historial de mensajes y los
     * que han ido llegando, se vuelve a asignar a *messages para ser renderizados.
     * Se desactiva el contexto de búsqueda.
     */
    switchToChat(state) {
      state.messages = state.chatMessages
      state.searchContext = false
    }


  },
  actions: {
    /** GLOBAL USER ACTIONS  */

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


    /** Llena una lista global con todos los usuarios del chat en tiempo real */
    setOnlineUsers({ commit }, userList) {
      commit('setOnlineUsers', userList);
    },

    /** MESSAGE USER ACTIONS  */

    addNewMessage({ commit }, message) {
      commit('pushNewMessage', message)
    },
    setSearchContext({ commit }, resultList) {
      commit('setResultList', resultList)
    },
    setLiveChatContext({ commit }, chatList) {
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
