<template>
  <div class="login-page bg-light">
    <div class="container">
      <div class="row">
        <div class="col-lg-10 offset-lg-1">
          <h3 class="mb-3">Login Now</h3>
          <div class="bg-white shadow rounded">
            <div class="row">
              <div class="col-md-7 pe-0">
                <div class="form-left h-100 py-5 px-5">
                  <form   class="row g-4">
                    <div class="col-12">
                      <label>Username<span class="text-danger">*</span></label>
                      <div class="input-group">
                        <div class="input-group-text">
                          <i class="bi bi-person-fill"></i>
                        </div>
                        <input
                          type="text"
                          v-model="username"
                          class="form-control"
                          placeholder="Enter Username"
                        />
                      </div>
                    </div>

                    <div class="col-12">
                      <label>Password<span class="text-danger">*</span></label>
                      <div class="input-group">
                        <div class="input-group-text">
                          <i class="bi bi-lock-fill"></i>
                        </div>
                        <input
                          type="text"
                          v-model="password"
                          class="form-control"
                          placeholder="Enter Password"
                        />
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="inlineFormCheck"
                        />
                        <label class="form-check-label" for="inlineFormCheck"
                          >Remember me</label
                        >
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <a href="#" class="float-end text-primary"
                        >Forgot Password?</a
                      >
                    </div>
                    <hr />
                    <div class="col-12">
                      <div class="form-check-label">
                        <label class="form-check-label" for="inlineFormCheck"
                          >Don't have an account?</label
                        >
                        <i
                          class="bi bi-box-arrow-in-right px-2"
                          style="font-size: 2rem; color: cornflowerblue"
                        ></i>
                        <a href="#" class="text-primary px-2">Sign in</a>
                      </div>
                    </div>
                    <div class="col-12" v-if="error != ''">
                      <div class="form-check-label">
                        <label class="form-check-label" for="inlineFormCheck"
                          >Error</label
                        >
                        {{ error }}
                        <i
                          class="bi bi-bug px-2"
                          style="font-size: 2rem; color: red"
                        ></i>
                      </div>
                    </div>
                    <div class="col-5">
                      <button
                        @click="doLogin"
                        type="submit"
                        class="btn btn-outline-primary px-4 float-end mt-4"
                      >
                      <i class="bi bi-house-lock"></i>
                        Login
                      </button>
                    </div>

                    <div class="col-6">
                    
                      <button
                        @click="loginGoogle"
                        type="submit"
                        class="btn ml-4 btn-outline-primary mt-4"
                       
                        
                      >
                      <i class="bi bi-google" style="color:red"></i>
                        Login with Google
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div class="col-md-5 ps-0 d-none d-md-block">
                <div
                  class="form-right h-200 w-400 text-white text-center pt-5"></div>
                
                  
                  <img src="https://img.freepik.com/free-photo/reflection-mountain-beautiful-lake_181624-4853.jpg?size=626&ext=jpg" width="360"/>
                
                   <h2 class="mt-5">Welcome back!</h2>
                </div>
            </div>
          </div>
          <p class="text-end text-secondary mt-3">
            Bootstrap 5 Login Page Design
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import router from "@/router";
let username = ref("");
let password = ref("");
let error = ref("");
let HOST = "http://localhost:3001";

const doLogin = () => {
  console.log("doLogin ...")
  error.value = "";
  if (username.value.length==0) {
    error.value="Field 'user' cannot be empty!"
    return;
  }
  if (password.value.length==0) {
    error.value="Field 'password' cannot be empty!"
    return;
  }
  //const hash = bcrypt.hashSync(password.value, salt);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  };
  fetch(`${HOST}/login`, requestOptions)
  .then((response) => {
    if (response.status == 200) {
      localStorage.setItem("token", {
        userID: response.email,
        token: response.token,
      }); 
      router.push("/home");
    } else if (response.status == 435) {
      error = "User: " + username.value + " not known!";
      router.push("/register");
    } else if (response.status == 436) {
      error.value = "Wrong password";
      password.value = "";
    } else error.value = "Error on server side!";
  });
};

function loginGoogle() {
  console.log("loginGoogle ...")
  fetch(`${HOST}/auth/google`).then((response) => {
    if (response.status == 200) {
      localStorage.setItem("token", {
        userID: response.data.userId,
        user: response.data.user,
        token: response.data.token,
      });
      router.push("/home");
    } else if (response.status == 435) {
      error = "User: " + username.value + " not known!";
      router.push("/register");
    } else if (response.status == 436) {
      error.value = "Wrong password";
      password.value = "";
    } else error.value = "Error on server side!";
  });
}
</script>

<style>
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 30px;
}
</style>
