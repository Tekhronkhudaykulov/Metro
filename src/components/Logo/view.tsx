import { LazyLoadImage } from "react-lazy-load-image-component";
import { ASSETS } from "../../assets/images/assets";
import { modalsStore } from "../../store";

const Logo = () => {
  const { openModal } = modalsStore();
  return (
    <div
      className="flex items-center gap-2"
      onDoubleClick={() => openModal("logout")}
    >
      <LazyLoadImage
        src={ASSETS.logo}
        wrapperClassName="h-[121px] max-w-[121px]"
        className="w-full h-full object-contain"
        effect="opacity"
        alt=""
      />
      <div className="font-600">
        <div className=" text-[27px] leading-[1] font-600">
          "TOSHKENT METROPOLITENI DUK"
          <span className="text-[18px]"></span>
        </div>
        <p>qarashli Toshkent metropoliteni raqamli chipta aparati</p>
      </div>
    </div>
  );
};

export default Logo;
