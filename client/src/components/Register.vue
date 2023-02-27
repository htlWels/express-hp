<template>
  <h1>Register</h1>
 <div class="container mt-5" style="max-width: 50%">
    <form  @submit.prevent="doRegister">
      <div class="form-group">
        <label for="username">Username</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="fas fa-user"></i>
            </span>
          </div>
          <input type="text" class="form-control" id="username" v-model="username" placeholder="Username">
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="fas fa-lock"></i>
            </span>
          </div>
          <input type="password" class="form-control" id="password" v-model="password" placeholder="Password">
        </div>
      </div>
      <div class="form-group">
        <label for="role">Role</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="fas fa-user-tag"></i>
            </span>
          </div>
          <select class="form-control" id="role" v-model="role">
            <option value="admin">admin</option>
            <option value="user">user</option>
            <option value="user">devel</option>
          </select>
        </div>
      </div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="locked" v-model="locked">
        <label class="form-check-label" for="locked">Locked</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="fas fa-lock"></i>
            </span>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      role: 'admin',
      locked: false
    }
  }
}
</script>

<script setup>
import { ref } from 'vue';
import router from '@/router';
let username = ref('');
let password = ref('');
let error= ref('')
let role = ref('admin')
let locked=ref(false)

const doRegister = () => {
  error.value=""
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
      role:role.value,
      locked: locked.value
    }),
  };
  fetch('/register', requestOptions).then((response) => {
    if (response.status == 200) {
      router.push('/home');
    }
    else if (response.status == 437) { // user already exists
      error.value=`User ${username.value} already exists!`
      username.value=""
    }
    else
      error.value="Unexpected error on server side!"
  });
};
</script>

<style>
* {
  box-sizing: border-box;
  font-family: Verdana, sans-serif;
}

div#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

div#app div#login {
  align-items: center;
  background-color: #e2e2e5;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

div#app div#login div#description {
  background-color: #ffffff;
  width: 280px;
  padding: 35px;
}

div#app div#login div#description h1,
div#app div#login div#description p {
  margin: 0;
}

div#app div#login div#description p {
  font-size: 0.8em;
  color: #95a5a6;
  margin-top: 10px;
}

div#app div#login div#form {
  background-color: #34495e;
  border-radius: 5px;
  box-shadow: 0px 0px 30px 0px #666;
  color: #ecf0f1;
  width: 260px;
  padding: 35px;
}

div#app div#login div#form label,
div#app div#login div#form input {
  outline: none;
  width: 100%;
}

div#app div#login div#form label {
  color: #95a5a6;
  font-size: 0.8em;
}

div#app div#login div#form input {
  background-color: transparent;
  border: none;
  color: #ecf0f1;
  font-size: 1em;
  margin-bottom: 20px;
}

div#app div#login div#form ::placeholder {
  color: #ecf0f1;
  opacity: 1;
}

div#app div#login div#form button {
  background-color: #ffffff;
  cursor: pointer;
  border: none;
  padding: 10px;
  transition: background-color 0.2s ease-in-out;
  width: 100%;
}

div#app div#login div#form button:hover {
  background-color: #eeeeee;
}

@media screen and (max-width: 600px) {
  div#app div#login {
    align-items: unset;
    background-color: unset;
    display: unset;
    justify-content: unset;
  }

  div#app div#login div#description {
    margin: 0 auto;
    max-width: 350px;
    width: 100%;
  }

  div#app div#login div#form {
    border-radius: unset;
    box-shadow: unset;
    width: 100%;
  }

  div#app div#login div#form form {
    margin: 0 auto;
    max-width: 280px;
    width: 100%;
  }
}
</style>