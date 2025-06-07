import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const ToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 bg-red-500 hover:bg-yellow-400 text-black p-3 rounded-full shadow-lg transition-transform transform hover:scale-110 z-50"
      aria-label="Back to Top"
    >
      <ArrowUp size={24} />
    </button>
  );
};

export default ToTopButton;