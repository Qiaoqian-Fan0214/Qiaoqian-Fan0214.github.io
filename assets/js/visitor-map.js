(function () {
  const selector = "[data-visitor-map]";
  const minWidth = 280;
  const maxWidth = 576;
  const loadTimeoutMs = 15000;

  function getWidth(container) {
    const rect = container.getBoundingClientRect();
    const width = Math.round(rect.width || container.offsetWidth || maxWidth);
    return Math.max(minWidth, Math.min(maxWidth, width));
  }

  function showFallback(container) {
    const key = container.dataset.visitorKey;
    const url = container.dataset.statsUrl || (key ? "https://whos.amung.us/stats/" + key + "/" : "");
    if (!url) return;

    container.innerHTML = "";

    const link = document.createElement("a");
    link.href = url;
    link.title = "Visitor map stats";
    link.className = "visitor-map-static-fallback";
    link.target = "_blank";
    link.rel = "external nofollow noopener";
    link.textContent = "Visitor map stats";

    container.appendChild(link);
  }

  function markerTitle(marker) {
    const city = marker.city || "Unknown";
    const country = marker.cc || "";
    return country ? city + ", " + country : city;
  }

  function markerPosition(marker) {
    const lat = Number(marker.lat);
    const lon = Number(marker.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;

    return {
      left: ((lon + 180) / 360) * 100,
      top: ((90 - lat) / 180) * 100,
    };
  }

  function renderMap(container, markers) {
    const key = container.dataset.visitorKey;
    const statsUrl = container.dataset.statsUrl || "https://whos.amung.us/stats/" + key + "/";
    const background = container.dataset.mapBackground || "classic";

    container.innerHTML = "";

    const link = document.createElement("a");
    link.href = statsUrl;
    link.title = "Visitor map stats";
    link.className = "visitor-map-canvas";
    link.target = "_blank";
    link.rel = "external nofollow noopener";

    const image = document.createElement("img");
    image.src = "https://widgets.amung.us/mapbacks/" + encodeURIComponent(background) + ".jpg";
    image.alt = "Live visitor map";
    image.loading = "lazy";
    link.appendChild(image);

    markers.forEach(function (marker) {
      const position = markerPosition(marker);
      if (!position) return;

      const pin = document.createElement("span");
      pin.className = "visitor-map-pin" + (marker.age === "new" ? " is-new" : "");
      pin.style.left = position.left + "%";
      pin.style.top = position.top + "%";
      pin.title = markerTitle(marker);
      link.appendChild(pin);
    });

    container.appendChild(link);
  }

  function loadMap(container) {
    const key = container.dataset.visitorKey;
    if (!key) return;
    if (container.dataset.mapLoaded === "true") return;

    const width = getWidth(container);

    container.dataset.mapLoaded = "true";
    container.dataset.mapWidth = String(width);
    renderMap(container, []);

    const previousCallback = window.WAU_r_m;
    window.WAU_r_m = function (onlineCount, statsKey, widgetIndex, markers) {
      if (statsKey === key && Array.isArray(markers)) {
        renderMap(container, markers);
      }

      if (typeof previousCallback === "function" && previousCallback !== window.WAU_r_m) {
        previousCallback.apply(window, arguments);
      }
    };

    const timing = window.performance && window.performance.timing;
    const readyTime = timing && timing.domContentLoadedEventStart ? (timing.domContentLoadedEventStart - timing.navigationStart) / 1000 : 0;
    const params = new URLSearchParams({
      k: key,
      t: document.title ? document.title.substring(0, 80).replace(/(\?=)|(\/)/g, "") : "",
      c: "m",
      x: window.location.href,
      y: document.referrer,
      a: "0",
      d: String(readyTime),
      v: "27",
      r: String(Math.ceil(Math.random() * 9999)),
    });

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://whos.amung.us/pingjs/?" + params.toString();

    container.appendChild(script);

    window.setTimeout(function () {
      if (!container.querySelector(".visitor-map-canvas img")) {
        showFallback(container);
      }
    }, loadTimeoutMs);
  }

  function initVisitorMaps() {
    const containers = Array.from(document.querySelectorAll(selector));
    if (!containers.length) return;

    containers.forEach(loadMap);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initVisitorMaps);
  } else {
    initVisitorMaps();
  }
})();
