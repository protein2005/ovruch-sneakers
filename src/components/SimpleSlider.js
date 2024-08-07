import Slider from "react-slick";

const slides = [
    {
      id: 1,
      title: "Stan Smith, Forever!",
      buttonText: "Придбати",
      image: "/img/slider.png",
      link: "#"
    },
    {
      id: 2,
      title: "Stan Smith, Forever!",
      buttonText: "Придбати",
      image: "/img/slider.png",
      link: "#"
    },
    {
      id: 3,
      title: "Stan Smith, Forever!",
      buttonText: "Придбати",
      image: "/img/slider.png",
      link: "#"
    },
  ];

function SimpleSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
    return (
        <div className="slider-container">
            <Slider {...settings}>
            {slides.map(slide => (
                <div className="slide" key={slide.id}>
                <img src={slide.image} alt={slide.title} />
                <div className="slide-content">
                    <h2>{slide.title}</h2>
                    <button className="button-slide" onClick={() => window.location.href = slide.link}>{slide.buttonText}</button>
                </div>
                </div>
            ))}
            </Slider>
        </div> 
    )
}

export default SimpleSlider