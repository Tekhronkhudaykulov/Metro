import { BackBtn } from "../../components";
import { Button } from "antd";

interface Props {
  onNext?: () => void;
  nextText?: string;
  nextLoading?: boolean;
  nextDisabled?: boolean;
}

const Footer = ({ onNext, nextText, nextLoading, nextDisabled }: Props) => {
  return (
    <footer className="absolute bottom-[40px] left-0 w-full flex items-center justify-center gap-3">
      <BackBtn />
      <Button
        loading={nextLoading}
        disabled={nextDisabled}
        onClick={onNext}
        className="rounded-[16px] w-[505px] h-[110px]"
        type="primary"
      >
        <span className="text-[27px] font-600 uppercase">{nextText}</span>
      </Button>
      {/* <footer className="bg-footer"></footer> */}
    </footer>
  );
};

export default Footer;
