 <template>
  <div id="app">
    <div id="login">
      <div id="description">
        <h1>Login</h1>
      </div>
      <div id="form">
        <form @submit.prevent="doLogin">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="elon musk"
            autocomplete="off"
          />

          <label for="password">Password</label>&nbsp;
          <i @click="hidePassword = !hidePassword"></i>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="**********"
          />

          <button type="submit">Log in</button>
        </form>
      </div>
      <div v-if= "error">
        <h2>ERROR</h2>
        <p>{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';
let username = ref('');
const hidePassword = ref(true);
let password = ref('');
let error= ref('')

const doLogin = () => {
  error.value=""
  //const hash = bcrypt.hashSync(password.value, salt);
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  };
  fetch('/auth', requestOptions).then((response) => {
    if (response.status == 200) {
      router.push('/home');
    }
    else if (response.status == 435)
      router.push("/register")
    else if (response.status == 436) {
      error.value="Wrong password"
      password.value=''
    }
    else
    error.value="Error on server side!"
      
    
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