import { useState } from "react";
import { ASSETS } from "../../assets/images/assets";
import { Counter } from "../../components";
import { Footer } from "../../layouts";
import { modalsStore, socketValueStore } from "../../store";
import CheckModal from "./CheckModal";
import { CashDevice } from "../../hook/view";

const Cash = () => {
  const { openModal } = modalsStore();
  const [value, setValue] = useState(2000);
  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    setValue((prevValue) => prevValue + 2000); 
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (value > 2000) { 
      setValue((prevValue) => prevValue - 2000); 
      setCount((prevCount) => prevCount - 1);
    }
  };

  const { getTotal, values } = socketValueStore();



  const total = getTotal();


  CashDevice();

  return (
    <>
      <div className="flex gap-6 px-5 h-full justify-center">
        <div className="min-w-[740px] w-[740px]">
          <div className="text-[30px]  mb-2 text-center font-bold">Номер билета</div>
         <div className="flex justify-center">
         <Counter onClickIncrement={() => handleIncrement()} onClickDecrement={() => handleDecrement()} count={count}/>
         </div>
          <div className="bg-purple rounded-[36px] py-5 px-4 my-10">
            <div className="bg-white mb-4 rounded-[31px] px-5 py-4 flex items-center justify-between">
              <div className="text-left text-[31px] font-500">
                Стоимость билета:
              </div>
              <div className="text-right text-[31px] font-700">
                {value} сум
              </div>
            </div>
            <div className="bg-white rounded-[31px] py-4 px-5">
              <div className="flex items-center justify-between">
                <div className="text-left text-[31px] font-500">
                  Введенная сумма:
                </div>
                <div className="text-right text-[31px] font-700">
                {`${getTotal()} сум`}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-left text-[31px] font-500">Сдача:</div>
                <div className="text-right text-[31px] font-700">
                  5 000.00 сум
                </div>
              </div>
            </div>
          </div>
          <div className="text-[25px] font-bold mb-[-20px] text-center">Ввести наличные</div>
          <img className="w-[70%] object-cover mx-auto" src={ASSETS.cash} alt="" />
        </div>
        <div>
          <img className="h-[80%] object-contain" src={ASSETS.robot} alt="" />
        </div>
      </div>
      <Footer nextText="Получить билет" onNext={() => openModal("check")} />
      <CheckModal count={count} price={total}/>
    </>
  );
};

export default Cash;
