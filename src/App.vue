<template>
  <nav class="navbar navbar-expand-lg bg-black navbar-dark">
    <div class="container">
      <a href="#" class="navbar-brand">0R0CHI Batsuzoku</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navmenu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navmenu">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/m1" class="nav-link">Songs</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/shop" class="nav-link">Shop</router-link>
          </li>
          <li class="nav-item ms-lg-5 mt-sm-3 mt-lg-0">
            <router-link to="/logout" class="nav-link">Logout</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view/>
</template>

<style>
</style>
