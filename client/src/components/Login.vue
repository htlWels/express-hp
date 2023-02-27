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
                  <form @submit.prevent="doLogin" class="row g-4">
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
                    <div class="col-12" v-if="error !=''">
                      <div class="form-check-label">
                        <label class="form-check-label" for="inlineFormCheck"
                          >Error</label
                        >
                        {{error }}
                                              <i
                          class="bi bi-bug px-2"
                          style="font-size: 2rem; color: red"
                        ></i>
                       
                      </div>
                    </div>
                    <div class="col-6">
                      <button
                        @click="login"
                        type="submit"
                        class="btn btn-primary px-4 float-end mt-4"
                      >
                        login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div class="col-md-5 ps-0 d-none d-md-block">
                <div
                  class="form-right h-100 bg-primary text-white text-center pt-5"
                >
                  <i class="bi bi-bootstrap"></i>
                  <h2 class="fs-1">Welcome Back!!!</h2>
                </div>
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
let HOST="http://localhost:3001"

const doLogin = () => {
  error.value = "";
  //const hash = bcrypt.hashSync(password.value, salt);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  };
  fetch(`${HOST}/login`, requestOptions).then((response) => {
    if (response.status == 200) {
      localStorage.setItem("token", {
        userID:response.data.userId,
        user: response.data.user,
        token: response.data.token
      });
      router.push("/home");
    } else if (response.status == 435) {
      error="User: " +  username.value + " not known!"
      router.push("/register");

    } 
    else if (response.status == 436) {
      error.value = "Wrong password";
      password.value = "";
    } else error.value = "Error on server side!";
  });
};
</script>

<style>
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 30px;
}
</style>
