import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

type Meta = {
  property: string
  content: string
}

type SEOProps = {
  lang?: string
  meta?: Meta[]
  description?: string
  title?: string
}

const genDescription = (description: string) => {
  description = description
    .replace(/---[\s\S]*?---/g, "")
    .replace(/<[\s\S]*?>/g, "")
    .replace(/[`#]/g, "")
    .replace(/\s+/g, " ")
    .replace(/\!\[\]\((.+?)\)/, "$1")
  description =
    description.length <= 160 ? description : description.substr(0, 160) + "..."
  return description.trim()
}

export default function SEO({
  description = "",
  lang = "en",
  meta = [],
  title = "",
}: SEOProps) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const descriptionSource =
    genDescription(description) || title || site.siteMetadata.description
  const metaDescription = `blog of yue: ${descriptionSource}`

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}
