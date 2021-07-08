import Vue from "vue";
import Vuex from "vuex";
/* import firebase from 'firebase'; */

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
/*   actions: {
    createProducts() {
      const response = await rootState.db.collection('articles').add({
        title: 'Title',
        text: 'article text',
        created: firebase.firestore.Timestamp.fromDate(new Date())
       });
    }
  }, */
  modules: {},
});
