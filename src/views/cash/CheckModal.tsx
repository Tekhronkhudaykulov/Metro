import  { useEffect, useRef, useState } from "react";
import { Button, Modal } from "antd";
import { modalsStore,  } from "../../store";
import { Check } from "../../components";
import { CloseOutlined } from "@ant-design/icons";
import { PortPrint } from "../../config";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../router";

const CheckModal = ({ count, price }: any) => {
  const { closeModal, modals } = modalsStore();

  // WebSocket ulanish holatini boshqarish uchun ref va state
  const socketRef = useRef<WebSocket | null>(null);
  const [isSocketOpen, setIsSocketOpen] = useState(false);
  

  const navigate = useNavigate()

  // useEffect: WebSocket ulanishini boshqaradi
  useEffect(() => {
    const socket = new WebSocket(PortPrint); // Portni o'zgartiring
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connection established.");
      setIsSocketOpen(true);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error: ", error);
      setIsSocketOpen(false);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
      setIsSocketOpen(false);
    };

    // Komponentdan chiqishda WebSocketni yopish
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, []);

  // Malumotlarni yuborish funksiyasi
  const handlePrint = () => {
    if (!isSocketOpen || !socketRef.current) {
      console.error("Socket is not open. Cannot send data.");
      return;
    }
  
    // JSON formatidagi ma'lumotlar
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
        ticketTitle:
          "DIQQAT! Bir martalik chipta faqat ushbu bekatda 1 ta qatnov uchun amal qiladi !",
        count: count,
      },
      list: [
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
  
    try {
      // JSON ma'lumotlarini WebSocket orqali yuborish
      socketRef.current.send(openCommand);
      closeModal("check");
      navigate(APP_ROUTES.HOME);
      console.log("JSON data sent to WebSocket successfully.");
    } catch (error) {
      console.error("Failed to send JSON data: ", error);
    }
  };
  
  return (
    <Modal
      footer={null}
      centered
      closeIcon={
        <CloseOutlined className="[&>svg]:fill-[#C82E2E] [&>svg]:text-[28px]" />
      }
      open={modals?.check}
      width={690}
      classNames={{ content: "!py-[50px]" }}
      onCancel={() => closeModal("check")}
    >
      <Check />
      <div className="flex items-center justify-center gap-6 mt-10">
        <Button
          onClick={handlePrint}
          type="primary"
          className="w-[360px] h-[66px] rounded-[13px]"
        >
          <span className="text-[28px] font-500">Продолжить</span>
        </Button>
      </div>
    </Modal>
  );
};

export default CheckModal;
