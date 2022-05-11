<script>
import Navbar from "../Layout/Navbar.vue";
import axios from "axios";

export default {
    name: "ModifyPost",
    components: {
        Navbar
    },
    mounted(){
      console.log(this.$route.params.id)
      const idToUpdate = this.$route.params.id
    },
    data(){
		return {
      selectedFile: null,
      image: "",
      basicImage: "https://raw.githubusercontent.com/davidgrcias/InputFileUpload-2/master/noprofil.jpg",
      file: "",
      imageUrl: "",
      description:"",
      profilePicture: "",
      user:"",
      userId: localStorage.getItem("userId"),
      idToUpdate :this.$route.params.id,
      prenom: "",
    };
  },
  created(){
    this.findOnePost();
  },

  methods:{
      findOnePost(){
        const idToUpdate = this.$route.params.id
        axios.get(`http://localhost:3000/api/post/` + idToUpdate, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
        .then((res) => {
        this.image = res.data.image;
        this.description =res.data.description;
        this.user = res.data.user
        console.log(this.user);
        this.profilePicture = this.user.profilePicture
        console.log(this.profilePicture);
      });
    },
    onFileSelected(event){
      this.selectedFile = event.target.files[0];
      this.image = URL.createObjectURL(this.selectedFile);
    },

    modifyPost() {
      event.preventDefault();
       const idToUpdate = this.$route.params.id;

        const formData = new FormData();
        formData.append("image", this.selectedFile);
        formData.append("description", this.description);
        formData.append("userId", this.userId)
        console.log(formData.get("description"))
        console.log(formData.get("image"))
        axios.put("http://localhost:3000/api/post/ModifyPost/" + idToUpdate, formData)
        .then((res) => {
        console.log("le resultat après",res);
        alert("Votre Post a bien été Modifié !");
        this.findOnePost();
        window.location.reload
        this.$router.push("/home");
      })
        .catch(() => {
          this.error = "Un problème est survenu, veuillez réessayer";
        });
    },

    cancelModification(){
      this.$router.push("/home");
    }
  }
}
</script>

<template>
<Navbar />
<div class="container">
<div class="row gutters">
<div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 " style="width: 100%;">
<div class="card h-100">
	<div class="card-body">
		<div class="account-settings">
			<div class="user-profile">
				<div>
          <img v-if="profilePicture == null" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp" class="d-block ui-w-40 rounded-circle" alt="">
          <img v-else
          :src="profilePicture"
          class="d-block ui-w-40 rounded-circle"
          alt="post picture"
          title="post profile"
          />
          <div class="media-body ml-3" style="margin-bottom: 1rem">
              {{ user.prenom }} {{ user.nom }}
          </div>
        </div>
        <textarea class="form-control" placeholder="Laissez un commentaire !" id="floatingTextarea2" style="height: 100px" v-model="description"></textarea>
          <div style="display: flex;flex-direction: column;/justify-content: space-evenly;align-items: center;">

            <img :src="image" alt="" id="postImg">

            <input type="file" name="file"  id="file" class="inputfile" @change="onFileSelected">
            <label for="file">Modifier l'image du Post <i class="fa-solid fa-cloud-arrow-up"></i></label>
          </div>
        </div>
			</div>
		</div>
	</div>
</div>
</div>
		<div class="row gutters">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<div class="text-right d-flex">
					<button  @click="cancelModification" type="button" id="submit" name="submit" class="btn btn-secondary ">Back</button>
					<button  @click="modifyPost" type="button" id="submit" name="submit" class="btn btn-primary ">Update Post</button>
        </div>		
      </div>
		</div>
	</div>
</template>

<style scoped>
.btn-info {
    margin: 0.2rem;
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
.btn-upload {
  background-color: #fff;
  border: 3px solid #000;
  color: #000;
  padding: 10px 25px;
  border-radius: 10px;
  font-size: 22px;
  font-weight: bold;
}
.flex{
    display: flex;
    justify-content: space-between;
}

#postImg{
  max-width: 90%;
    height: 20rem;
    display: flex;
    margin: auto;
    min-height: 10rem;
}
.none{
  display: flex;
}
.ui-w-40 {
  width: 40px !important;
  height: auto;
}
</style>