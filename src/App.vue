<template>
  <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
    <div class="container">
      <a href="#" class="navbar-brand fw-bold">0R0CHI Batsuzoku</a>
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
            <router-link to="/" class="nav-link fw-bold">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link fw-bold">About</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/m1" class="nav-link fw-bold">Songs</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/shop" class="nav-link fw-bold">Shop</router-link>
          </li>
          <li class="nav-item ms-lg-5 mt-sm-3 mt-lg-0">
            <router-link to="/logout" class="nav-link fw-bold">Logout</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view/>
</template>

<style>
</style>
