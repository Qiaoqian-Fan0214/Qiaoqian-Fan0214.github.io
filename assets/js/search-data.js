// Search intentionally mirrors the visible site navigation.
const ninja = document.querySelector("ninja-keys");

ninja.data = [
  {
    id: "nav-home",
    title: "Home",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },
  {
    id: "nav-news",
    title: "News",
    section: "Navigation",
    handler: () => {
      window.location.href = "/#news";
    },
  },
  {
    id: "nav-publications",
    title: "Publications",
    section: "Navigation",
    handler: () => {
      window.location.href = "/#publications";
    },
  },
  {
    id: "nav-awards",
    title: "Awards",
    section: "Navigation",
    handler: () => {
      window.location.href = "/#awards";
    },
  },
  {
    id: "nav-education",
    title: "Education",
    section: "Navigation",
    handler: () => {
      window.location.href = "/#education";
    },
  },
  {
    id: "nav-cv",
    title: "CV",
    section: "Navigation",
    handler: () => {
      window.location.href = "/cv/";
    },
  },
];
