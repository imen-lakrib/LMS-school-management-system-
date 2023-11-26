import { styles } from "@/app/styles/style";
import { useGetLayoutQuery } from "@/redux/features/layout/layoutApi";
import { idID } from "@mui/material/locale";
import React, { FC, useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

type Props = {};

const FAQ: FC<Props> = ({}) => {
  const { data } = useGetLayoutQuery("FAQ", {});
  const [questions, setQuestions] = useState<any[]>([]);
  const [activeQuestion, setActiveQuestion] = useState(null);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
  }, [data]);

  const toggleQuestion = (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div>
      <div className="w-[90%] 800px:w-[80%] m-auto ">
        <h1 className={`${styles.title} 800px:text-[40px]`}>
          Frequency Asked Questions
        </h1>
        <div className="mt-12">
          <dl className="space-y-8">
            {questions.map((q: any) => (
              <div
                key={q._id}
                className={`${
                  q._id !== questions[0]?._id && "border-t"
                } border-gray-200 pt-6`}
              >
                <dt className="text-lg">
                  <button
                    className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-nonne"
                    onClick={() => toggleQuestion(q._id)}
                  >
                    <span className="font-meduim text-black dark:text-white">
                      {q.question}
                    </span>

                    <span className="ml-6 flex-shrink-0">
                      {activeQuestion === q._id ? (
                        <HiMinus className="h-6 w-6 dark:text-white text-black" />
                      ) : (
                        <HiPlus className="h-6 w-6 dark:text-white text-black" />
                      )}
                    </span>
                  </button>
                </dt>

                {activeQuestion === q._id && (
                  <dd className="mt-2 pr-12">
                    <p className="text-base font-Poppins  dark:text-white text-black">
                      {q.answer}
                    </p>
                  </dd>
                )}
              </div>
            ))}
          </dl>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default FAQ;
