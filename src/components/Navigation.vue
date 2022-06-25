<template>
  <nav className="navbar px-4 py-3 shadow-sm">
    <h5 className="navbar-brand">
      <router-link to="/">{{ brand }}</router-link>
    </h5>

    <button
      type="button"
      :class="['nav-toggler btn', mobileMenu && 'active']"
      @click="openMenu"
    >
      <span />
      <span />
      <span />
    </button>

    <div :class="[mobileMenu && 'd-view', 'navbar-custom ']">
      <ul className="navbar-nav mx-auto">
        <li class="nav-item" v-for="link in navItems" :key="link.name">
          <router-link :to="link.url" class="nav-link">{{
            link.name
          }}</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    brand: String,
  },
  data() {
    const navItems = [
      { name: "Sign up", url: "/signUp" },
      { name: "Sign in", url: "/signIn" },
      { name: "How it works", url: "/" },
    ];
    return { toggle: false, navItems, mobileMenu: false };
  },
  methods: {
    openMenu() {
      return (this.mobileMenu = !this.mobileMenu);
    },
  },
};
</script>

<!-- <style lang="scss" scoped></style> -->
