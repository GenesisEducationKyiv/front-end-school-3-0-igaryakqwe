import { io } from 'socket.io-client';
import { env } from '@/config/env';

export const socket = io(env.BASE_API_URL, {
  transports: ['websocket', 'polling'],
  autoConnect: false,
});
