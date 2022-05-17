<script>
import axios from "axios";
export default {
    name: "Login",
    data() {
      return {
        email: '',
        password:'',
        prenom: '',
        name: '',
        error: []
      }
    },
    methods: {
      login(){
        
        if(this.email && this.password)
        {
          console.log("login function called")
        }
        this.error=[];
        if(!this.email)
        {
          this.error.push("email is required")
        }
        if(!this.password)
        {
          this.error.push("password is required")
        }
        console.warn("errors", this.error)
        event.preventDefault();
        console.log(this.email,this.password)
        const userInfos = {
            email: this.email,
            password: this.password,
        }
        console.log(userInfos);
        axios.post("http://localhost:3000/api/user/login", userInfos)
          .then((response) => {
                localStorage.setItem("token",response.data.token)
                localStorage.setItem("userId",response.data.userId)
                this.$router.push("/myprofile");
          })
          .catch(error => {
            alert('Veuillez rentrer un email et Mot de passe déjà enregistré !')
          })
    }
  }
};
</script>

<template>
<main class="form-signin">

  <form>
    <h1>Groupamania</h1>
    <h1 style="background-color: #41464;" class="h3 mb-3 fw-normal">Please sign in</h1>
<div>
    <p id="errorMsg" style="color: white;" v-if="error.length">
      <b>Please correct the following errors:</b>
      <ul>
        <li class="white" v-for="e in error" v-bind:key="e.id">
        {{e}}
        </li>
      </ul>
    </p>
</div>
    <div class="form-floating">
      <input type="email"
        class="form-control" 
        id="floatingInput" 
        placeholder="name@example.com"
        v-model="email">
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" 
        class="form-control" 
        id="floatingPassword" 
        placeholder="Password" 
        v-model="password"/>
      <label for="floatingPassword">Password</label>
    </div>

    <div class="checkbox mb-3">
        <button ><span> <router-link to="/signup"> Tu n'as pas de compte ? </router-link></span></button>
    </div>
    <button v-on:click="login()" class="w-100 btn btn-lg btn-primary" type="submit" >Se connecter</button>
  </form> 
</main>
</template>


<style scoped>
html,
body {
  height: 100%;
}

body {
  margin-top: 10rem;
  align-items: center;
  padding-top: 0px;
  padding-bottom: 40px;
  background: #3399ff;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin-top: auto;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
h1{
  text-align: center;
}

  .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
}
p{
  color: white;
}
#errorMsg{
      background-color: #41464b;
    border-radius: 23px;
    padding: 0.3rem;
}
</style>