import { Button, Modal } from "antd";
import { modalsStore } from "../../store";
import { ASSETS } from "../../assets/images/assets";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../router";

interface Props {}

const SuccessModal = ({}: Props) => {
  const { closeModal, modals } = modalsStore();
  const navigate = useNavigate();
  return (
    <Modal
      footer={null}
      centered
      closeIcon={null}
      open={modals?.success}
      width={1100}
      classNames={{ content: "!p-[30px]" }}
      onCancel={() => closeModal("success")}
    >
      <img src={ASSETS.logo} className="h-[121px]" alt="" />
      <img src={ASSETS.success} className="mx-auto mb-2 text-center" alt="" />
      <div className="text-[45px] font-700 text-center mb-2">УСПЕШНО</div>
      <div className="text-center text-[28px] font-500 leading-[1.2]">
        Хотите сделать еще одну <br /> практику?
      </div>
      <div className="flex items-center justify-center gap-6 my-28">
        <Button
          onClick={() => {
            closeModal("success");
            navigate(APP_ROUTES.HOME);
          }}
          type="primary"
          className="!bg-[#C82E2E] w-[385px] h-[108px] rounded-[13px]"
        >
          <span className="text-[27px] font-600">Нет (15)</span>
        </Button>
        <Button
          onClick={() => {
            closeModal("success");
            navigate(APP_ROUTES.HOME);
          }}
          type="primary"
          className="w-[385px] h-[108px] rounded-[13px]"
        >
          <span className="text-[27px] font-600">Да</span>
        </Button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
