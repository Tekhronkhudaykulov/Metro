import { Button, Modal } from "antd";
import { modalsStore } from "../../store";
import { HomeOutlined } from "@ant-design/icons";
import { ASSETS } from "../../assets/images/assets";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../router";

interface Props {}

const PrintCheckModal = ({}: Props) => {
  const { closeModal, modals, openModal } = modalsStore();
  const navigate = useNavigate();
  return (
    <Modal
      footer={null}
      centered
      closeIcon={null}
      open={modals?.printCheck}
      width={770}
      classNames={{ content: "!py-[50px]" }}
      onCancel={() => closeModal("printCheck")}
    >
      <div className="w-[80%] mx-auto">
        {/* <img
          src={ASSETS.printAnimation}
          className="mx-auto mb-2 text-center"
          alt=""
        /> */}
          <img className="mx-auto w-[80px] h-[80px] object-contain" onClick={() => openModal("success")} src={ASSETS.print} alt="" />

        <div className="text-[31px] font-700 text-center">Печать чека</div>
        <div className="bg-[#F4F4F4] rounded-[24px] py-3 px-4 mt-6 mb-12">
          <div className="flex justify-between gap-2">
            <div className="text-[18px] font-600 text-left">Услуга:</div>
            <div className="text-[18px] font-600 text-right">Купить билет</div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="text-[18px] font-600 text-left">Время оплаты:</div>
            <div className="text-[18px] font-600 text-right">
              dd.mm.yyyy - hh.mm.ss
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="text-[18px] font-600 text-left">Тип оплаты:</div>
            <div className="text-[18px] font-600 text-right">Наличные</div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="text-[18px] font-600 text-left">Общая сумма:</div>
            <div className="text-[18px] font-600 text-right">7 000.00</div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="text-[18px] font-600 text-left">
              Стоимость билета:
            </div>
            <div className="text-[18px] font-600 text-right">4 000.00</div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="text-[18px] font-600 text-left">
              Оплата на номер телефона:
            </div>
            <div className="text-[18px] font-600 text-right">3 000.00</div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-6">
          <Button
            onClick={() => {
              closeModal("printCheck");
              navigate(APP_ROUTES.HOME);
            }}
            type="primary"
            className="flex items-center justify-center w-full h-[75px] rounded-[13px]"
            icon={<HomeOutlined className="[&>svg]:text-[32px]" />}
          >
            <span className="text-[23px] font-500">Вернуться на главную</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PrintCheckModal;
