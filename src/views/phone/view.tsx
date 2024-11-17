import { Input } from "antd";
import { PhoneVariants } from "../../components";
import { Footer } from "../../layouts";
import { modalsStore } from "../../store";
import PrintCheckModal from "./PrintCheckModal";
import SuccessModal from "./SuccessModal";
import KeyboardComponent from "../../components/KeyboardComponent/view";
import { numericKeyboard } from "../../components/KeyboardComponent/typesKeyboars";
import { useRef, useState } from "react";
import InputMask from "react-input-mask";



const Phone = () => {
  const { openModal } = modalsStore();

  const [active, setActive] = useState(1);
  const [phone, setPhone] = useState("");
  const [inputName, setInputName] = useState<string>("");
  const keyboard = useRef(null);



  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPhone(value);

    if (keyboard.current && inputName === "phone") {
      // @ts-ignore
      keyboard.current.setInput(value);
    }
  };

  const handleKeyPress = (button: string) => {
    if (button === "{bksp}") {
      const updatedValue = phone.slice(0, -1);
      setPhone(updatedValue);
      // @ts-ignore

      if (keyboard.current) keyboard.current.setInput(updatedValue);
    } else if (button !== "{shift}" && button !== "{lock}") {
      const updatedValue = phone + button;
      setPhone(updatedValue);
      // @ts-ignore
      if (keyboard.current) keyboard.current.setInput(updatedValue);
    }
  };

  return (
    <>
      <div className="bg-white px-5">
        <div className="flex gap-4">
          <div className="min-w-[785px] w-[785px]">
            <div className="bg-[#f4f4f4] rounded-[36px] py-4 px-5 mb-3">
              <div className="font-500 text-[25px] mb-2">
                Введите номер телефона для оплатить сдачи
              </div>
              <div onClick={() => setActive(1)} className={`bg-white rounded-[21px] ${active === 1 ? "border-[#1677ff] border-[1px]" : ''}`}>
                <div className="flex items-center px-[20px]">
                  <div onClick={() => setActive(1)}
                    className={`${
                      active === 1 && "focus-input"
                    } flex items-center gap-[20px] p-[10px] bg-white rounded-[22px]`}
                  >
                  <div className="text-[41px] font-[400] border-r-[5px] border-[#E8E8E8] pr-[20px]">
                    +998
                  </div>  
                  <InputMask
                    id="phone"
                    name="phone"
                    mask="99 999 99 99"
                    className="text-[41px] p-0 h-[50px] font-[400] !outline-none border-none !no-caret"
                    value={phone}
                    onFocus={(e: any) => {
                      e.target.blur();
                      setInputName("phone");
                    }}
                    onChange={onChangeInput}
                    maskChar={null}
                    disabled
                  >
                    {
                      // @ts-ignore
                      (inputProps) => <input {...inputProps} />
                    }
                  </InputMask>
                </div>
                </div>
              </div>
            </div>
            <div className="bg-[#f4f4f4] rounded-[36px] py-4 px-5">
              <div className="font-500 text-[25px] mb-2">
                Введите сумму платежа
              </div>
              <Input
              onClick={() => setActive(0)}
                className="border-transparent  w-full h-[90px] p-5 bg-white rounded-[21px] text-[41px] font-bold"
                value={"5000 UZS"}
              />
            </div>
          </div>
          <div className="w-full">
            <PhoneVariants />
            {/* <KeyboardComponent numeric layout={numericKeyboard} onChange={(e) => setValue(e)}/> */}
            <KeyboardComponent
            className="mx-auto mt-8"
            layout={numericKeyboard}
            ref={(r: any) => (keyboard.current = r)}
            handleKeyPress={handleKeyPress}
            inputName={inputName}
            numeric
            />
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
