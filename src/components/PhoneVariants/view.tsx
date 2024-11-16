import { ASSETS } from "../../assets/images/assets";

const PhoneVariants = () => {
  return (
    <div className="bg-[#F4F4F4] rounded-[36px] py-5 px-4">
      <div className="bg-white rounded-[31px] p-[15px]">
        <div className="flex items-center justify-center [&>div]:ml-[-10px] [&>div]:z-[1]">
          <div className="bg-white border border-[#EFEFEF] rounded-full min-w-[87px] w-[87px] h-[87px] p-3">
            <img
              src={ASSETS.phoneVarant1}
              className="h-full w-full object-contain"
              alt=""
            />
          </div>
          <div className="bg-white border border-[#EFEFEF] rounded-full min-w-[87px] w-[87px] h-[87px] p-3">
            <img
              src={ASSETS.phoneVarant2}
              className="h-full w-full object-contain"
              alt=""
            />
          </div>
          <div className="bg-white border border-[#EFEFEF] rounded-full min-w-[87px] w-[87px] h-[87px] p-3">
            <img
              src={ASSETS.phoneVarant3}
              className="h-full w-full object-contain"
              alt=""
            />
          </div>
          <div className="bg-white border border-[#EFEFEF] rounded-full min-w-[87px] w-[87px] h-[87px] p-3">
            <img
              src={ASSETS.phoneVarant4}
              className="h-full w-full object-contain"
              alt=""
            />
          </div>
          <div className="bg-white border border-[#EFEFEF] rounded-full min-w-[87px] w-[87px] h-[87px] p-3">
            <img
              src={ASSETS.phoneVarant5}
              className="h-full w-full object-contain"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneVariants;
