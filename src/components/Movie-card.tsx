import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import createImageURL from "../common/utils";
import Modal from "./modal";

type MovieCardProps = {
  poster_path: string;
  id: number;
  title: string;
};

export default function MovieCard({ id, poster_path, title }: MovieCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const movieCardRef = useRef<HTMLSelectElement>(null);
  function onMouseEnter(event: any) {
    setIsOpen(true);
  }

  useEffect(() => {
    movieCardRef.current?.addEventListener("mouseenter", onMouseEnter);
    () => movieCardRef.current?.removeEventListener("mouseenter", onMouseEnter);
  }, []);

  function onClose(value: boolean) {
    setIsOpen(value);
  }
  return (
    <>
      <section
        key={id}
        className="aspect-square flex-none overflow-hidden rounded-md"
        ref={movieCardRef}
      >
        <img
          className="h-full w-[250px] "
          src={createImageURL(poster_path)}
          alt={title}
        />
      </section>
      <Modal title={title} isOpen={isOpen} key={id} onClose={onClose}>
        <YouTube
          opts={{
            width: "450",
            playerVars: {
              autoplay: 1,
              playsinline: 1,
              controls: 0,
            },
          }}
          videoId="ruCzgIWwb-8"
        />
      </Modal>
    </>
  );
}
