import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listCategories: [],
    currentCategory: {},
    messagesInfo: [],
    listOpen: [],
    filter: {
      query: "",
      state: 1,
      sortAlpha: 1,
      sortTime: 1,
      stateSort:false,
    },
    allOpenOrCloseList: false,
  },
  mutations: {
    GET_LIST_CATEGORIES(state, category) {
      state.listCategories = category;
    },
    SET_CURRENT_CATEGORY(state, category) {
      state.currentCategory = category;
    },

    /* Modal Controls */
    OPEN_MODALS(state, modal) {
      state.listOpen.unshift(modal);
      console.log(modal);
    },
    CLOSE_MODALS(state, modal) {
      state.listOpen = state.listOpen.filter((e) => {
        e !== modal;
        console.log(e);
      });
    },
    SET_MESSAGE(state, msg) {
      state.messagesInfo = msg;
    },
    SET_QUERY(state, query) {
      state.filter.query = query;
    },
    SET_STATE(state) {
      console.log(state);
      state.filter.state = !state.filter.state;
    },
    SET_ALL_OPEN_OR_CLOSE_LIST(state) {
      state.allOpenOrCloseList = !state.allOpenOrCloseList;
    },
    SET_SORT_ALPHA(state, sort) {
      state.filter.sortAlpha = sort;
    },
    SET_SORT_TIME(state, sort) {
      state.filter.sortTime = sort;
    },
  },
  actions: {
    getListCategories({ commit }) {
      axios
        .get(`category/list`)
        .then((res) => {
          /* console.log(res.data);
        console.log(res); */
          /* console.log(JSON.parse(res.request.response)); */
          commit("GET_LIST_CATEGORIES", res.data);
        })
        .catch((e) => console.log(e));
    },

    createCategory({ dispatch }, category) {
      axios
        .post(`category/add`, category)
        .then((res) => {
          dispatch("getListCategories", res);
          console.log(res.data.message);
          dispatch("setMessage", res.data);
        })
        .catch((e) => {
          console.log(e.response.data.message);
          dispatch("setMessage", e.response.data);
        });
    },

    updateCategory({ dispatch }, category) {
      axios
        .put(`category/update`, category)
        .then((res) => {
          console.log(res);
          dispatch("getListCategories", res);
          console.log(res.data.message);
          dispatch("setMessage", res.data);
        })
        .catch((e) => {
          console.log(e.response.data.message);
          dispatch("setMessage", e.response.data);
        });
    },

    deleteCategory({ dispatch }, idCategory) {
      console.log("desde el index -->" + idCategory);

      axios
        .delete(`category/remove`, { data: { _id: idCategory } })
        .then((res) => {
          dispatch("getListCategories", res);
          console.log(res.data.message);
          dispatch("setMessage", res.data);
        })
        .catch((e) => {
          console.log(e.response.data.message);
          dispatch("setMessage", e.response.data);
        });
    },

    editCategory({ commit }, category) {
      commit("SET_CURRENT_CATEGORY", category);
      console.log(category);
    },

    activateCategory({ dispatch }, idCategory) {
      axios
        .put(`category/activate`, { _id: idCategory })
        .then((res) => {
          dispatch("getListCategories", res);
        })
        .catch((e) => console.log(e));
    },

    deActivateCategory({ dispatch }, idCategory) {
      axios
        .put(`category/deactivate`, { _id: idCategory })
        .then((res) => {
          /*   console.log(res.data)
          console.log(idCategory) */
          dispatch("getListCategories", res);
        })
        .catch((e) => console.log(e));
    },

    /* Modals Controls */
    setMessage({ commit }, msg) {
      commit("SET_MESSAGE", msg);
      //console.log(msg)
    },

    openModals({ commit }, modal) {
      commit("OPEN_MODALS", modal);
    },

    closeModals({ commit }, modal) {
      commit("CLOSE_MODALS", modal);
    },
    setQuery({ commit }, query) {
      console.log(query);
      commit("SET_QUERY", query);
    },
    setState({ commit }) {
      commit("SET_STATE");
    },
    setAllOpenOrCloseList({ commit }) {
      commit("SET_ALL_OPEN_OR_CLOSE_LIST");
    },
    setSortAlpha({ commit }, sort) {
      commit("SET_SORT_ALPHA", sort);
    },
    setSortTime({ commit }, sort) {
      commit("SET_SORT_TIME", sort);
    },
  },
  getters: {
    filteredCategories(state) {
      /* state.listCategories.filter(category=>{ category.state === state.filter.state}); */
      if (!state.filter.stateSort) {
        if (state.filter.sortAlpha === 1) {
          state.listCategories.sort((a, b) => {
            let fa = a.name.toLowerCase();
            let fb = b.name.toLowerCase();
            if (fa < fb) return -1;
            if (fa > fb) return 1;
            return 0;
          });
        } else if (state.filter.sortAlpha === 2) {
          state.listCategories.sort((a, b) => {
            let fa = a.name.toLowerCase();
            let fb = b.name.toLowerCase();
            if (fa < fb) return 1;
            if (fa > fb) return -1;
            return 0;
          });
        }
      } else if (state.filter.sortTime) {
        if (state.filter.sortTime === 1) {
          state.listCategories.sort((a, b) => {
            let fa = new Date(a.createdAt).getTime();
            let fb = new Date(b.createdAt).getTime();
            if (fa < fb) return -1;
            if (fa > fb) return 1;
            return 0;
          });
        } else if (state.filter.sortTime === 2) {
          state.listCategories.sort((a, b) => {
            let fa = a.createdAt;
            let fb = b.createdAt;
            if (fa < fb) return 1;
            if (fa > fb) return -1;
            return 0;
          });
        }
        if (state.filter.query.length > 2) {
          return state.listCategories.filter((category) =>
            category.name
              .toLowerCase()
              .includes(state.filter.query.toLowerCase())
          );
        }
      }
      return state.listCategories;
    },
  },
  modules: {},
});
