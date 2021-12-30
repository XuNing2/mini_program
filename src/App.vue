<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <!-- <router-link to="/about">About</router-link>|
            <router-link to="/infos">Infos</router-link>|
            <router-link to="/infos_normal">Infos_normal</router-link>|
            <router-link to="/record">Record</router-link>|
            <router-link to="/record_camera">Record_camera</router-link>|
            <router-link to="/tutorial">Tutorial</router-link>|
            <router-link to="/thanks">Thanks</router-link>| -->
            <router-link to="/result">Result</router-link>|
            <!-- <router-link to="/mjoa">qs_mJOA</router-link>|
            <router-link to="/record_video">record_video</router-link>|
            <router-link to="/test">Test</router-link>| -->
        </div>
        <router-view />
    </div>
</template>

<script>
export default {};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 20px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
