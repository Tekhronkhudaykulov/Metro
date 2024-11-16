import { Modal, message } from "antd";
import { modalsStore, queueStore } from "../../../store";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { Check } from "../..";
import { ASSETS } from "../../../assets/images/assets";

const ScanModal = () => {
  const { t } = useTranslation();
  const { modals, closeModal } = modalsStore();
  const { checkAQueue } = queueStore();
  const [modal, setModal] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClick = () => {
      inputRef.current?.focus();
    };
    setTimeout(() => {
      handleClick();
    }, 300);
    if (modals?.scan && inputRef.current) {
      inputRef.current.focus();
    }
    document.body.addEventListener("click", handleClick);
    if (!modals?.scan) {
      setValue("");
    }
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [modals?.scan]);
  useEffect(() => {
    const handler = setTimeout(() => {
      if (modals?.scan && value) {
        const newValue = Number(value);
        checkAQueue({
          queue_id: newValue,
        })
          .then((res) => {
            setValue("");
            closeModal("scan");
            if (!res?.success) {
              message.error({ content: res?.message });
            }
          })
          .catch((err: any) => {
            setValue("");
            closeModal("scan");
            console.log("err", err);
          })
          .finally(() => {
            setValue("");
            closeModal("scan");
          });
      }
    }, 500); // 0.5 seconds

    return () => {
      clearTimeout(handler);
    };
  }, [modals?.scan, value]);
  return (
    <>
      <Modal
        open={modals?.scan}
        centered
        title={`Информация`}
        classNames={{ header: "text-center" }}
        onCancel={() => closeModal("scan")}
        footer={null}
      >
        <p className="text-center">{t("scanInfo")}</p>
        <img src={ASSETS.scan} className="h-[200px] mx-auto my-4" alt="" />
        {modals?.scan && (
          <input
            className="border"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            type="text"
            ref={inputRef}
          />
        )}
      </Modal>
      <Modal
        open={modal}
        onCancel={() => setModal(false)}
        centered
        footer={null}
      >
        <Check />
      </Modal>
    </>
  );
};

export default ScanModal;
