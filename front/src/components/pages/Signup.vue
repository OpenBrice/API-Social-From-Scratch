<script>
import axios from "axios";
export default {
    name: "Signup",
    data() {
      return {
        email: '',
        password:'',
        prenom: '',
        name: '',
        regex: /^[A-Za-z0-9+_.-]+@(.+)$/,
        error: []
      }
    },
    methods: {
      createAccount(){
        event.preventDefault();
        let regex = /^[A-Za-z0-9+_.-]+@(.+)$/;
        this.error=[];
        if(!this.email)
        {
          this.error.push("email is required")
        }
        else if(!this.password)
        {
          this.error.push("password is required")
        }
        else if(!this.name)
        {
          this.error.push("name is required")
        }
        else if (!this.prenom)
        {
          this.error.push("prenom is required")
        }
        else if(regex.test(this.email) === false)
        {
          this.error.push("Veuillez entrer un email valide")
        }
        else {
          console.log(this.name,this.email,this.password,this.prenom)
        const userInfos = {
            nom: this.name,
            prenom: this.prenom,
            email: this.email,
            password: this.password,
        }
        console.log(userInfos);
        axios.post("http://localhost:3000/api/user/register", userInfos)
          .then((response) => {
                localStorage.setItem("userId", JSON.stringify(response.data.userId));
                localStorage.setItem("token", JSON.stringify(response.data.token));
                alert("Votre compte à bien été crée, veuillez vous logger");
                this.$router.push("/login");
              })
          .catch(function (error) {
                if (error) {
                  console.log(error);
                }
          });
        }
       }
    }
};

</script>

<template>
<main class="form-signin">
  <form>
    <h1>Groupamania</h1>
    <h1 class="h3 mb-3 fw-normal">Inscription</h1>

    <div>
        <p v-if="error.length">
          <b>Please correct the following errors:</b>
          <ul>
            <li v-for="e in error" v-bind:key="e.id">
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
        v-model="password">
      <label for="floatingPassword">Password</label>
    </div>
    <div>
    <div class="form-floating">
      <input type="name"
        class="form-control" 
        placeholder=""
        v-model="name">
      <label for="floatingInput">Nom</label>
    </div>
    <div class="form-floating">
      <input type="name"
        class="form-control" 
        v-model="prenom">
      <label for="floatingInput">Prénom</label>
    </div>
    </div>

    <div class="checkbox mb-3">

        <button ><span> <router-link to="/login"> Se connecter </router-link></span></button>
    </div>
    <button v-on:click="createAccount()" class="w-100 btn btn-lg btn-primary" type="submit">S'inscrire</button>
  </form> 
</main>
</template>


<style>
html,
body {
  height: 100%;
}

body {
  align-items: center;
  padding-top: 0px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
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
</style>