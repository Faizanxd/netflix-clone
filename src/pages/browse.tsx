import { ENDPOINT } from "../common/endpoints";
import ContentRows from "../components/content-row";

export default function Browse() {
  return (
    <section>
      <section>Banner Image</section>
      <ContentRows endpoint={ENDPOINT.MOVIES_POPULAR} title="New & Popular" />
      <ContentRows endpoint={ENDPOINT.MOVIES_TOP_RATED} title="Top Rated" />
      <ContentRows endpoint={ENDPOINT.MOVIES_NOW_PLAYING} title="Now Playing" />
    </section>
  );
}
