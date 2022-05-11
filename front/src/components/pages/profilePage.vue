<script>
import Navbar from "../Layout/Navbar.vue"
import axios from "axios";
export default {
    name: "profilePage",
    components: {
      Navbar
    },
	data(){
		return {
      selectedFile: null,
      image: "https://raw.githubusercontent.com/davidgrcias/InputFileUpload-2/master/noprofil.jpg",
      password: "",
      email: "",
      file: "",
      nom: "",
      imageUrl: "",
      prenom:"",
      createdAt: "",
      profilePicture: ""
    };
  },
  props: {
  },
  created() {
    this.getUser();
    /*if (sessionStorage.getItem('token')===null) {
      this.$router.push({ name: 'Login' })
    }*/
  },
  computed: {
	  body() {

    },
  },
  methods: {
    
    onFileSelected(event){
      this.selectedFile = event.target.files[0];
      this.image = URL.createObjectURL(this.selectedFile);
    },
	  getUser() {
      console.log(localStorage.getItem("userId"));
      	axios.get("http://localhost:3000/api/user/" + localStorage.getItem("userId"), { headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
        .then((res) => {
        this.email = res.data.email;
        this.nom = res.data.nom;
        this.createdAt = res.data.createdAt;
        this.prenom = res.data.prenom;
        //this.image = res.data.profilePicture;
      });
    },
    modifyUser() {
        const updateInfos = {
            email: this.email,
            nom: this.nom,
            prenom: this.prenom,
            password: this.password,
            //profilePicture: this.image
        }
        if (this.password) {
          const password = {
            password: this.password,
          }
        }
        let formData = new FormData();
      formData.append("image", this.selectedFile);
      formData.append("nom", this.nom);
      formData.append("prenom", this.prenom);
      formData.append("email", this.email);
      if (this.password) {
        formData.append("password", this.password);
      }
        axios.put("http://localhost:3000/api/user/" + localStorage.getItem("userId"), formData, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
        .then((res) => {
        this.email = res.data.email;
        this.nom = res.data.nom;
        this.createdAt = res.data.createdAt;
        this.prenom = res.data.prenom;
        this.file = res.data.file
        alert("Votre Profil a bien été Modifié !");
        this.getUser();
        //this.imageData = res.data.profilePicture;
      })
        .catch(() => {
          this.error = "Un problème est survenu, veuillez réessayer";
        });
    },
    cancelModification() {
      this.getUser();
      this.$router.push("/myprofile");

    },
    deleteUser(){
      let deleteConfirm = confirm(
        //apparition de la fenêtre
        "Attention. Toutes vos données seront supprimées. Cette action est irréversible."
      );
      if(deleteConfirm) {
        axios.delete("http://localhost:3000/api/user/" + localStorage.getItem("userId"), { headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
        .then(() => {
            localStorage.clear();
            this.$router.push("/login");
          })
          .catch(() => {
            this.error = "Un problème est survenu, veuillez réessayer";
          });
      }
    },
  },
};

</script>

<template>
<Navbar />
<div class="container">
<div class="row gutters">
<div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
<div class="card h-100">
	<div class="card-body">
		<div class="account-settings">
			<div class="user-profile">
				<div align="center" class="mb-3">
          <img :src="image" alt="">
          <input type="file" @change="onFileSelected">
        </div>
				<h5 class="user-name">{{nom}} {{prenom}}</h5>
				<h6 class="user-email">{{email}}</h6>
			</div>
			<div class="about">
				<h5>About</h5>
				<p>I'm {{prenom}}. Full Stack Designer I enjoy creating user-centric, delightful and human experiences.</p>
			</div>
		</div>
	</div>
</div>
</div>
<div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
<div class="card h-100">
	<div class="card-body">
		<div class="row gutters">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<h6 class="mb-2 text-primary">Personal Details</h6>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="fullName">Nom: {{nom}}</label>
					<input type="text" class="form-control" id="name" placeholder="Modifier votre Nom" v-model="nom">
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="fullName">Prénom {{prenom}}</label>
					<input type="text" class="form-control" id="fullName" placeholder="Modifier votre Prénom" v-model="prenom">
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="eMail">Email : {{email}}</label>
					<input type="email" class="form-control" id="eMail" placeholder="Modifier votre Email" v-model="email">
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="password">Nouveau Mot de passe</label>
					<input type="password" class="form-control" id="password" placeholder="Entrer votre Nouveau Mot de passe" v-model="password">
				</div>
			</div>
		</div>		
		<div class="row gutters">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<div class="text-right d-flex">
					<button  @click="cancelModification" type="button" id="submit" name="submit" class="btn btn-secondary ">Back</button>
					<button  @click="modifyUser" type="button" id="submit" name="submit" class="btn btn-primary ">Update</button>
        </div>		
      </div>
      <div class="delete">
          <button  @click="deleteUser" type="button" id="submit" name="submit" class="btn btn-primary">Supprimer mon compte</button>
        </div>
		</div>
	</div>
</div>
</div>
</div>
</div>
</template>

<style scoped>
body {
    margin: 0;
    padding-top: 40px;
    color: #2e323c;
    background: #f5f6fa;
    position: relative;
    height: 100%;
}
.account-settings .user-profile {
    margin: 0 0 1rem 0;
    padding-bottom: 1rem;
    text-align: center;
}
.account-settings .user-profile .user-avatar {
    margin: 0 0 1rem 0;
}
.account-settings .user-profile .user-avatar img {
    width: 90px;
    height: 90px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border-radius: 100px;
}
.account-settings .user-profile h5.user-name {
    margin: 0 0 0.5rem 0;
}
.account-settings .user-profile h6.user-email {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 400;
    color: #9fa8b9;
}
.account-settings .about {
    margin: 2rem 0 0 0;
    text-align: center;
}
.account-settings .about h5 {
    margin: 0 0 15px 0;
    color: #007ae1;
}
.account-settings .about p {
    font-size: 0.825rem;
}
.form-control {
    border: 1px solid #cfd1d8;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    font-size: .825rem;
    background: #ffffff;
    color: #2e323c;
}

.card {
    background: #ffffff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    border: 0;
    margin-bottom: 1rem;
}
.inputfile {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}
.inputfile + label {
    margin: 0.2rem;
    font-size: 20px;
    color: white;
    background-color: #31645f;
    display: inline-block;
    padding: 0.5rem;
    border-radius: 0.25rem;
}

.inputfile:focus + label,
.inputfile + label:hover {
    background-color: rgb(66, 191, 253);
    transform: scale(1.05);
    transition: 400ms
}
.inputfile + label {
	cursor: pointer; /* "hand" cursor */
}
.btn:hover{
    transform: scale(1.05);
    transition: 400ms
}

img {
  width: 10rem;
  margin: auto;
  display: block;
  margin-bottom: 10px;
  border-radius: 160px;
}

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

</style>