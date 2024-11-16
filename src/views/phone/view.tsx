import { Input } from "antd";
import { PhoneInput, PhoneVariants } from "../../components";
import { Footer } from "../../layouts";
import { modalsStore } from "../../store";
import PrintCheckModal from "./PrintCheckModal";
import SuccessModal from "./SuccessModal";
import KeyboardComponent from "../../components/KeyboardComponent/view";
import { numericKeyboard } from "../../components/KeyboardComponent/typesKeyboars";

const Phone = () => {
  const { openModal } = modalsStore();
  return (
    <>
      <div className="bg-white px-5">
        <div className="flex gap-4">
          <div className="min-w-[785px] w-[785px]">
            <div className="bg-[#f4f4f4] rounded-[36px] py-4 px-5 mb-3">
              <div className="font-500 text-[25px] mb-2">
                Введите номер телефона для оплатить сдачи
              </div>
              <PhoneInput />
            </div>
            <div className="bg-[#f4f4f4] rounded-[36px] py-4 px-5">
              <div className="font-500 text-[25px] mb-2">
                Введите сумму платежа
              </div>
              <Input
                className="border-transparent w-full h-[90px] p-5 bg-white rounded-[21px] text-[41px] font-500"
                value={"5000 UZS"}
              />
            </div>
          </div>
          <div className="w-full">
            <PhoneVariants />
            <KeyboardComponent numeric layout={numericKeyboard} />
          </div>
        </div>
        <Footer nextText="ПРОДОЛЖИТЬ" onNext={() => openModal("printCheck")} />
      </div>
      <PrintCheckModal />
      <SuccessModal />
    </>
  );
};

export default Phone;
