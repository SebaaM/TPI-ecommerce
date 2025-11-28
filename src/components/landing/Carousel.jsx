import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";

import ProductoLanding from "./productoLanding";

export default function Carousel({ products }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-4">Ofertas destacadas</h2>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        scrollbar={{ draggable: true }}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        navigation={true}
        pagination={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        modules={[EffectCoverflow, Pagination, Autoplay, Navigation, Scrollbar]}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            {/* ...product */}
            <ProductoLanding
              title={product.title}
              description={product.description}
              price={product.price}
              category={product.category}
              pictures={product.pictures}
              tags={product.tags}
              id={product.id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
