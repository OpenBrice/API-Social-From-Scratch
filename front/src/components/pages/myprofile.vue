<script>
import axios from "axios";
import Navbar from "../Layout/Navbar.vue"
import loader from "../Effects/loader.vue"
export default {
    name: "profilePage",
    components: {
      Navbar,
      loader
    },
	data(){
		return {
      password: "",
      email: "",
      file: "",
      nom: "",
      prenom:"",
      createdAt: "",
      updatedAt:"",
      profilePicture: "",
      image:"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp",
      isUserAdmin: false,
    };
  },
  props: {
    userId: {
      type: String,
    },
    token: {
      type: String,
    },
  },
  created() {
    this.getUser();
  },
  computed: {
	  body() {
      if (this.password === "" || this.password === null) {
        return {
          pseudo: this.user.pseudo,
          email: this.user.email,
        };
      } else {
        return {
          pseudo: this.user.pseudo,
          email: this.user.email,
          password: this.password,
        };
      }
    },
  },
  methods: {
	  getUser() {
      console.log(localStorage.getItem("userId"));
      	axios.get("http://localhost:3000/api/user/" + localStorage.getItem("userId"), { headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
        .then((res) => {
        this.email = res.data.email;
        this.nom = res.data.nom;
        this.createdAt = res.data.createdAt;
        this.prenom = res.data.prenom;
        this.updatedAt = res.data.updatedAt;
        this.profilePicture = res.data.profilePicture;
        this.isUserAdmin = res.data.admin;
        console.log(this.profilePicture);
        
      });
    },
    goToModify() {
      this.getUser();
      this.$router.push("/profile");
    },
    formatCreationDate(date){
            const event = new Date(date);
            const options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return event.toLocaleDateString('fr-FR', options); // Ex: 26 juillet 2021, 16:37
    },
  }
}
</script>

<template>
<Navbar />
<loader></loader>
<section class="vh-100" style="background-color: #eee;">
  <div class="container py-5">
    <div class="row d-flex justify-content-center align-items-center scale-up-center">
      <div class="col-md-12 col-xl-4">

        <div class="card" style="border-radius: 15px;">
          <div class="card-body text-center">
            <img v-if="this.profilePicture == null"
              :src="this.image"
              id="imgAvatar">
            <img v-else
                :src="this.profilePicture"
                        alt="photo de profil"
                        class=" rounded-circle mr-1 avatar"
                        id="imgAvatar"
            /> 
            <h4 class="mb-2">{{ nom }} {{ prenom }}</h4>

            <p v-if="isUserAdmin == false" class="text-muted mb-4">@Programmer <span class="mx-2">|</span> <a
                href="mailto::">{{ email }}</a></p>

              <p v-else class="text-muted mb-4">@Administrateur <span class="mx-2">|</span> <a
                href="mailto::">{{ email }}</a></p>

            <div class="mb-4 pb-2">
              <button type="button" class="btn btn-outline-primary btn-floating">
                <i class="fab fa-facebook-f fa-lg"></i>
              </button>
              <button type="button" class="btn btn-outline-primary btn-floating">
                <i class="fab fa-twitter fa-lg"></i>
              </button>
              <button type="button" class="btn btn-outline-primary btn-floating">
                <i class="fab fa-skype fa-lg"></i>
              </button>
            </div>
            <button  v-on:click="goToModify" type="button" id="submit" name="submit" class="btn btn-secondary ">Modifier votre profil !</button>
            <div class="d-flex justify-content-between text-center mt-5 mb-2">
              <div>
                <p class="mb-2 h5">{{ formatCreationDate(createdAt) }}</p>
                <p class="text-muted mb-0">Created At</p>
              </div>
              <div class="px-3">
                <p class="mb-2 h5">{{ formatCreationDate(updatedAt) }}</p>
                <p class="text-muted mb-0">Dernière Modification le :</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
</template>

<style>

.base-image-input {
  display: block;
  width: 10em;
  height: 10em;
  cursor: pointer;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 50%;
}
.base-image-input:hover {
  opacity: 0.5;
}

#imgAvatar{
    width: 9rem;
    height: 9rem;
    object-fit:cover;
}
@media (min-width: 1200px) {
  .col-xl-4 {
    flex: 0 0 auto;
    width: 90%;
}}
@media (min-width: 1200px) {
  .col-xl-4 {
    flex: 0 0 auto;
    width: 100%;
}}
.mb-3 {
    margin-bottom: 0rem !important;
}
.scale-up-center {
	animation: 400ms cubic-bezier(0.39, 0.575, 0.565, 1) 2086.29ms 1 normal both running scale-up-center;
}
@keyframes scale-up-center {
  0% {
    -webkit-transform: scale(0.5);
            transform: scale(0.5);
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}

</style>