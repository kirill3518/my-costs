import Vue from 'vue'
import VueRouter from 'vue-router'
import PageDashboard from '../views/PageDashboard.vue'
import AddPaymentForm from '../components/AddPaymentForm.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/add/payment/*',
    name: 'AddPaymentForm',
    component: AddPaymentForm,
    // props: { pValue: 0 },
    // component: { template: '<form>*AUTH FORM*</form>' }
    // component: { template: '<AddPaymentForm :value="value" />' }
    // template: '<App :page="page" />',
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: PageDashboard
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PageAbout.vue')
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "about" */ '../views/Page404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router


// ...mapMutations([
//   "setDate",
//   "setCategory",
//   "setValue",
// ]),

// router.beforeEach((to, next) => {
//   console.log(to.path);
//   if (to.name === AddPaymentForm) {
//     // if (to.path === '/add/payment/Food') {
//     // this.setCategory('Food');
//     // this.commit('setCategory', 'Food');
//     next()
//   } else { next() }

// })

router.afterEach((to) => {
  // http://localhost:8080/add/payment/Food?value=200

  // узнать что value = 200, тогда 200 надо передать в ячейку компонента
  console.log(to.path);
  // console.log(to.name);
  // console.log(to.params);
  if (to.name === 'AddPaymentForm') {
    let paramsString = document.location.search;
    let paramsInt = parseInt(paramsString.match(/\d+/));
    this.$store.commit('setValue', paramsInt);
  }

})
