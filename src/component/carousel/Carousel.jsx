import React from "react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, Autoplay, Grid } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Carousel = () => {
  const [events, setEvents] = React.useState(
    Array.from({ length: 10 }).map((_, index) =>
      index % 2 === 0
        ? {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRepCoPVhIXI3rEUss3pxeNaHcqwHHgVHZTeQ&s",
          }
        : {
            img: "https://img.freepik.com/premium-photo/wide-angle-shot-single-tree-growing-clouded-sky-sunset-surrounded-by-grass_181624-22807.jpg?semt=ais_hybrid",
          }
    )
  );

  return (
    <div className="w-[90%]  mx-auto">
      <Swiper
        spaceBetween={20} 
        slidesPerView={3} 
        grid={{
          rows: 2,
          fill: "row",
        }}
        loop={false}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }} 
        navigation 
        modules={[Navigation, Pagination, Autoplay, Grid]} 
        breakpoints={{
          640: { slidesPerView: 1 }, 
          768: { slidesPerView: 2 }, 
          1024: { slidesPerView: 3 }, 
        }}
        className="rounded-lg shadow-lg p-5 w-[100%] h-[100%]"
      >
        {events.map((event, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full bg-white p-2">
              <img
                src={event.img}
                alt="Event"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
