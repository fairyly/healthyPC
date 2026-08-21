import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
  { path: '/bmi', name: 'BMI', component: () => import('../views/BMI.vue') },
  { path: '/water', name: 'Water', component: () => import('../views/Water.vue') },
  { path: '/medicine', name: 'Medicine', component: () => import('../views/Medicine.vue') },
  { path: '/blood-pressure', name: 'BloodPressure', component: () => import('../views/BloodPressure.vue') },
  { path: '/blood-sugar', name: 'BloodSugar', component: () => import('../views/BloodSugar.vue') },
  { path: '/heart-rate', name: 'HeartRate', component: () => import('../views/HeartRate.vue') },
  { path: '/sleep', name: 'Sleep', component: () => import('../views/Sleep.vue') },
  { path: '/steps', name: 'Steps', component: () => import('../views/Steps.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router