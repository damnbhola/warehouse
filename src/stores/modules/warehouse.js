import axios from "axios";

const state = () => ({
  load: false,
  warehouses: []
});

const mutations = {
  setWarehouses(state, warehouses) {
    state.load = true;
    state.warehouses = warehouses;
  }
};

const actions = {
  fetchWarehouses({ commit }) {
    return axios
      .get("https://warehouse-f023a.firebaseio.com/.json")
      .then(res => {
        if (res.data) {
          const warehouses = [];
          for (let warehouse of res.data) {
            warehouses.push(warehouse);
          }
          commit("setWarehouses", warehouses);
        }
      })
      .catch(e => console.log(`error ${e}`));
  }
};

const getters = {
  isLoaded: state => state.load,
  getWarehouses: state => state.warehouses,
  getWarehouseById: state => id => {
    return state.warehouses.find(warehouse => warehouse.id == id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
