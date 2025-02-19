import { Swiper, SwiperSlide } from "swiper/react";
import ReactStars from "react-rating-stars-component";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useState, useEffect } from "react";
import UseAxiosPublic from "../../hook/useAxiosPublic/UseAxiosPublic";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = UseAxiosPublic();

  useEffect(() => {
    setLoading(true);
    axiosPublic
      .get("/user-reviews")
      .then((res) => {
        setReviews(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error.message);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-10 w-4/5 mx-auto px-10 max-sm:w-full max-md:w-full">
      <h2 className="text-center font-bold text-3xl py-10">
        What People Are Saying
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews available yet.</p>
      ) : (
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="w-4/5 flex flex-col items-center gap-6 mx-auto h-[320px]">
                <div className="pt-10">
                  <ReactStars
                    count={5}
                    size={42}
                    value={review.rating}
                    isHalf={true}
                    edit={false}
                    activeColor="#c5600e"
                  />
                </div>
                <p className="text-center text-lg text-gray-700">{review.details}</p>
                <h3 className="text-2xl font-semibold">{review.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default Review;
