<script>
import Login from "./components/pages/Login.vue"
import Navbar from "./components/Layout/Navbar.vue"
//import Posts from "./components/Wall/Posts.vue"

export default {
  name: "App",
  components:{
    Login,
    //Navbar,
  }
}
</script>

<template>
<div>

  <router-view></router-view>
</div>


</template>

<style></style>
