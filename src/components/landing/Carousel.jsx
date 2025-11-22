import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

import ProductoLanding from "./productoLanding";

export default function Carousel({ products }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-4">Ofertas destacadas</h2>
      <Swiper
        modules={[Autoplay, Navigation, Scrollbar]}
        navigation
        scrollbar={{ draggable: true }}
        slidesPerView={3}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        spaceBetween={20}
        autoplay={{ delay: 2500, disableOnInteraction: true }}
        loop={true}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
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
