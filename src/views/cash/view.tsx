import { useState } from "react";
import { ASSETS } from "../../assets/images/assets";
import { BackBtn, Counter } from "../../components";
import { modalsStore, socketValueStore } from "../../store";
import CheckModal from "./CheckModal";
import { CashDevice } from "../../hook/view";
import Notification from "../../components/Notification/view";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../router";
import "./index.scss";

const Cash = () => {
  const { openModal, modals } = modalsStore();
  const [value, setValue] = useState(2000);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();

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

  const { getTotal } = socketValueStore();
  let total = getTotal()
  // Qaytimni hisoblash va salbiy qiymatni oldini olish
  let change = total - value;
  if (change < 0) change = 0;

  // Qaytimni saqlash uchun localStorage
  localStorage.setItem("changeMoney", change.toString());

  console.log("Change stored:", change);

  CashDevice();

  return (
    <>
      <div className="flex gap-6 px-5 h-full justify-center">
        <div className="min-w-[740px] w-[740px]">
          <div className="text-[30px] mb-2 text-center font-bold">Kоличество билета</div>
          <div className="flex justify-center">
            <Counter
              onClickIncrement={() => handleIncrement()}
              onClickDecrement={() => handleDecrement()}
              count={count}
            />
          </div>
          <div className="bg-purple rounded-[36px] py-5 px-4 my-10">
            <div className="bg-white mb-4 rounded-[31px] px-5 py-4 flex items-center justify-between">
              <div className="text-left text-[31px] font-500">Стоимость билета:</div>
              <div className="text-right text-[31px] font-700">2,000 сум</div>
            </div>
            <div className="bg-white rounded-[31px] py-4 px-5">
              <div className="flex items-center justify-between">
                <div className="text-left text-[31px] font-500">Введенная сумма:</div>
                <div className="text-right text-[31px] font-700">{`${total.toLocaleString("UZ-uz")} сум`}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-left text-[31px] font-500">Сдача:</div>
                <div className="text-right text-[31px] font-700">
                  {`${change.toLocaleString("UZ-uz")} сум`}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-left text-[31px] font-500">Общая сумма:</div>
                <div className="text-right text-[31px] font-700">
                  {value.toLocaleString("UZ-uz")} сум
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

      <div>
        <footer className="absolute bottom-[40px] left-0 w-full flex items-center justify-center gap-3">
          <BackBtn />
          <Button
            onClick={() => openModal("check")}
            className="rounded-[16px] w-[505px] h-[110px]"
            type="primary"
          >
            <span className="text-[27px] font-600 uppercase">Получить билет</span>
          </Button>
          {change > value && (
            <div
              onClick={() => navigate(APP_ROUTES.PHONE)}
              className="rounded-[16px] w-[505px] flex items-center justify-center rounded-[16px] h-[110px] animate-pulse bg-blue-500 text-white px-4 py-2 rounded transition transform scale-100 hover:scale-105"
            >
              <span className="text-[27px] font-600 uppercase">{`Получить сдачу ${change.toLocaleString(
                "UZ-uz"
              )} сум`}</span>
            </div>
          )}
        </footer>
      </div>
      {modals?.check && <CheckModal count={count} price={total} />}
      {modals?.cashModal && <Notification message={"Внесенные купюры могут быть подделкой !"} />}
    </>
  );
};

export default Cash;
