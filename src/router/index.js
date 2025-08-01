import { createRouter, createWebHistory } from 'vue-router'
import MainView from "@/views/main/MainView.vue";
import DetailView from '@/views/detail/DetailView.vue';
import NotFound from '@/views/notfound/NotFound.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'main',
			component: MainView,
		},
		{
			path: '/pokemon/:id',
			name: 'detail',
			component: DetailView,
			props: true
		},
		{
			path: '/:catchAll(.*)',
			name: 'notfound',
			component: NotFound
		}
	],
})

export default router
