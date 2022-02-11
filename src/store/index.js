import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paymentsList: [],
    maxId: 0,
    categoryList: [],
    pageList: {}, // хардкод
    pageNum: 1,
  },
  mutations: {
    // Заполнить paymentsList
    setPaymentsListData(state, payload) {
      state.paymentsList = payload;
      state.maxId = state.paymentsList.length;
    },
    // Добавить элемент в paymentsList
    addDataToPaymentsList: (state, payload) => {
      payload.id = ++state.maxId;
      state.paymentsList.push(payload);
    },
    // Установить категории
    setCategories(state, payload) {
      if (!Array.isArray(payload)) {
        payload = [payload]
      }
      state.categoryList.push(...payload)
    },
    // Заполнить хардкод
    setPageList(state) {
      state.pageList = {
        "page1": [
          {
            "id": 1,
            "date": '20.03.2020',
            "category": 'Food',
            "value": 169,
          },
          {
            "id": 2,
            "date": '21.03.2020',
            "category": 'Navigation',
            "value": 50,
          },
          {
            "id": 3,
            "date": '22.03.2020',
            "category": 'Sport',
            "value": 450,
          },
        ],
        "page2": [
          {
            "id": 4,
            "date": '23.03.2020',
            "category": 'Entertaiment',
            "value": 969,
          },
          {
            "id": 5,
            "date": '24.03.2020',
            "category": 'Education',
            "value": 1500,
          },
          {
            "id": 6,
            "date": '25.03.2020',
            "category": 'Food',
            "value": 200,
          },
        ]
      };
    },
    // Скопировать данные из хардкода в paymentsList
    setDataToPaymentList(state, payload) {
      let page = 'page' + payload;
      let a = state.pageList[page];
      state.paymentsList.push({ [page]: a });
    },
    // Установить номер страницы
    setPageNum(state, payload) {
      state.pageNum = payload;
    },
    deletePayment(state, { num, id }) {
      let page = 'page' + num;
      let a = state.paymentsList[0][page];
      a = a.filter((el) => el.id !== id);
      let i = state.paymentsList.indexOf([page]);
      state.paymentsList.splice(i, 1, { [page]: a });
    }
  },
  actions: {
    // Выбрать данные по номеру страницы
    fetchData({ commit }, pageNum) {
      return new Promise((resolve) => {
        // имитируем работу с сетью, ставим задержку получения данных в 1 секунду
        setTimeout(() => {
          resolve(pageNum)
        }, 1500)
      })
        .then(res => {
          // запускаем изменение состояния через commit
          commit('setDataToPaymentList', res)
        })
    },
    // Загрузить директории
    loadCategories({ commit }) {
      return new Promise((resolve) => {
        // имитируем работу с сетью
        setTimeout(() => {
          resolve([{ id: 1, name: 'Food' }, { id: 2, name: 'Transport' }, { id: 3, name: 'Education' }, { id: 4, name: 'Entertainment' }])
        }, 1000)
      })
        .then(res => {
          // запускаем изменение состояния через commit
          commit('setCategories', res)
        })
    },
  },
  modules: {
  },
  getters: {
    // получаем список paymentsList
    getPaymentsList: state => state.paymentsList,
    getPaymentsList2: (state) => {
      // return state.paymentsList;
      let page = 'page' + state.pageNum;
      let a = state.paymentsList[0][page];
      return a;
    },

    // получаем суммарную стоимость всех платежей
    getFullPaymentValue: state => {
      return state.paymentsList
        .reduce((res, cur) => res + cur.value, 0)
    },
    getCategoryList: state => {
      return state.categoryList
    },
    getPageNum: state => {
      return state.pageNum;
    },
  }
})
