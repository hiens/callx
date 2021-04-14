import RoomId from './views/room/Id.vue'
import CreateRoom from './views/room/Create.vue'
import NotFound from './views/NotFound.vue'

export const routes = [
  { path: '/room/create', component: CreateRoom },
  { path: '/room/:id', component: RoomId },
  { path: '/:path(.*)', component: NotFound },
]
