<script>
import axios from "axios";
export default {
    name: "Navbar",
    data() {
      return {
        profilePicture: "",
        image:"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp",
        currentUser: "",
        userId: localStorage.getItem("userId"),
      }
    },
    beforeMount(){
        const userId = localStorage.getItem("userId");
        axios.get("http://localhost:3000/api/user/" + userId, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
                .then(res => {
                this.currentUser = res.data; // l'utilisateur connecté
                console.log(this.currentUser)
            })
    },
    methods: {
      sendToProfile(currentUser){
        console.log('ok')
        this.$router.push("/myprofile")
      },
      logout() {
        let logoutConfirm = confirm(
        //apparition de la fenêtre
        "Êtes vous sûr de vouloir vous déconnecter ?"
      )
      if(logoutConfirm) {
        localStorage.clear();
        this.$router.push("/signup")
      }
    },
}}

</script>

<template>
  <header class="p-3 mb-3 border-bottom " style="background-color: #18534F;">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <router-link to="/" class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
        </router-link>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0" style="gap: 0.5rem;">
          <li class="icons"><router-link to="/home" class="nav-link px-2 link-secondary"><i class="fa-solid fa-house-user fa-2x white"></i> </router-link></li>
          <li class="icons"><router-link to="/myprofile" class="nav-link px-2 white"><i class="fa-solid fa-user fa-2x "></i></router-link></li>
          <li class="nav-link px-2 white pe-auto icons"><i  @click="logout" class="fa-solid fa-arrow-right-from-bracket fa-2x white"></i></li>
        </ul>

          <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input type="search" class="form-control" placeholder="Search..." aria-label="Search">
          </form>

            <div @onclick="sendToProfile(currentUser)" v-if="currentUser.admin == true" class="justify-content-center align-items-center" style="text-align: center;">
              <img class="avatarProfile imgAvatar" size="72px" badge="Admin" :src="currentUser.profilePicture">
              <h6>{{ currentUser.prenom }} {{ currentUser.nom }}<br><span class="badge bg-primary">Admin</span></h6>
            </div>

            <div @onclick="sendToProfile(currentUser)" v-else class="justify-content-center align-items-center" style="text-align: center;">
            <img class="avatarProfile imgAvatar" size="72px" badge="User" :src="currentUser.profilePicture">
              <div>
              <h6 >{{ currentUser.prenom }} {{ currentUser.nom }}<br><span @onclick="sendToProfile(currentUser)" class="badge bg-success">User</span></h6>
              </div>
            </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>

.white{
  color: white;
}
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, .1);
  border: solid rgba(0, 0, 0, .15);
  border-width: 1px 0;
  box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 .25rem rgba(255, 255, 255, .25);
}

.bi {
  vertical-align: -.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.avatarProfile:hover{
  cursor:pointer;
  transform: scale(1.05);
  transition: 400ms;
  opacity: 0.3;
}

h6{
  color:white;
}
.imgAvatar{
      max-width: 72px;
    border-radius: 50px;
    min-height: 72px;
    max-height: 72px;
    width: 72px;
    height: 72px;
    object-fit: cover;
}
.icons{
    background-color: #808080;
    border-radius: 25px;
}
i:hover {
    animation: scale-up-bl 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

@keyframes scale-up-bl {
  0% {
    -webkit-transform: scale(0.5);
            transform: scale(0.5);
    -webkit-transform-origin: 0% 100%;
            transform-origin: 0% 100%;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 0% 100%;
            transform-origin: 0% 100%;
  }
}
</style>