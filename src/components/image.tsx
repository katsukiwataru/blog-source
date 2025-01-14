import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default function Image() {
  return (
    <StaticQuery
      query={graphql`
        query {
          placeholderImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      `}
      render={data => (
        <Img fluid={data.placeholderImage.childImageSharp.fluid} />
      )}
    />
  )
}
