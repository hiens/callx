import RoomId from './views/room/Id.vue'
import CreateRoom from './views/room/Create.vue'
import NotFound from './views/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { path: '/room/create', component: CreateRoom },
  { path: '/room/:id', component: RoomId },
  { path: '/:path(.*)', component: NotFound },
]
