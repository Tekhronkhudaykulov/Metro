import { FC, ReactNode, useEffect } from "react";
import { Navbar } from "../layouts";
import { useLocation, useNavigate } from "react-router-dom";
import { APP_ROUTES } from ".";
import { useIdleTimer } from "react-idle-timer";
import { authStore, modalsStore } from "../store";
import { LogoutModal } from "../components";
import { ASSETS } from "../assets/images/assets";
// import { getLoginJson } from "../../electron/helper/filehelper";

interface Props {
  child?: ReactNode;
}

const PrivateRoute: FC<Props> = ({ child }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { me } = authStore();
  const { openModal } = modalsStore();
  // const [pageLoad, setPageLoad] = useState(false);
  // const loginData = getLoginJson();

  let pressStartTime = 0;

  const handleMouseDown = () => {
    pressStartTime = Date.now();
  };

  const handleMouseUp = () => {
    const pressEndTime = Date.now();
    const pressTime = pressEndTime - pressStartTime;
    // console.log(pressTime);
    if (pressTime > 3000 && pressTime < 7000) {
      openModal("logout");
    }
  };

  const timer = useIdleTimer({
    timeout: 1000 * 60,
    onIdle: () => navigate(APP_ROUTES.HOME),
  });

  useEffect(() => {
    if (pathname !== APP_ROUTES.HOME) {
      timer.start();
      timer.reset();
    } else if (pathname === APP_ROUTES.HOME) {
      timer.pause();
    }
  }, [pathname]);
  useEffect(() => {
    // setPageLoad(true);
    // if (pageLoad) {
    //   const json = JSON.parse(loginData);
    //   if (json?.email) {
    //     login({
    //       deviceName: "kiosk",
    //       email: json?.email,
    //       password: json?.password,
    //     });
    //   } else {
    //     navigate(APP_ROUTES.LOGIN);
    //   }
    // }
    me().then((res) => {
      if (res?.response?.status === 401) {
        // navigate(APP_ROUTES.LOGIN);
      }
    });
  }, []);
  useEffect(() => {
    document.body.addEventListener("mousedown", handleMouseDown);
    document.body.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.body.removeEventListener("mousedown", handleMouseDown);
      document.body.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseDown, handleMouseUp]);

  return (
    <>
      <Navbar />
      <div
        className="pt-[40px] pb-[150px] h-full overflow-y-auto bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${
            (pathname === APP_ROUTES.HOME || pathname === APP_ROUTES.CASH) &&
            ASSETS.homeBg
          })`,
        }}
      >
        {child}
      </div>
      <LogoutModal />
    </>
  );
};

export default PrivateRoute;
