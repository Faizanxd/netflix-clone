import { ENDPOINT } from "../common/endpoints";
import TvRows from "../components/tv-rows";

export default function TvShows() {
  return (
    <section className="mt-[50px]">
      <TvRows endpoint={ENDPOINT.TV_TOP_RATED} title="Top Rated" />
      <TvRows endpoint={ENDPOINT.TV_NOW_PLAYING} title="Now Playing" />
      <TvRows endpoint={ENDPOINT.TV_POPULAR} title="Popular" />
    </section>
  );
}
