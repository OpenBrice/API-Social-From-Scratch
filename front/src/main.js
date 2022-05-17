import { createApp } from 'vue' //on importe des fonctionnalités

import BootstrapVue3 from 'bootstrap-vue-3'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import Login from "./components/pages/Login.vue"
import Signup from "./components/pages/Signup.vue"
import Wall from "./components/Wall/Wall.vue"
import profilePage from "./components/pages/profilePage.vue"
import myprofile from "./components/pages/myprofile.vue"
import ModifyPost from "./components/Wall/ModifyPost.vue"

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'//ces deux fichiers sont un bootstrap ensemble de règles css

const routes = [    //fabrique le routeur , regarde l'url et selon l'url va en afficher et render un component 
    { path: '/login', component: Login },//si t'arrives sur la page Login lance component Login
    { path: '/signup', component: Signup },
    { path: '/home', component: Wall },
    { path: '/profile', component: profilePage },
    { path: '/myprofile', component: myprofile },
    { path: '/ModifyPost/:id', component: ModifyPost, props: true},
    { path: '/', redirect: '/signup'}
]

const router = createRouter({ history: createWebHistory(), routes })

//on voudrait un router guard, navigation guard qui va vérifier avant de resolve chaque path qu'on est logué
router.beforeEach((to, from) => {
    if (isLoginRequired(to)){
        return router.push("/login")
    } 
})

function isLoginRequired(to){
    if (isPrivatePage(to) && !isTokenInCache()) return true
    if (isPrivatePage(to) && !isTokenValid()) return true
    return false
}
function isPrivatePage(to){
    const publicPages = ["/login", "/signup"]
    return !publicPages.includes(to.path)
}
function isTokenInCache() {
    return localStorage.getItem('token')
}
function isTokenValid() {
    const token = localStorage.getItem('token')
    return token
}

const app = createApp(App) //fabrique l'app vue 
app.use(BootstrapVue3) //on injecte le bootstrap
app.use(router); //on injecte le router 
app.mount('#app')//on monte l'app a l'interieur de notre div qui a une id de App 
