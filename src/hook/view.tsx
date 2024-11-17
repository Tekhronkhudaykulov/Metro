import { useEffect } from "react";
import { socketValueStore } from "../store";
import { Port } from "../config";


export const CashDevice = () => {
    const { addValue } = socketValueStore();
  
    useEffect(() => {
      const socket = new WebSocket(Port);
  
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
            alert("Transaction rejected. The amount will not be added.");
            // Qo'shimcha ishlarni bajarish mumkin (masalan, to'lovni qayta ishlash)
          } else if (message.method === "READ" && message.data) {
            const valueObject = { id: Date.now(), amount: message.data };
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
        socket.close();
      };
    }, [addValue]);
  };
  

  export const CheckPrinterFunc = ({count, price}: any) => {
        useEffect(() => {
            const socket = new WebSocket(Port);

            socket.onopen = () => {
                const openCommand = JSON.stringify({
                  device: "PRINTER",
                  method: "OPEN",
                  data: {
                    kioskId: "1",
                    address: "Bekat: Novza",
                    date: "Sana: 14-11-2024 yil",
                    time: "Vaqt: 10:55:32",
                    company: "<<TOSHKENT METROPOLITENI>> UK",
                    vesTibul: "Vestibul: 2",
                    ticketNum: "Chipta raqami: #2005794",
                    ticketTitle: "DIQQAT! Bir martalik chipta faqat ushbu bekatda 1 ta qatnov uchun amal qiladi !",
                    count: count
                  },
                  lst: [
                    { key: "Chipta raqami", value: "#2005794" },
                    { key: "Дата и время", value: "" },
                    { key: "Сумма платежа", value: `${price} сум` },
                    { key: "Комиссия", value: `0 сум (0%)` },
                    { type: "break" },
                    { key: "Общая сумма", value: `${price} сум`, bold: true },
                    { key: "Статус платежа", value: "Оплачен", bold: true },
                    { key: "QR", value: "https://infinitypay.uz/" },
                  ],
                });
                socket.send(openCommand);
              };
              
        },[])
  }