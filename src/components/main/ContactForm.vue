<template>
  <section id="contact">
    <form ref="form" @submit.prevent="submit">
      <h3>CONTACT</h3>
      <input
        v-model="name"
        :placeholder="$t('misc.inputName')"
        type="text"
        required
      />
      <input v-model="email" type="email" placeholder="EMAIL *" required />
      <textarea v-model="message" placeholder="MESSAGE *" required></textarea>
      <button type="submit">{{ $t("misc.sendMessageBtn") }}</button>
    </form>
    <div class="popup" v-if="showPopup">{{ $t("misc.popupMsg") }}</div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useConfig } from "@/stores/store";
import useContact from "@/composables/use-contact";

const config = useConfig();
const { sendEmail } = useContact()
const form = ref<HTMLElement | null>(null);
const name = ref("");
const email = ref("");
const message = ref("");
const showPopup = ref(false);

const submit = async () => {
  console.log(name.value);
  console.log(email.value);
  console.log(message.value);
  await sendEmail(name.value, email.value, message.value);
  toggleShowPopup();
};

const toggleShowPopup = () => {
  showPopup.value = true;
  setTimeout(() => {
    showPopup.value = false;
  }, 3000);
};

onMounted(() => {
  config.categories.c3 = document.querySelector("#contact");
});
</script>

<style scoped lang="scss">
section {
  @include fdCol-jcCt-aiCt;
  min-height: 600px;
  width: 100%;
  padding: 70px 20px;
  h3 {
    width: 100%;
    font-size: 3rem;
    color: rgb(48, 44, 44);
  }
}

form {
  display: flex;
  column-gap: 10px;
  flex-wrap: wrap;
  max-width: 900px;
  height: 400px;
  color: white;
  & input,
  textarea {
    border: 1px solid black;
    outline: none;
    padding: 1em;
    &::placeholder {
      color: black;
      font-size: 1.2em;
    }
    &:focus::placeholder {
      color: rgba(0, 0, 0, 0.5);
    }
  }
  & input {
    flex: 1;
    height: 50px;
  }
  & textarea {
    width: 100%;
    height: 150px;
  }
  & button {
    width: 200px;
    height: 60px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: transparent;
    border: 1px solid #212529;
    cursor: pointer;
  }
}

.popup {
  @include jcCt-aiCt;
  position: absolute;
  bottom: 170px;
  left: calc(50% - 100px);
  width: 200px;
  height: 35px;
  border-radius: 2px;
  background-color: rgb(98, 179, 98);
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 5px 0 20px var(--shadowColor);
  color: white;
  z-index: 100;
  opacity: 0;
  animation: popup 3s ease-in-out;
}

@keyframes popup {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  3% {
    transform: translateY(-10px);
    opacity: 1;
  }
  95% {
    transform: translateY(-10px);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 0;
  }
}
</style>
