# Yifan Zhao's Personal Homepage

This repository hosts my academic homepage at [qiaoqian-fan0214.github.io](https://qiaoqian-fan0214.github.io/).

The site is built with Jekyll and the al-folio theme, customized for my research, publications, news, CV, awards, and project links.

## Local Development

Install dependencies:

```bash
bundle install
```

Build the site:

```bash
bundle exec jekyll build
```

Serve locally:

```bash
bundle exec jekyll serve
```

## Main Content Files

- Homepage: `_pages/about.md`
- Publications: `_bibliography/papers.bib`
- News: `_news/`
- CV data: `_data/cv.yml`
- Social links: `_data/socials.yml`
- Assets: `assets/`

## Deployment

Pushing to `main` triggers GitHub Actions. The generated site is deployed to the `gh-pages` branch and served by GitHub Pages.

## Notes

This site is based on [al-folio](https://github.com/alshedivat/al-folio). Theme documentation remains useful for layout and plugin behavior, but this repository is maintained as a personal homepage rather than a theme fork.
