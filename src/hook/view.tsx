import { useEffect, useRef } from "react";
import { modalsStore, socketValueStore } from "../store";
import { Port, PortPrint } from "../config";


// export const CashDevice = () => {
//     const { addValue } = socketValueStore();
 
//   const { openModal } = modalsStore();

   
  
//     useEffect(() => {
//       const socket = new WebSocket(Port);
  
//       socket.onopen = () => {
//         const openCommand = JSON.stringify({
//           device: "BILL_ACCEPTOR",
//           method: "OPEN",
//         });
//         socket.send(openCommand);
//       };
  
//       socket.onmessage = (event) => {
//         try {
//           const message = JSON.parse(event.data);
//           console.log("Received message:", message);
  
//           if (message.data === "REJECTED") {
//             openModal("cashModal")
//             // Qo'shimcha ishlarni bajarish mumkin (masalan, to'lovni qayta ishlash)
//           } else if (message.method === "READ" && message.data) {
//             const valueObject = { id: Date.now(), amount: message.data };
//             addValue(valueObject);
//           }
//         } catch (error) {
//           console.error("Error parsing message:", error);
//         }
  
//         const stackCommand = JSON.stringify({
//           device: "BILL_ACCEPTOR",
//           method: "STACK",
//         });
//         socket.send(stackCommand);
//       };
  
//       return () => {
//         socket.close();
//       };
//     }, [addValue]);
// };
  
export const CashDevice = () => {
  const { addValue } = socketValueStore();
  const { openModal } = modalsStore();
  const socketRef = useRef<WebSocket | null>(null); // WebSocketni boshqarish uchun ref

  useEffect(() => {
    const socket = new WebSocket(Port);
    socketRef.current = socket;

    socket.onopen = () => {
      const openCommand = JSON.stringify({
        device: "BILL_ACCEPTOR",
        method: "OPEN",
      });
      socket.send(openCommand);
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log("Received message:", message);

        if (message.data === "REJECTED") {
          openModal("cashModal");
        } else if (message.method === "READ" && message.data) {
          const valueObject = { id: Date.now(), amount: message.data };
          // @ts-ignore
          addValue(valueObject);
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }

      const stackCommand = JSON.stringify({
        device: "BILL_ACCEPTOR",
        method: "STACK",
      });
      socket.send(stackCommand);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close(); // WebSocketni tozalash
        socketRef.current = null;
      }
    };
  }, [addValue]);

  return null; // Bu komponentdan UI chiqmaydi
};

  export const HandlePrint = ( count: any, price: any ) => {
      let allPrice = price;
      let allCount = count
      const socket = new WebSocket(PortPrint); // Portni mos ravishda o'zgartiring
  
      socket.onopen = () => {
        const openCommand = JSON.stringify({
          device: "PRINTER",
          method: "OPEN",
          data: {
            station: "Bekat: Novza",
            // ticketNum: "Chipta raqami: #2005794",
            count: allCount,
            price: allPrice
          },
        });
        socket.send(openCommand);
      };
  
      socket.onerror = (error) => {
        console.error("WebSocket error: ", error);
      };
  
      socket.onclose = () => {
        console.log("WebSocket connection closed.");
      };
  };