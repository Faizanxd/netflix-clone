type PageIndicatorProps = {
  pagesCount: number;
  currentPage: number;
  className: string;
};

export default function PageIndicator({
  pagesCount,
  currentPage,
  className,
}: PageIndicatorProps) {
  return (
    <ul className={`flex items-center justify-end gap-1  ${className}`}>
      {Array(pagesCount)
        .fill(0)
        .map((page, index) => (
          <li
            key={index}
            className={`h-[2px] w-3  ${
              currentPage === index ? "bg-gray-100" : "bg-gray-600"
            } `}
          >
            {page}
          </li>
        ))}
    </ul>
  );
}
