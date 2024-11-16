import { ASSETS } from "../../assets/images/assets";
import { Counter } from "../../components";
import { Footer } from "../../layouts";
import { modalsStore } from "../../store";
import CheckModal from "./CheckModal";

const Cash = () => {
  const { openModal } = modalsStore();
  return (
    <>
      <div className="flex gap-6 px-5 h-full">
        <div className="min-w-[740px] w-[740px]">
          <div className="text-[20px] font-500 mb-2">Номер билета</div>
          <Counter />
          <div className="bg-purple rounded-[36px] py-5 px-4 my-10">
            <div className="bg-white mb-4 rounded-[31px] px-5 py-4 flex items-center justify-between">
              <div className="text-left text-[31px] font-500">
                Стоимость билета:
              </div>
              <div className="text-right text-[31px] font-700">
                2 000.00 сум
              </div>
            </div>
            <div className="bg-white rounded-[31px] py-4 px-5">
              <div className="flex items-center justify-between">
                <div className="text-left text-[31px] font-500">
                  Введенная сумма:
                </div>
                <div className="text-right text-[31px] font-700">
                  7 000.00 сум
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
          <div className="text-[20px] font-500 mb-[-20px]">Ввести наличные</div>
          <img src={ASSETS.cash} alt="" />
        </div>
        <div>
          <img className="h-[80%] object-contain" src={ASSETS.robot} alt="" />
        </div>
      </div>
      <Footer nextText="Получить билет" onNext={() => openModal("check")} />
      <CheckModal />
    </>
  );
};

export default Cash;
