import { Modal } from "antd";
import { authStore, modalsStore } from "../../../store";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../router";
import { removeToken } from "../../../helpers/api";

const LogoutModal = () => {
  const navigate = useNavigate();
  const { modals, closeModal } = modalsStore();
  const { logout, logoutLoading, user } = authStore();
  const onCancel = () => {
    closeModal("logout");
  };
  const onOk = () => {
    logout().then(() => {
      removeToken();
      navigate(APP_ROUTES.LOGIN);
      closeModal("logout");
    });
  };
  return (
    <Modal
      open={modals?.logout}
      centered
      title={`Вы действительно хотите выйти? E-mail: ${user?.email}`}
      cancelText="Нет, не хочу"
      okText="Да, хочу выйти"
      onCancel={onCancel}
      onOk={onOk}
      okButtonProps={{ loading: logoutLoading, disabled: logoutLoading }}
    ></Modal>
  );
};

export default LogoutModal;
