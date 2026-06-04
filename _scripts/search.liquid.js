---
permalink: /assets/js/search-data.js
---
// Search intentionally mirrors the visible site navigation.
const ninja = document.querySelector("ninja-keys");

ninja.data = [
  {%- for page in site.pages -%}
    {%- if page.permalink == "/" -%}
      {%- assign about_title = page.title | escape | strip -%}
    {%- endif -%}
  {%- endfor -%}
  {
    id: "nav-{{ about_title | slugify }}",
    title: "{{ about_title | truncatewords: 13 }}",
    section: "Navigation",
    handler: () => {
      window.location.href = "{{ '/' | relative_url }}";
    },
  },
  {%- assign sorted_pages = site.pages | sort: "nav_order" -%}
  {%- for p in sorted_pages -%}
    {%- if p.nav and p.autogen == null and p.dropdown != true -%}
      {%- unless p.permalink == "/" or p.url == "/" -%}
        {
          {%- assign title = p.title | escape | strip -%}
          id: "nav-{{ title | slugify }}",
          title: "{{ title | truncatewords: 13 }}",
          description: "{{ p.description | strip_html | strip_newlines | escape | strip }}",
          section: "Navigation",
          handler: () => {
            window.location.href = "{{ p.url | relative_url }}";
          },
        },
      {%- endunless -%}
    {%- endif -%}
  {%- endfor -%}
];
