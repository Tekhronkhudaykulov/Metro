import { Button } from "antd";

const Counter = () => {
  return (
    <div className="min-w-[350px] w-[350px] rounded-[30px] h-[70px] flex items-center justify-between bg-[#F4F4F4] px-5 py-4">
      <Button
        type="primary"
        className="flex items-center justify-center shadow-lg !bg-[#5E7AEA] [&>span]:font-500 [&>span]:text-[30px] text-white min-w-[40px] w-[40px] h-[40px] rounded-full"
      >
        -
      </Button>
      <div className="text-[31px] font-500">1</div>
      <Button
        type="primary"
        className="flex items-center justify-center shadow-lg !bg-[#5E7AEA] [&>span]:font-500 [&>span]:text-[30px] text-white min-w-[40px] w-[40px] h-[40px] rounded-full"
      >
        +
      </Button>
    </div>
  );
};

export default Counter;
