import { ENDPOINT } from "../common/endpoints";
import ContentRows from "../components/content-row";

export default function Movies() {
  return (
    <section className="mt-[50px]">
      <ContentRows endpoint={ENDPOINT.MOVIES_UPCOMING} title="Upcoming" />
      <ContentRows endpoint={ENDPOINT.MOVIES_POPULAR} title="Popular" />
      <ContentRows endpoint={ENDPOINT.MOVIES_TOP_RATED} title="Top Rated" />
    </section>
  );
}
