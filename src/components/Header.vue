<template>
    <nav class="navbar navbar-expand-lg" data-bs-theme="dark">
        <div class="container">
          <div class="d-flex justify-content-between align-items-center w-100">
            <router-link exact class="navbar-brand"  to="/"><img src="/static/img/logo.svg" alt="logo"></router-link>
            <button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="rounded-start offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
              <div class="offcanvas-header">
                <router-link exact class="navbar-brand"  to="/"><img src="/static/img/mobile_logo.png" alt="logo"></router-link>
                <button type="button" class="btn-close btn-close-white shadow-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div class="offcanvas-body d-flex flex-column flex-lg-row ">
                <div class="d-flex align-items-center gap-3 flex-wrap flex-lg-nowrap mt-auto mt-lg-0 ms-0 ms-lg-auto">
                  <a target="_blank" href="https://staging.valutix.io/registration" class="order-3 order-lg-2 border_lightgreen rounded px-3 py-2 text-white text-decoration-none">Поддержка</a>
                  <a target="_blank" href="https://t.me/valutix" class="telegram order-1 order-lg-3 mb-5 mb-lg-0"><img src="/static/img/logos_telegram.svg" alt="telegram"></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
</template>

<script>
export default {

}
</script>

<style>
    .router-link-active {
        color: #4AA485 !important;
    }
.dropdown-menu.show {
    background: #35634F;
}
.nav-link {
    color: #fff;
    text-wrap: wrap;
    word-break: break-all;
}
.navbar-nav .nav-link.active {
    color: #4AA485;
}
.text-bg-dark {
    background-color: #35634F !important;
}
.border_lightgreen  {
    border: 1px solid #4AA485;
}

.navbar {
  border-bottom: 1px solid #35634F;
}

@media(max-width: 768px){
    .telegram {
        margin-right: 100%;
    }
}

</style>