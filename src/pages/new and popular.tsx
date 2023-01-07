import { ENDPOINT } from "../common/endpoints";
import ContentRows from "../components/content-row";
import TvRows from "../components/tv-rows";

export default function NewAndPopular() {
  return (
    <section className="mt-[50px]">
      <TvRows endpoint={ENDPOINT.TV_TOP_RATED} title="Top Rated Tv Shows" />
      <ContentRows endpoint={ENDPOINT.MOVIES_POPULAR} title="Popular Movies" />
      <TvRows endpoint={ENDPOINT.TV_NOW_PLAYING} title="Now Playing on Tv" />
      <ContentRows
        endpoint={ENDPOINT.MOVIES_UPCOMING}
        title="Upcoming Movies"
      />
      <TvRows endpoint={ENDPOINT.TV_POPULAR} title="Popular on Tv" />
      <ContentRows
        endpoint={ENDPOINT.MOVIES_TOP_RATED}
        title="Top Rated Movies"
      />
    </section>
  );
}
