import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
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

type Props = { id: string };

const CourseDetailsPage: FC<Props> = ({ id }) => {
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const { data: config } = useGetStripePublishableKeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");

  useEffect(() => {
    if (config) {
      const publishableKey = config?.publishableKey;
      setStripePromise(loadStripe(publishableKey));
    }

    if (data) {
      const amount = Math.round(data.course.price * 100);
      createPaymentIntent(amount);
    }
  }, [config, data]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={` ${data?.course.name}- LMS`}
            description="school management system"
            keywords={data?.course?.tags}
          />
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={1}
            setRoute={setRoute}
            route={route}
          />
          {stripePromise && (
            <CourseDetails
              data={data.course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
            />
          )}

          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
