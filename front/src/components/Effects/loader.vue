<template>
  <div class="loader">
        <i class="fas fa-sync fa-spin fa-3x"></i>
    </div>
</template>

<script>
export default {
    name:"loader",

}
</script>

<style>
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