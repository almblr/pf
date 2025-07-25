<template>
  <header>
    <div class="container">
      <Logo />
      <nav class="navigation">
        <ChangeLanguage />
        <HeaderNav v-if="config.isDesktop" />
      </nav>
      <button class="burger" v-if="!config.isDesktop">
        <Burger />
      </button>
    </div>
    <div class="colorBand" ref="band"></div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useConfig } from "@/stores/store";
import { useWindowScroll } from "@vueuse/core";
import Logo from "@/components/header/Logo.vue";
import HeaderNav from "@/components/header/HeaderNav.vue";
import ChangeLanguage from "@/components/header/ChangeLanguage.vue";
import Burger from "@/components/header/Burger.vue";

const { y } = useWindowScroll();
const config = useConfig();
const band = ref<HTMLElement | null>(null);

const checkValue = (value: number | boolean): void => {
  if (typeof value === "number") {
    const scrollToTop = value;
    if (scrollToTop !== 0) {
      if (band.value) band.value.classList.add("colorBandWidth");
    } else {
      if (band.value) band.value.classList.remove("colorBandWidth");
    }
  } else if (typeof value === "boolean") {
    const isMenuOpen = value;
    const scrollToTop = y.value;
    if (band.value) {
      if (isMenuOpen) {
        band.value.style.boxShadow = "none";
        band.value.classList.add("colorBandWidth");
      } else {
        band.value.style.boxShadow = "0 0 10px 0 rgba(0, 0, 0, 0.2)";
        if (scrollToTop === 0) band.value.classList.remove("colorBandWidth");
      }
    }
  }
};

watch(() => y.value, checkValue);
watch(() => config.menuIsOpen, checkValue);
</script>

<style scoped lang="scss">
header {
  @include jcCt-aiCt;
  position: fixed;
  padding: 0 15px;
  min-height: 80px;
  height: 80px;
  width: 100%;
  z-index: 1000;
  color: #212529;
  .container {
    @include jcCt-aiCt;
    position: relative;
    width: 1400px;
    height: 80px;
    & > .navigation {
      display: flex;
      justify-content: flex-end;
      flex: 1;
      height: 100%;
    }
  }
}

.burger {
  @include jcCt-aiCt;
  min-height: 80px;
  width: 50px;
  border: none;
  background-color: transparent;
}

.colorBand {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
  transition: 300ms ease-in-out;
  width: 0;
  z-index: -2;
}

.colorBandWidth {
  width: 100%;
}
</style>
