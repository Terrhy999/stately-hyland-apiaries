import { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-10 right-10 hidden lg:block z-10">
      <FaAngleUp
        className={`w-10 h-10 bg-shaBlack rounded cursor-pointer text-white hover:text-shaGreen ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={scrollTop}
      />
    </div>
  );
};

export default ScrollToTop;
