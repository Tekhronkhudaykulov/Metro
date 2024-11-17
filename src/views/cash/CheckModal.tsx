import { Button, Modal } from "antd";
import { modalsStore } from "../../store";
import { Check } from "../../components";
import { CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { CheckPrinterFunc } from "../../hook/view";


const CheckModal = ({count, price}: any) => {
  const { closeModal, modals } = modalsStore();
  const navigate = useNavigate();
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
          onClick={() => {
            CheckPrinterFunc({count, price})
            closeModal("check");
            // navigate(APP_ROUTES.PHONE);
          }}
          type="primary"
          className="w-[360px] h-[66px] rounded-[13px]"
        >
          <span  className="text-[28px] font-500">Продолжить</span>
        </Button>
        {/* <img src={ASSETS.print} alt="" /> */}
      </div>
    </Modal>
  );
};

export default CheckModal;
