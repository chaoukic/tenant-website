import AuthService from '../services/auth-service';

const user = JSON.parse(localStorage.getItem('user'));
const value = JSON.parse(localStorage.getItem('value'));
const initialState = user && value
  ? { status: { loggedIn: true }, user, value}
  : { status: { loggedIn: false }, user: null , token:null}

  export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
      login({ commit }, user) {
        return AuthService.login(user).then(
          user => {
            commit('loginSuccess', user, user.token);
            return Promise.resolve(user);
          },
          error => {
            commit('loginFailure');
            return Promise.reject(error);
          }
        );
      },
      logout({ commit }) {
        AuthService.logout();
        commit('logout');
      },
      register({ commit }, user) {
        return AuthService.register(user).then(
          response => {
            commit('registerSuccess');
            return Promise.resolve(response.data.data);
          },
          error => {
            commit('registerFailure');
            return Promise.reject(error);
          }
        );
      }
    },
    mutations: {
      loginSuccess(state, user, token) {
        state.status.loggedIn = true;
        state.user = user;
        state.token= token
      },
      loginFailure(state) {
        state.status.loggedIn = false;
        state.user = null;
        state.token = null
      },
      logout(state) {
        state.status.loggedIn = false;
        state.user = null;
        state.token = null
      },
      registerSuccess(state) {
        state.status.loggedIn = false;
      },
      registerFailure(state) {
        state.status.loggedIn = false;
      }
    }
  };