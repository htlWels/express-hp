<template>
    <div class="container mt-5">
      <h1>Upload File</h1>
      <div class="row">
        <div class="col-md-6">
          <div class="dropzone mb-3" @dragover.prevent >
            <div class="dz-message">
              Drag and drop your file here, or click to select a file
            </div>
            <div class="progress mb-3" v-if="progress > 0" >
              <div class="progress-bar" role="progressbar" :style="{ width: progress + '%' }"></div>
            </div>
            <div class="preview mb-3" v-if="imageUrl">
              <img :src="imageUrl" class="img-fluid" alt="Preview">
            </div>
            <input type="file" ref="fileInput" class="visually-hidden" @change="onFileChange">
            <button type="button" class="btn btn-primary" @click="submitFile">Upload</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup >
    import axios from 'axios'
    import {ref} from "vue"
 
    let file = ref(null)
    let progress = ref(0)
    let imageUrl=ref(null)

    function onFileChange(event) {
        file = event.target.files[0];
        previewFile(file);
    }
    function previewFile(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            imageUrl = reader.result;
        };
    }

    function submitFile() {
        const formData = new FormData();
        formData.append('file', file);
        axios.post('http://localhost:3001/upload', formData, {
            onUploadProgress: progressEvent => {
            progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            }
        }).then(response => {
            console.log(`File uploaded successfully with filename: ${response.data.filename}`);
        }).catch(error => {
            console.error(error);
        });
    }


  </script>
  
  <style>
  .dropzone {
    border: 2px dashed #ccc;
    border-radius: 5px;
    padding: 20px;
    text-align: center;
    background-color: #f6f6f6;
    cursor: pointer;
  }
  
  .dropzone .dz-message {
    margin: 20px auto;
    font-size: 1.5rem;
    color: #aaa;
  }
  
  .dropzone .preview {
    border: 2px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    background-color: #fff;
  }
  
  .dropzone .preview img {
    max-width: 100%;
  }
  
  .visually-hidden {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
  }
  </style>
  