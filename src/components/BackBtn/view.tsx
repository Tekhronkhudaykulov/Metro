import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const BackBtn = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Button
      onClick={() => navigate(-1)}
      className="border-[1.5px] border-black rounded-[16px] bg-white w-[505px] h-[110px]"
      type="text"
    >
      <span className="!uppercase !font-600 !text-[27px] !text-black">
        {t("back")}
      </span>
    </Button>
  );
};

export default BackBtn;
