import RoomId from './views/room/index.vue'
import CreateRoom from './views/create-room/index.vue'
import NotFound from './views/not-found.vue'

export const routes = [
  { name: 'create-room', path: '/room/create', component: CreateRoom },
  { name: 'room-id', path: '/room/:id', component: RoomId },
  { name: 'not-found', path: '/:path(.*)', component: NotFound },
]
