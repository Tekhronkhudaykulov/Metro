import { QRCode } from "antd";
import "./module.css";
import { queueStore } from "../../store";

const Check = () => {
  const { check } = queueStore();

  return (
    <div className="check">
      <div className="check-block">
        <div className="font-700">Bekat: Novza</div>
        <div className="font-700">Vestibul: 2</div>
      </div>
      <div className="check-block">
        <div className="font-700">Sana: 14-11-2024 yil</div>
        <div className="font-700">Vaqt: 10:55:32</div>
      </div>
      <div className="text-center font-700">{`<<TOSHKENT METROPOLITENI>> UK`}</div>
      <div className="text-center">Yo\'lovchi chiptasi</div>
      <div className="check-number-block text-center">
        Chipta raqami: <span className="check-number font-700">#2005794</span>
      </div>
      <div className="warning leading-[1.2] text-justify">
        DIQQAT! Bir martalik chipta faqat ushbu bekatda 1 ta qatnov uchun amal
        qiladi !
      </div>
      <div className="qr mt-2">
        <QRCode value={`${check?.prefix}${check?.number}`} />
      </div>
    </div>
  );
};

export default Check;
