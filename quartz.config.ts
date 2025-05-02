import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "sklique",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "sklique.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        title: "Libre Franklin",
        header: "Prompt",
        body: "Slabo",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f5f5f5",
          lightgray: "#1f5e91",
          gray: "#3d81b8",
          darkgray: "#094e86",
          dark: "#ff5d8f",
          secondary: "#094e86",
          tertiary: "#3d81b8",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#ffa6c1",
        },
        darkMode: {
          light: "#121c2b",             // dark bluish-gray background
          lightgray: "#2a3d55",         // soft border, low contrast
          gray: "#3c5b78",              // stronger border / graph link
          darkgray: "#b0cbe3",          // body text, light on dark
          dark: "#ff79a8",              // header text and icons (pink tone)
          secondary: "#4aa8ff",         // link color, current graph node (vivid blue)
          tertiary: "#74bfff",          // hover and visited states (soft blue)
          highlight: "rgba(255, 182, 210, 0.1)", // internal link / code highlight bg
          textHighlight: "#ffd3e4",     // markdown highlight bg (light pink)
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [
      Plugin.ExplicitPublish(), 
      Plugin.RemoveDrafts(),
    ],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      // Plugin.CustomOgImages(),
    ],
  },
}

export default config
