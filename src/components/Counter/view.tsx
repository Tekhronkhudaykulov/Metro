import { Button } from "antd";

const Counter = ({onClickIncrement, onClickDecrement, count} : any) => {
  return (
    <div className="w-full rounded-[30px] h-[90px] flex items-center justify-between bg-[#F4F4F4] px-5 py-4">
      <Button
        type="primary"
        className="flex items-center justify-center shadow-lg !bg-[#5E7AEA] [&>span]:font-500 [&>span]:text-[30px] text-white min-w-[50px] w-[50px] h-[50px] rounded-full"
        onClick={onClickDecrement}
      >
        -
      </Button>
      <div className="text-[35px] font-500">{count}</div>
      <Button
        type="primary"
        className="flex items-center justify-center shadow-lg !bg-[#5E7AEA] [&>span]:font-500 [&>span]:text-[30px] text-white min-w-[50px] w-[50px] h-[50px] rounded-full"
        onClick={onClickIncrement}
      >
        +
      </Button>
    </div>
  );
};

export default Counter;
