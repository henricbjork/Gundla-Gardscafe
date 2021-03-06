import Layout from "../components/layout";
import PageHeader from "../components/pageheader";
import groq from "groq";
import client from "../client";
import urlBuild from "../imageBuilder";
import Image from "../components/image";
import TextSection from "../components/textSection";
import EventForm from "../components/form";

const Event = (props) => {
  // GLOBAL PROPS
  const navigationData = props.globalProps.navigation;
  const footerData = props.globalProps.footer;

  // PAGE DATA
  const eventPageData = props.eventData.event[0];
  const events = props.eventData.addEvents;

  // IMAGES
  const firstImageUrl = urlBuild(eventPageData.firstImage.asset._ref);
  const firstImageAlt = eventPageData.firstImage.alt;
  const secondImageUrl = urlBuild(eventPageData.secondImage.asset._ref);
  const secondImageAlt = eventPageData.secondImage.alt;

  // TEXT
  const bookText = eventPageData.textBlockBooking[0].children[0].text;
  const pageDesc = props.eventData.event[0].textBlockEvent[0].children[0].text;

  return (
    <Layout navigationLinks={navigationData} footerData={footerData}>
      <PageHeader
        title={eventPageData.titleEvent || "Page title"}
        text={pageDesc || "Page description"}
      />
      <Image url={firstImageUrl} alt={firstImageAlt} width="100%" />
      <section className="eventSection">
        {events.map((event, i) => {
          const title = event.eventTitle;
          const eventInfo = event.textBlockHero[0].children[0].text;
          return (
            <TextSection
              key={i}
              title={title}
              text={eventInfo}
              width="50%"
              backgroundColor="#F3F1E7"
              align="center"
              height="270px"
            />
          );
        })}
      </section>
      <TextSection
        title={bookText}
        linkType="down"
        backgroundColor="#C05B3D"
        width="100%"
        textColor="#fff"
        align="left"
      />
      <Image url={secondImageUrl} alt={secondImageAlt} width="100%" />
      <EventForm events={events} eventPageData={eventPageData} />
    </Layout>
  );
};

const query = groq`{
    "event": *[_type == 'event'],
    "addEvents": *[_type == 'addEvents'],
  }`;

export async function getStaticProps() {
  const res = await client.fetch(query);

  return {
    props: { eventData: res },
  };
}

export default Event;
