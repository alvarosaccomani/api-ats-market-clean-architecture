import SocketAdapter from "../../services/socketAdapter";

export default function configureNotificationSocket(socketAdapter: SocketAdapter) {
  socketAdapter.onConnection((socket) => {
    console.log(`📡 Cliente conectado a Sockets: ${socket.id}`);

    // Escuchar evento de nueva notificación y retransmitir a los demás clientes
    socket.on('NEW_NOTIFICATION', (data: any) => {
      console.log('🔔 Evento NEW_NOTIFICATION recibido en backend:', data);
      socket.broadcast.emit('NEW_NOTIFICATION', data);
    });

    // Escuchar evento de actualización de estado de pedido y retransmitir a los demás clientes
    socket.on('ORDER_STATUS_UPDATED', (data: any) => {
      console.log('📦 Evento ORDER_STATUS_UPDATED recibido en backend:', data);
      socket.broadcast.emit('ORDER_STATUS_UPDATED', data);
    });

    // Escuchar evento de nuevo mensaje de chat y retransmitir a los demás clientes
    socket.on('NEW_CHAT_MESSAGE', (data: any) => {
      console.log('💬 Evento NEW_CHAT_MESSAGE recibido en backend:', data);
      socket.broadcast.emit('NEW_CHAT_MESSAGE', data);
    });

    socket.on('disconnect', () => {
      console.log(`🔌 Cliente desconectado de Sockets: ${socket.id}`);
    });
  });
}
