import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

const HomeCarousel = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ speed: 0.5 }),
  ]);
  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">
          <Image
            src="/heros/hero1.png"
            width={400}
            height={300}
            alt="Picture of the author"
          />
        </div>
        <div className="embla__slide">
          <Image
            src="/heros/hero2.png"
            width={400}
            height={300}
            alt="Picture of the author"
          />
        </div>
        <div className="embla__slide">
          <Image
            src="/heros/hero3.png"
            width={400}
            height={300}
            alt="Picture of the author"
          />
        </div>
        <div className="embla__slide">
          <Image
            src="/heros/hero4.png"
            width={400}
            height={300}
            alt="Picture of the author"
          />
        </div>
        <div className="embla__slide">
          <Image
            src="/heros/hero5.png"
            width={400}
            height={300}
            alt="Picture of the author"
          />
        </div>
        <div className="embla__slide">
          <Image
            src="/heros/hero6.png"
            width={400}
            height={300}
            alt="Picture of the author"
          />
        </div>
        <div className="embla__slide">
          <Image
            src="/heros/hero7.png"
            width={400}
            height={300}
            alt="Picture of the author"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;
