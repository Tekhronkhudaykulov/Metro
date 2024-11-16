import PhoneInputComponent from "react-phone-input-2";

const PhoneInput = () => {
  return (
    <PhoneInputComponent
      inputClass="w-full h-[90px] rounded-[21px] font-500 text-[41px] p-5 focus:outline-[#1677ff] duration-200"
      countryCodeEditable={false}
      placeholder="+998"
      showDropdown={false}
      specialLabel=""
      country={"uz"}
    />
  );
};

export default PhoneInput;
