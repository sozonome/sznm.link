/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "sznm.link",
  titleTemplate: "%s | sznm.link",
  defaultTitle: "sznm.link",
  description: "sozonome's personal shortener service",
  canonical: "https://sznm.link",
  openGraph: {
    url: "https://sznm.link",
    title: "sznm.link",
    description: "Next.js + chakra-ui + TypeScript template",
    images: [
      {
        url: "https://og-image.sznm.dev/**sznm.link**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250",
        alt: "sznm.link og-image",
      },
    ],
    site_name: "sznm.link",
  },
  twitter: {
    handle: "@sozonome",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
