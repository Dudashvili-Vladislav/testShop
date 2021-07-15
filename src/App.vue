<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  * {
    box-sizing: border-box;
  }
}

img {
  max-width: 100%;
}

.product-item {
  width: 300px;
  text-align: center;
  margin: 0 auto;
  border-bottom: 2px solid #f5f5f5;
  background: white;
  font-family: "Open Sans";
  transition: 0.3s ease-in;
}
.product-item:hover {
  border-bottom: 2px solid #fc5a5a;
}
.product-item img {
  display: block;
  width: 100%;
}
.product-list {
  background: #fafafa;
  padding: 15px 0;
}
.product-list h3 {
  font-size: 18px;
  font-weight: 400;
  color: #444444;
  margin: 0 0 10px 0;
}
.price {
  font-size: 16px;
  color: #fc5a5a;
  display: block;
  margin-bottom: 12px;
}
.button {
  text-decoration: none;
  display: inline-block;
  padding: 0 12px;
  background: #cccccc;
  color: white;
  text-transform: uppercase;
  font-size: 12px;
  line-height: 28px;
  transition: 0.3s ease-in;
}
.product-item:hover .button {
  background: #fc5a5a;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.invalid-feedback {
  text-align: left;
}
</style>
