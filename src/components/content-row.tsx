import { useEffect, useState, useRef } from "react";
import { fetchRequest, MovieResponse, MovieResult } from "../common/api";
import PageIndicator from "./page-indicator";
import ChevronLeft from "@heroicons/react/24/outline/ChevronLeftIcon";
import ChevronRight from "@heroicons/react/24/outline/ChevronRightIcon";
import MovieCard from "./Movie-card";

type RowProps = {
  endpoint: string;
  title: string;
};
const card_width = 200;

export default function ContentRows({ title, endpoint }: RowProps) {
  const [rowData, setRowData] = useState<MovieResult[]>([]);
  const sliderRef = useRef<HTMLSelectElement>(null);
  const cardsPerPage = useRef(0);
  const containerRef = useRef<HTMLSelectElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const disablePrev = currentPage === 0;
  const disableNext = currentPage === pagesCount - 1;

  async function fetchRowData() {
    const response = await fetchRequest<MovieResponse<MovieResult[]>>(endpoint);
    setRowData(response.results.filter((res) => res.poster_path));
  }

  useEffect(() => {
    fetchRowData();
  }, []);

  useEffect(() => {
    if (rowData?.length) {
      if (containerRef.current) {
        cardsPerPage.current = Math.floor(
          containerRef.current.clientWidth / card_width
        );
        setPagesCount(Math.ceil(rowData.length / cardsPerPage.current));
      }
    }
  }, [rowData.length]);

  function getTranslateXValue() {
    let translateX = 0;
    if (sliderRef.current) {
      translateX =
        ((cardsPerPage.current * card_width) / sliderRef.current.clientWidth) *
        100;
    }
    return translateX;
  }

  function onNextClick() {
    if (sliderRef.current) {
      let updatedTranslateX = translateX - getTranslateXValue();
      sliderRef.current.style.transform = `translateX(${updatedTranslateX}%)`;
      setTranslateX(updatedTranslateX);
      setCurrentPage(currentPage + 1);
    }
  }

  function onPrevClick() {
    if (sliderRef.current) {
      let updatedTranslateX = translateX + getTranslateXValue();
      sliderRef.current.style.transform = `translateX(${updatedTranslateX}%)`;
      setTranslateX(updatedTranslateX);
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <section className="row-container ml-12 hover:cursor-pointer">
      <h2 className="text-xl">{title}</h2>
      <PageIndicator
        pagesCount={pagesCount}
        currentPage={currentPage}
        className=" pr-4 opacity-0 transition-opacity duration-300 ease-in"
      />
      <section
        className="relative mb-8 flex flex-nowrap gap-2 overflow-hidden"
        ref={containerRef}
      >
        {!disablePrev ? (
          <button
            className="absolute z-[1] h-full w-12 bg-black/25 opacity-0 transition-opacity duration-300 ease-in"
            onClick={onPrevClick}
          >
            <ChevronLeft />
          </button>
        ) : null}
        {!disableNext ? (
          <button
            className="absolute right-0 z-[1] h-full w-12 bg-black/25 opacity-0 transition-opacity duration-300 ease-in"
            onClick={onNextClick}
          >
            <ChevronRight />
          </button>
        ) : null}
        <section
          className="flex gap-4 transition-transform duration-700 ease-linear"
          ref={sliderRef}
        >
          {rowData?.map((row, index) => {
            return (
              <MovieCard {...row} key={`${row.id}-${index}`} index={index} />
            );
          })}
        </section>
      </section>
    </section>
  );
}
