import React, { FC, useEffect, useState } from "react";
import CoursePlayer from "../Admin/Course/CoursePlayer";
import { styles } from "@/app/styles/style";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  courseApi,
  useAddAnswerMutation,
  useAddNewQuestionMutation,
  useAddReviewMutation,
  useAddReviewReplayMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import { AnimationDuration } from "recharts/types/util/types";
import { format } from "timeago.js";
import { BiMessage } from "react-icons/bi";
import { MdVerified } from "react-icons/md";
import Ratings from "@/app/utils/Ratings";

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CommentItem = ({
  key,
  data,
  activeVideo,
  item,
  answer,
  setAnswer,
  setQuestionId,
  handleAnswerSubmit,
  AnswerQuestionLoading,
}: any) => {
  const [replayActive, setReplayActive] = useState(false);
  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          {/* <div className="w-[50px] h-[50px] ">
            <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
              <h1 className="uppercase text-[18px]">
                {item?.user.name.slice(0, 2)}
              </h1>
            </div>
          </div> */}
          <div>
            <Image
              src={item?.user.avatar ? item?.user.avatar : "any default image"}
              alt=""
              width={50}
              height={50}
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </div>
          <div className="pl-3 dark:text-white text-black">
            <h5 className="text-[20px]">{item?.user.name}</h5>
            <p>{item?.question}</p>
            <small className="text-[#ffffff83]">
              {!item.createdAt ? "" : format(item?.createdAt)}●
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className="800px:pl-16 text-black dark:text-[#ffffff83] cursor-pointer mr-2"
            onClick={() => {
              setReplayActive(!replayActive), setQuestionId(item._id);
            }}
          >
            {!replayActive
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : "Add Replay"
              : "Hide Replies"}
          </span>
          <BiMessage
            size={20}
            className="cursor-pointer dark:text-[#ffffff83] text-white"
          />
          <span className="pl-1 mt-[-4px] cursor-pointer  dark:text-[#ffffff83] text-white">
            {item.questionReplies.length}
          </span>
        </div>

        {replayActive && (
          <>
            {item.questionReplies.map((item: any, index: number) => (
              <div
                key={index}
                className="w-full 800px:ml-16 my-5 dark:text-[#000000] text-white"
              >
                <div>
                  <Image
                    src={
                      item?.user.avatar
                        ? item?.user.avatar
                        : "any default image"
                    }
                    alt=""
                    width={50}
                    height={50}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                </div>

                <div className="pl-2 dark:text-white text-black">
                  <div className="flex items-center">
                    <h5 className="text-[20px]">{item?.user.name}</h5>
                    {item?.user.role === "admin" && (
                      <MdVerified className="text-[#50c750] ml-2 text-[20px]" />
                    )}
                  </div>
                  <p>{item?.answer}</p>
                  <small className="text-[#ffffff83]">
                    {!item.createdAt ? "" : format(item?.createdAt)}●
                  </small>
                </div>
              </div>
            ))}

            <>
              <div className="w-full flex relative dark:text-[#000000] text-white">
                <input
                  type="text"
                  placeholder="Enter your Answer .."
                  value={answer}
                  onChange={(e: any) => setAnswer(e.target.value)}
                  className="block 800px:ml-12 mt-2 outline-none bg-transparent border-b dark:text-[#000000] text-white border-black dark:border-white p-[5px] w-[95%]"
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-1"
                  onClick={handleAnswerSubmit}
                  disabled={answer === "" || AnswerQuestionLoading}
                >
                  Submit
                </button>
              </div>
              <br />
            </>
          </>
        )}
      </div>
    </>
  );
};

const CommentReplay = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  user,
  setQuestionId,
  handleAnswerSubmit,
  AnswerQuestionLoading,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo].questions.map(
          (item: AnimationDuration, index: any) => (
            <CommentItem
              key={index}
              data={data}
              activeVideo={activeVideo}
              item={item}
              index={index}
              answer={answer}
              setAnswer={setAnswer}
              setQuestionId={setQuestionId}
              handleAnswerSubmit={handleAnswerSubmit}
              AnswerQuestionLoading={AnswerQuestionLoading}
            />
          )
        )}
      </div>
    </>
  );
};

const CourseContentMedia: FC<Props> = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}) => {
  const [question, setQuestion] = useState("");
  const [activeBar, setActiveBar] = useState(0);
  //
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isReviewReplay, setIsReviewReplay] = useState(false);
  const [replay, setReplay] = useState("");
  const [reviewId, setReviewId] = useState("");

  //
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  //
  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
    id,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const course = courseData?.course;

  const isREviewExists = course?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

  //add question
  const [
    addNewQuestion,
    { isSuccess, error, isLoading: questionCreateionLoading },
  ] = useAddNewQuestionMutation({});

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question can't be empty");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  //answer question

  const [
    addAnswer,
    {
      isSuccess: successAnswer,
      error: errorAnswer,
      isLoading: AnswerQuestionLoading,
    },
  ] = useAddAnswerMutation();
  const handleAnswerSubmit = () => {
    addAnswer({
      answer,
      questionId: questionId,
      courseId: id,
      contentId: data[activeVideo]._id,
    });
  };

  //add Review

  const [
    addReview,
    { isSuccess: reviewSuccess, error: reviewError, isLoading: ReviewLoading },
  ] = useAddReviewMutation();

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Review can't be empty");
    } else {
      addReview({
        review,
        rating,
        courseId: id,
      });
    }
  };

  //replay review
  const [
    addReviewReplay,
    {
      isSuccess: successReplay,
      error: errorReplay,
      isLoading: ReplayReviewLoading,
    },
  ] = useAddReviewReplayMutation();
  const handleReplaySubmit = () => {
    if (!ReplayReviewLoading) {
      if (replay === "") {
        toast.error("replay can not be empty");
      } else {
        addReviewReplay({
          comment: replay,
          courseId: id,
          reviewId,
        });
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question added successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }

    //
    if (successAnswer) {
      setAnswer("");
      refetch();
      toast.success("Answer added successfully");
    }

    if (errorAnswer) {
      if ("data" in errorAnswer) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }

    //
    if (reviewSuccess) {
      setReview("");
      setRating(1);
      courseRefetch();
      toast.success("Review added successfully");
    }

    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }

    //
    if (successReplay) {
      setReplay("");
      courseRefetch();
      toast.success("Replay added successfully");
    }

    if (errorReplay) {
      if ("data" in errorReplay) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [
    isSuccess,
    error,
    successAnswer,
    errorAnswer,
    reviewError,
    reviewSuccess,
    errorReplay,
    successReplay,
  ]);
  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />

      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" /> Prev Lesson
        </div>

        <div
          className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${
            data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next Lesson
          <AiOutlineArrowRight className="m1-2" />
        </div>
      </div>

      <h1 className="pt-2 text-[25px] font-[600]">
        {" "}
        {data[activeVideo].title}
      </h1>
      <br />

      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`800px:text-[20px] cursor-pointer ${
              activeBar === index && "text-red-500"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3 text-black dark:text-white">
          {data[activeVideo]?.description}
        </p>
      )}

      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div className="mb-5" key={index}>
              <h2 className="800px:text-[20px] 800px:inline-block">
                {item.title && item.title + " :"}
              </h2>
              <a className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2">
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}

      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              src={user.avatar ? user.avatar : "any default image"}
              alt=""
              width={50}
              height={50}
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <textarea
              name=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id=""
              cols={40}
              rows={5}
              placeholder="Write your question .."
              className="outline-none bg-transparent ml-3 border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`${
                styles.button
              } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                questionCreateionLoading
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              } `}
              onClick={questionCreateionLoading ? () => {} : handleQuestion}
            >
              {" "}
              Submit
            </div>
          </div>

          <br />
          <br />

          <div className="w-full h-[1px] bg-[#ffffff3b]"></div>

          <div>
            {/* question replay component */}
            <CommentReplay
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setQuestionId={setQuestionId}
              AnswerQuestionLoading={AnswerQuestionLoading}
            />
          </div>
        </>
      )}

      {activeBar === 3 && (
        <div className="w-full">
          <>
            {!isREviewExists && (
              <>
                <div className="flex w-full">
                  <Image
                    src={user.avatar ? user.avatar : "any default image"}
                    alt=""
                    width={50}
                    height={50}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <div className="w-full">
                    <h5 className="pl-3 text-[20px] font-[500]">
                      Give a Rating <span className="text-red-500">*</span>
                    </h5>

                    <div className="flex w-full ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((i: any) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      name=""
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      id=""
                      cols={40}
                      rows={5}
                      placeholder="Write your review .."
                      className="outline-none bg-transparent ml-3 border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
                    ></textarea>
                  </div>
                </div>

                <div className="w-full flex justify-end">
                  <div
                    className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2 `}
                    onClick={ReviewLoading ? () => {} : handleReviewSubmit}
                  >
                    {" "}
                    Submit
                  </div>
                </div>
              </>
            )}
            <br />

            <div className="w-full h-[1px] bg-[#ffffff3b]">
              <div className="w-full">
                {(course?.reviews && [...course.reviews].reverse()).map(
                  (item: any, index: number) => (
                    <div key={index} className="w-full my-5">
                      <div className="w-full flex">
                        {/* <div className="w-[50px] h-[50px]">
                          <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                            <h1 className="uppercase text-[18px]">
                              {item.user.name.slice(0, 2)}
                            </h1>
                          </div>
                        </div> */}
                        <Image
                          src={
                            item?.user.avatar
                              ? item?.user.avatar
                              : "any default image"
                          }
                          alt=""
                          width={50}
                          height={50}
                          className="w-[50px] h-[50px] rounded-full object-cover"
                        />

                        <div className="ml-2">
                          <h1 className="text-[18px]">{item?.user.name}</h1>
                          <Ratings rating={item?.rating} />
                          <p>{item.comment}</p>
                          <small className="text-[#ffffff83]">
                            {!item.createdAt ? "" : format(item?.createdAt)}●
                          </small>
                        </div>
                      </div>
                      {user.role === "admin" && (
                        <span
                          className={`${styles.label} !ml-10 cursor-pointer `}
                          onClick={() => {
                            setIsReviewReplay(true), setReviewId(item._id);
                          }}
                        >
                          Add Replay{" "}
                        </span>
                      )}

                      {isReviewReplay && (
                        <div className="w-full flex relative dark:text-[#000000] text-white">
                          <input
                            type="text"
                            placeholder="Enter your Answer .."
                            value={replay}
                            onChange={(e: any) => setReplay(e.target.value)}
                            className="block 800px:ml-12 mt-2 outline-none bg-transparent border-b dark:text-[#000000] text-white border-black dark:border-white p-[5px] w-[95%]"
                          />
                          <button
                            type="submit"
                            className="absolute right-0 bottom-1"
                            onClick={handleReplaySubmit}
                            disabled={replay === "" || ReplayReviewLoading}
                          >
                            Submit
                          </button>
                        </div>
                      )}

                      {item.commentReplies.map((i: any, index: number) => (
                        <div
                          key={index}
                          className="pl-2 dark:text-white text-black"
                        >
                          <Image
                            src={
                              i?.user.avatar
                                ? i?.user.avatar
                                : "any default image"
                            }
                            alt=""
                            width={50}
                            height={50}
                            className="w-[50px] h-[50px] rounded-full object-cover"
                          />
                          <div className="flex items-center">
                            <h5 className="text-[20px]">{i?.user.name}</h5>
                            {i?.user.role === "admin" && (
                              <MdVerified className="text-[#50c750] ml-2 text-[20px]" />
                            )}
                          </div>
                          <p>{i?.comment}</p>
                          <small className="text-[#ffffff83]">
                            {!i.createdAt ? "" : format(i?.createdAt)}●
                          </small>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default CourseContentMedia;
