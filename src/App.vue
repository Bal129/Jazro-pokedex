<template>
	<nav>
	<!-- <RouterLink to="/">Home</RouterLink> -->
	<RouterLink to="/">Main</RouterLink>
	<RouterLink to="/detail">detail</RouterLink>
	</nav>

  	<RouterView />
	<footer class="pb-4">
        <div class="bg-dark text-muted">
            <div class="container">
                <div class="row d-flex justify-content-between">
                    <p class="text-light p-4">
                        This is a small project created by 
                        <i>Ahmad Iqbal Bin Che Shamshudin</i>
                        for <i>Jazari Robot Resources Front-End Challenges</i>
                        Visit my <a href="https://github.com/Bal129">Github</a> for more projects
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
