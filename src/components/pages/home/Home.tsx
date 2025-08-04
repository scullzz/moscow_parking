import EventCarousel from "./EventCard";
import { EventList } from "./EventList";
import back from "./images/back1.jpg";
import bottomImage from "./images/bottomImageExample.svg";
import logo from "./images/logo.svg";

const Home = () => {
  const events = [
    {
      id: "1",
      title: "DJ Darhose",
      date: "26 июня",
      time: "18:00",
      venue: "Клуб «Аквариум»",
      image: back,
      logo: logo,
    },
    {
      id: "2",
      title: "DJ Darhose",
      date: "26 июня",
      time: "18:00",
      venue: "Клуб «Аквариум»",
      image: back,
      logo: logo,
    },
  ];

  const eventsList = [
    {
      id: "1",
      title: "Неоновый рейв",
      date: "26 июня",
      time: "18:00",
      venue: "Клуб «Аквариум»",
      image: bottomImage,
      logo: logo,
      price: 2500,
      headliners: "DJ Baur, Fallenmusic",
      description:
        "Рейв-диджей-сет с Acid House, Rave, Techno и другими качающими жанрами в стиле неоновой вечеринки.",
    },
    {
      id: "2",
      title: "Ретро-пати",
      date: "26 июня",
      time: "18:00",
      venue: "Клуб «Аквариум»",
      image: back,
      logo: logo,
      price: 2000,
      headliners: "DJ Baur, Fallenmusic",
      description:
        "Рейв-диджей-сет с Acid House, Rave, Techno и другими качающими жанрами в стиле неоновой вечеринки.",
    },
    {
      id: "3",
      title: "Sanday",
      date: "26 июня",
      time: "18:00",
      venue: "Клуб «Аквариум»",
      image: back,
      logo: logo,
      price: 4000,
      headliners: "DJ Baur, Fallenmusic",
      description:
        "Рейв-диджей-сет с Acid House, Rave, Techno и другими качающими жанрами в стиле неоновой вечеринки.",
    },
    {
      id: "4",
      title: "DJ Darhose",
      date: "26 июня",
      time: "18:00",
      venue: "Клуб «Аквариум»",
      image: bottomImage,
      logo: logo,
      price: 3300,
      headliners: "DJ Baur, Fallenmusic",
      description:
        "Рейв-диджей-сет с Acid House, Rave, Techno и другими качающими жанрами в стиле неоновой вечеринки.",
    },
  ];

  return (
    <div>
      <EventCarousel events={events} />
      <EventList events={eventsList} />
    </div>
  );
};

export default Home;
