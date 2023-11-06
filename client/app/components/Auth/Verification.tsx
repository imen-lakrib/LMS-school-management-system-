"use client";
import React, { FC, useRef, useState } from "react";

import { VscWorkspaceTrusted } from "react-icons/vsc";
import { styles } from "../../../app/styles/style";
import { toast } from "react-hot-toast";
type Props = {
  setRoute: (route: string) => void;
};

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const [invalidError, setInvalidError] = useState<boolean>(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const verificationHandler = async () => {
    setInvalidError(true);
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index > 3) {
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Verify your account</h1>
      <br />

      <div className="w-full flex items-center justify-center mt-2">
        <div className="w-[80px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center">
          <VscWorkspaceTrusted size={40} />
        </div>
      </div>

      <br />
      <br />

      <div className="m-auto flex items-center justify-around">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="number"
            key={key}
            ref={inputRefs[index]}
            placeholder=""
            maxLength={1}
            value={verifyNumber[key as keyof VerifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className={`m-2 w-[60px] h-[60px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${
              invalidError
                ? "shake border-red-500"
                : "dark:border-white border-[#0000004a]"
            }`}
          />
        ))}
      </div>
      <br />
      <br />

      <div className="w-full flex justify-center">
        <button className={`${styles.button} `} onClick={verificationHandler}>
          Verify OTP
        </button>
      </div>

      <br />

      <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
        Go back to signin
        <span
          className="text-[#2190ff] pl-1 cursor-pointer"
          onClick={() => setRoute("Login")}
        >
          Signin
        </span>
      </h5>

      <br />
    </div>
  );
};

export default Verification;
