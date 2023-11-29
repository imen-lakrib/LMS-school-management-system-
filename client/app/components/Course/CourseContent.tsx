import {
  useGetCourseContentforUserQuery,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import React, { FC, useEffect, useState } from "react";
import { Loader } from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Footer";
import CourseDetails from "./CourseDetails";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishableKeyQuery,
} from "@/redux/features/orders/ordersApi";
import { loadStripe } from "@stripe/stripe-js";
import CourseContentMedia from "./CourseContentMedia";
import CourseContentList from "./CourseContentList";

type Props = { id: string; user: any };

const CourseContent: FC<Props> = ({ id, user }) => {
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [activeItem, setActiveItem] = useState(2);

  const [activeVideo, setActiveVideo] = useState(0);
  const { data: contentData, isLoading } = useGetCourseContentforUserQuery(id);
  const data = contentData?.content;
  useEffect(() => {}, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            open={open}
            setOpen={setOpen}
            setRoute={setRoute}
            activeItem={activeItem}
            route={route}
          />
          <div className="w-full grid 800px:grid-cols-10">
            <Heading
              title={` ${data[activeVideo]?.title}- LMS`}
              description="school management system"
              keywords={data[activeVideo]?.tags}
            />

            <div className="col-span-7">
              <CourseContentMedia
                data={data}
                id={id}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                user={user}
              />
            </div>

            <div className="hidden 800px:block 800px:col-span-3">
              <CourseContentList
                setActiveVideo={setActiveVideo}
                data={data}
                activeVideo={activeVideo}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseContent;
