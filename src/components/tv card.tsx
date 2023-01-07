import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import { fetchVideoInfo, MovieVideoInfo, fetchTVInfo } from "../common/api";

import createImageURL from "../common/utils";
import Modal from "./modal";
import PlayIcon from "@heroicons/react/24/solid/PlayCircleIcon";
import LikeIcon from "@heroicons/react/24/outline/HandThumbUpIcon";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import ChevronDown from "@heroicons/react/24/outline/ChevronDownIcon";
import { Position } from "../common/types";

type MovieCardProps = {
  poster_path: string;
  id: number;
  title: string;
  index: number;
};

export default function TvCard({
  id,
  poster_path,
  title,
  index,
}: MovieCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hidePoster, setHidePoster] = useState(false);
  const movieCardRef = useRef<HTMLSelectElement>(null);
  const [videoInfo, setVideoInfo] = useState<MovieVideoInfo | null>(null);
  const [position, setPosition] = useState<Position | null>(null);

  function closeModal() {
    setIsOpen(false);
  }

  async function onMouseEnter(event: any) {
    const [videoInfo] = await fetchTVInfo(id.toString());
    setVideoInfo(videoInfo);
    let calculatedPosition = movieCardRef.current?.getBoundingClientRect();
    let top = (calculatedPosition?.top ?? 0) - 100;
    let left = (calculatedPosition?.left ?? 0) - 100;
    if (left < 0) {
      left = calculatedPosition?.left as number;
    }
    let totalWidth = left + 400;
    if (totalWidth > document.body.clientWidth) {
      left = left - (totalWidth - document.body.clientWidth);
    }
    setPosition({ top, left });
    setIsOpen(true);
  }

  useEffect(() => {
    movieCardRef.current?.addEventListener("mouseenter", onMouseEnter);
    () => movieCardRef.current?.removeEventListener("mouseenter", onMouseEnter);
  }, []);

  useEffect(() => {
    if (videoInfo?.key) {
      setTimeout(() => {
        setHidePoster(true);
      }, 800);
    }
    if (!isOpen) {
      setHidePoster(false);
    }
  }, [videoInfo, isOpen]);

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
          src={createImageURL(poster_path, 0)}
          alt={title}
        />
      </section>
      <Modal
        title={""}
        isOpen={isOpen}
        onClose={onClose}
        closeModal={closeModal}
        position={position}
      >
        <section className="aspect-square transition-[height] duration-500 ease-in">
          <img
            src={createImageURL(poster_path, 0)}
            alt={title}
            className={`w-[400px] ${
              hidePoster ? "invisible h-0" : "visible h-full"
            }`}
          />
          <YouTube
            opts={{
              width: 400,
              height: 400,
              playerVars: {
                autoplay: 1,
                playsinline: 1,
                controls: 0,
              },
            }}
            videoId={videoInfo?.key}
            className={` w-[400px] ${
              !hidePoster ? "invisible h-0" : "visible h-full"
            }`}
          />
          <section className="flex items-center justify-between p-4">
            <ul className="flex items-center justify-evenly gap-4">
              <li className="h-12 w-12">
                <button className="h-full w-full ">
                  <PlayIcon />
                </button>
              </li>
              <li className="h-12 w-12">
                <button className="h-full w-full rounded-full border-2 border-gray-500 p-2 hover:border-white">
                  <PlusIcon />
                </button>
              </li>
              <li className="h-12 w-12">
                <button className="h-full w-full rounded-full border-2 border-gray-500 p-2 hover:border-white">
                  <LikeIcon />
                </button>
              </li>
            </ul>
            <ul className="flex items-center justify-evenly gap-4">
              <li className="h-12 w-12 rounded-full border-2 border-gray-500 p-2 hover:border-white">
                <button className="h-full w-full">
                  <ChevronDown />
                </button>
              </li>
            </ul>
          </section>
        </section>
      </Modal>
    </>
  );
}
