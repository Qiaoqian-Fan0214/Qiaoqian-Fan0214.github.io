---
permalink: /assets/js/search-data.js
---
// Search intentionally mirrors the visible site navigation.
const ninja = document.querySelector("ninja-keys");

ninja.data = [
  {
    id: "nav-home",
    title: "Home",
    section: "Navigation",
    handler: () => {
      window.location.href = "{{ '/' | relative_url }}";
    },
  },
  {
    id: "nav-news",
    title: "News",
    section: "Navigation",
    handler: () => {
      window.location.href = "{{ '/#news' | relative_url }}";
    },
  },
  {
    id: "nav-publications",
    title: "Publications",
    section: "Navigation",
    handler: () => {
      window.location.href = "{{ '/#publications' | relative_url }}";
    },
  },
  {
    id: "nav-awards",
    title: "Awards",
    section: "Navigation",
    handler: () => {
      window.location.href = "{{ '/#awards' | relative_url }}";
    },
  },
  {
    id: "nav-education",
    title: "Education",
    section: "Navigation",
    handler: () => {
      window.location.href = "{{ '/#education' | relative_url }}";
    },
  },
  {
    id: "nav-cv",
    title: "CV",
    section: "Navigation",
    handler: () => {
      window.location.href = "{{ '/cv/' | relative_url }}";
    },
  },
];
