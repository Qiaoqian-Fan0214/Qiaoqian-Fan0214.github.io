(function () {
  const selector = "[data-visitor-map]";
  const minWidth = 320;
  const reloadThreshold = 24;
  const loadTimeoutMs = 15000;

  function getWidth(container) {
    const rect = container.getBoundingClientRect();
    return Math.max(minWidth, Math.round(rect.width || container.offsetWidth || minWidth));
  }

  function showFallback(container) {
    const url = container.dataset.fallbackUrl;
    const src = container.dataset.fallbackSrc;
    if (!url || !src) return;

    container.innerHTML = "";

    const link = document.createElement("a");
    link.href = url;
    link.title = "Visit tracker";
    link.className = "visitor-map-static-fallback";
    link.target = "_blank";
    link.rel = "external nofollow noopener";

    const image = document.createElement("img");
    image.src = src;
    image.alt = "Visit tracker";
    image.loading = "lazy";

    link.appendChild(image);
    container.appendChild(link);
  }

  function loadMap(container) {
    const width = getWidth(container);
    const previousWidth = Number(container.dataset.mapWidth || 0);
    if (container.dataset.mapLoaded === "true" && Math.abs(previousWidth - width) < reloadThreshold) return;

    container.dataset.mapLoaded = "true";
    container.dataset.mapWidth = String(width);
    container.innerHTML = "";

    const params = new URLSearchParams({
      cl: container.dataset.mapLand || "ede9fe",
      w: String(width),
      t: container.dataset.mapCaption || "m",
      d: container.dataset.mapId,
      co: container.dataset.mapOcean || "2d78ad",
      cmo: container.dataset.mapMarkerOld || "c4b5fd",
      cmn: container.dataset.mapMarkerNew || "7c3aed",
      ct: container.dataset.mapText || "ffffff",
    });

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "mapmyvisitors";
    script.async = true;
    script.src = "https://mapmyvisitors.com/map.js?" + params.toString();
    script.onerror = function () {
      showFallback(container);
    };

    container.appendChild(script);

    window.setTimeout(function () {
      const loading = container.querySelector(".mapmyvisitors-loading");
      if (loading) {
        showFallback(container);
      }
    }, loadTimeoutMs);
  }

  function initVisitorMaps() {
    const containers = Array.from(document.querySelectorAll(selector));
    if (!containers.length) return;

    containers.forEach(loadMap);

    let resizeTimer;
    window.addEventListener("resize", function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function () {
        containers.forEach(loadMap);
      }, 180);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initVisitorMaps);
  } else {
    initVisitorMaps();
  }
})();
