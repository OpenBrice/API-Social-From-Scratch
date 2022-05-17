<script>
import axios from "axios";

export default {
    name: "Posts",
    data() {
        return{
            image: this.selectedFile,
            description:"",
            posts: [],
            selectedFile: "",
            userId: localStorage.getItem("userId"),
            file: "",
            postId:"",
            singlePost: "",
            likes : 0,
            newLike: 0,
            currentUser: "",
            content:"",
        }
    },
    beforeMount() {
        this.getAllPosts()
        const userId = localStorage.getItem("userId");
        axios.get("http://localhost:3000/api/user/" + userId, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
                .then(res => {
                this.currentUser = res.data; // l'utilisateur connecté
            })
    },
    methods: {
    formatCreationDate(date){
            const event = new Date(date);
            const options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return event.toLocaleDateString('fr-FR', options);
        },

        onFileSelected(event){
        this.selectedFile = event.target.files[0];
        console.log(this.selectedFile);
        },
        getAllPosts(){
            	axios.get("http://localhost:3000/api/post", { headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
                .then(res => {
                this.posts = res.data; // Tous les posts
            })
        },
        sendPost() {
            const createInfos = {
            description: this.description,
            userId: this.userId,
            image: this.selectedFile
            }
            console.log(this.selectedFile)
            let formData = new FormData();
                formData.append("image", this.selectedFile);
                formData.append("userId", this.userId);
                formData.append("description", this.description);
            axios.post("http://localhost:3000/api/post", formData, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
            .then(res => {
                window.location.reload()
            })
        },
        getPostInfos(postId){
            console.log(postId);
            this.$router.push(`/ModifyPost/${postId}`);
        },

        deletePost(postId) {
            axios.delete("http://localhost:3000/api/post/" + postId , { headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
        .then((res) => 
        console.log("post supprimé ! "));
        alert("votre Post a bien été supprimé !")
        window.location.reload();
        },

        LikeBtn(postId){
            console.log("l'id du post est ", postId);
        },

    },
}
</script>

<template>
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<div class="loader">
        <i class="fas fa-sync fa-spin fa-3x"></i>
    </div>

<div class="container-md ">
<div class="form-floating">
  <textarea class="form-control" placeholder="Laissez un commentaire !" id="floatingTextarea2" style="height: 100px" v-model="description"></textarea>
    <div class="flex">
        <div class="parent-div">
            <i class="bi bi-card-image"></i>
            <input type="file" name="file" id="file" class="inputfile" @change="onFileSelected"/>
            <label for="file">Choisir un fichier <i class="fa-solid fa-cloud-arrow-up"></i></label>
        </div>
        <button @click="sendPost" type="submit" class="btn btn-primary">Poster <i class="fa-solid fa-message"></i></button>
    </div>
    <hr class="dropdown-divider">
</div>
</div>

<div v-if="posts === 0">
            <p class="text-center mx-auto my-15 text-h5 text-sm-h4">Le forum est vide !</p>
        </div>
<div class="container posts-content">
    <div class="row">
        <div class="col-lg-9" id="post" v-for="(post, index) in posts" :key="index">
            <div class="card mb-4">
              <div class="card-body">
                <div class="media mb-3 flex">
                    <div>
                        <img
                        :src="post.user.profilePicture"
                        class="postAvatarImg"
                        alt="post picture"
                        title="post profile"
                        />
                        <div class="media-body ml-3">
                            <strong>{{ post.user.prenom }} {{ post.user.nom }}</strong> {{ post.userId }}
                            <div class="text-muted small"></div>
                        </div>
                    </div>
                    <div v-if="userId == post.userId || currentUser.admin == true" id="putPost">
                        <button v-on:click="getPostInfos(post.id)" class="btn-primary" id="modifyBtn">Edit <i class="fas fa-edit"></i></button>
                        <button class="btn-danger" id="deleteBtn" @click="deletePost(post.id)">Delete <i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>

                <p>
                  {{ post.description }}
                </p>
                <div v-if="post.image == null" ></div>
                <img v-else
                    :src="post.image"
                    id="postImg"
                    alt="post picture"
                    title="post profile"
                />     
                <p>Crée Le {{ formatCreationDate(post.createdAt) }}</p>

                
                <button class=".btn-upload" @onclick="LikeBtn(post.id)">je like</button>
            
            </div>
            </div>
        </div>

         </div>
</div>
</template>

<style lang="scss" scoped>
body {
    background:#eee;
}
#post {
    width:100%;
    margin: auto !important;
    animation: 1278.26ms ease 2161.68ms 1 normal none running appear;
    animation-fill-mode: both;
}
.posts-content{
    margin-top:20px;
    animation-fill-mode: both;
    animation: 2000ms ease 2153.17ms 1 normal none running slide-top;
}
@keyframes appear {
    0%    { opacity: 0; }
    100%  { opacity: 1; }
}
@keyframes slide-top {
    0% {
      -webkit-transform: translateY(0);
              transform: translateY(100PX);
    }
    100% {
      -webkit-transform: translateY(0);
              transform: translateY(0);
    }
  }
.ui-w-40 {
    width: 40px !important;
    height: auto;
}
.default-style .ui-bordered {
    border: 1px solid rgba(24,28,33,0.06);
}
.ui-bg-cover {
    background-color: transparent;
    background-position: center center;
    background-size: cover;
}
.ui-rect {
    padding-top: 50% !important;
}
.ui-rect, .ui-rect-30, .ui-rect-60, .ui-rect-67, .ui-rect-75 {
    position: relative !important;
    display: block !important;
    padding-top: 100% !important;
    width: 100% !important;
}
.d-flex, .d-inline-flex, .media, .media>:not(.media-body), .jumbotron, .card {
    -ms-flex-negative: 1;
    flex-shrink: 1;
}
.bg-dark {
    background-color: rgba(24,28,33,0.9) !important;
}
.card-footer, .card hr {
    border-color: rgba(24,28,33,0.06);
}
.ui-rect-content {
    position: absolute !important;
    top: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
}
.default-style .ui-bordered {
    border: 1px solid rgba(24,28,33,0.06);
}
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
#putPost{
    display:flex;
    flex-direction: column;
    gap: 0.2rem;
    animation-fill-mode: both;
    animation: 1278.26ms ease 2161.68ms 1 normal none running appear;
}
#postImg{
    max-width: 100%;
    height: 20rem;
    display:flex;
    margin:auto;
    min-height: 10rem;
}
#modifyBtn {
    border-radius: 25px;
}
#modifyBtn:hover {
    transform: scale(1.05);
    transition: 400ms linear;
}
#deleteBtn {
    border-radius:25px;
}
#deleteBtn:hover {
    transform: scale(1.05);
    transition: 400ms linear;
}
.postAvatarImg{
    width:4rem;
    height:4rem;
    border-radius: 40px;
    object-fit: cover;
}

.likeBtn{
    background: transparent;
    border: none;
    margin: 87px;
    font-size: 88px;
    outline: none;
    color: grey;
}
.btns{
    position: absolute;
    top: 216px;
    left: 328px;
    display: flex;
}
.likeBtn i:hover{
    cursor: pointer;
}

.loader {
  position: fixed;
  background-color: white;
  height: 100vh;
  inset: 0;
  z-index: 3;
  opacity: 0.9;
  animation: loader 200ms 2s;
  animation-fill-mode: forwards;
  transform-origin: top;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader i {
  animation: lds-ring 2s;
  color: #9356dce6;
}
@keyframes loader {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style> 