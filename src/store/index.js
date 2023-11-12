import { createStore } from "vuex";

export default createStore({
  state: {
    showSideMenu: true,
    isLoading: false,
    user: { name: "Guest User", role: "Guest" },
    token: "",
  },
  mutations: {
    toggleSideMenu(state) {
      state.showSideMenu = !state.showSideMenu;
    },
    toggleLoading(state) {
      state.isLoading = !state.isLoading;
    },
    setToken(state, { token }) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    setUser(state, { user }) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout(state) {
      state.user = { name: "Guest User", role: "Guest" };
      state.token = "";

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  actions: {},
  getters: {},
});
