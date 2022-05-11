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
            userNom:"",
            userPrenom:"",
            postId:"",
            singlePost: "",
            isActive: false,
            likes : 0,
            newLike: 0,
        }
    },
    beforeMount() {
        this.getAllPosts()
    },
    methods: {
        cancel() {
      console.log('cancel');
      this.showDialog = false;
      this.showDialogUser = false;
    },
    confirm() {
      console.log('confirm');
      this.showDialog = false;
    },
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
            axios.post("http://localhost:3000/api/post", formData)
            .then(res => {
                //this.posts = res.data[0]; // Tous les posts
                //this.postsNumber = res.data[1][0];
                //console.log("Tous les posts (" + this.postsNumber + ") s'affichent !");
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

        LikePost(postId){
            console.log(postId);
            let likeIcon = document.querySelector("#icon");
            let clicked = false;
            if(this.isPostLiked = true) {
                likeIcon.innerHTML = `<i class="fas fa-thumbs-up"></i>`;
                this.newLike += 1;
            } else {
                clicked = false;
                likeIcon.innerHTML = `<i class="far fa-thumbs-up"></i>`;
                this.newLike -= 1;
            }
            const likeUpdate = {
                Like : this.newLike,
                userId: localStorage.getItem("userId")
            };
            axios.post("http://localhost:3000/api/post/like/" + postId , likeUpdate, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
                .then((res) => 
                console.log("Vous avez liké le post !")
               //alert("Vous avez liké le post !")
                //window.location.reload();
            )},
        },
        toggle() {
            this.isActive = this.isActive ? false : true;
        },
}
</script>

<template>
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">


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
                        <img v-if="post.user.profilePicture == null" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp" class="d-block ui-w-40 rounded-circle" alt="">
                        <img v-else
                        :src="post.user.profilePicture"
                        class="d-block ui-w-40 rounded-circle"
                        alt="post picture"
                        title="post profile"
                        />
                        <div class="media-body ml-3">
                            {{ post.user.prenom }} {{ post.user.nom }} {{ post.userId }}
                            <div class="text-muted small"> {{post.id}}</div>
                        </div>
                    </div>
                    <div v-if="userId == post.userId" id="putPost">
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
                
            </div>
            <button class="like__btn" v-on:click="LikePost(post.id)">
                <span id="icon"><i class="far fa-thumbs-up"></i></span>
                <span id="count">{{likes}}</span> Like
            </button>
            </div>
            </div>

         </div>
</div>
</template>

<style scoped>
body {
    background:#eee;
}
#post {
    width:100%;
    margin: auto !important;
}
.posts-content{
    margin-top:20px;    
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
}
#postImg{
    max-width: 90%;
    height: 20rem;
    display:flex;
    margin:auto;
    min-height: 10rem;
}
.like__btn {
  padding: 10px 15px;
  background: #0080ff;
  font-size: 18px;
  font-family: "Open Sans", sans-serif;
  border-radius: 5px;
  color: #e8efff;
  outline: none;
  border: none;
  cursor: pointer;
    width: 20%;
}
</style> 