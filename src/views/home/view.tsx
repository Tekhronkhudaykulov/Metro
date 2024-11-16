import { Button } from "antd";
import { ASSETS } from "../../assets/images/assets";
import { APP_ROUTES } from "../../router";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="wrapper h-full">
      <div className="h-full flex flex-col gap-4 items-center justify-center">
        <Button
          type="primary"
          className="w-[505px] h-[110px] [&>span]:text-[27px] rounded-[16px]"
          onClick={() => navigate(APP_ROUTES.CASH)}
        >
          Получить билет
        </Button>
        <img className="absolute bottom-0 right-0" src={ASSETS.robot} alt="" />
      </div>
    </div>
  );
};

export default Home;
