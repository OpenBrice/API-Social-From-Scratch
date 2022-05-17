<script>
import Posts from "../Wall/Posts.vue"
import Navbar from "../Layout/Navbar.vue"
import axios from "axios";

export default {
    name: "Wall",
    data() {
        return{
            currentUser: "",
            userId: localStorage.getItem("userId"),
        }
    },
    components: {
        Posts, 
        Navbar
    },
    beforeMount(){
        const userId = localStorage.getItem("userId");
        axios.get("http://localhost:3000/api/user/" + userId, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
                .then(res => {
                this.currentUser = res.data; // l'utilisateur connecté
            })
    },
}
</script>

<template>

<Navbar />
<Posts></Posts>
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
</style>