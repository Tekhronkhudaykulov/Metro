import { ASSETS } from "../../assets/images/assets";

const Time = () => {
  return (
    <div className="flex items-center gap-16">
      <img src={ASSETS.phone} alt="" />
      <div>
        <div className="text-right text-[27px] leading-[1]">
          +998 (71) 555 66 77
        </div>
        <div className="text-[18px]">Texnik qo’llab-quvvatlash</div>
      </div>
    </div>
  );
};

export default Time;
