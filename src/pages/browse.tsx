import { ENDPOINT } from "../common/endpoints";
import Banner from "../components/Banner";
import ContentRows from "../components/content-row";
import TvRows from "../components/tv-rows";

export default function Browse() {
  return (
    <section className="absolute top-0">
      <Banner />
      <ContentRows endpoint={ENDPOINT.MOVIES_POPULAR} title="Popular" />
      <TvRows endpoint={ENDPOINT.TV_TOP_RATED} title="Top Rated Tv Shows" />
      <ContentRows endpoint={ENDPOINT.MOVIES_TOP_RATED} title="Top Rated" />
      <ContentRows endpoint={ENDPOINT.MOVIES_NOW_PLAYING} title="Now Playing" />
    </section>
  );
}
