// Search intentionally mirrors the visible site navigation.
const ninja = document.querySelector("ninja-keys");

ninja.data = [{
    id: "nav-home",
    title: "home",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "Selected research papers and preprints.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "Curriculum vitae of Yifan Zhao.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },];
