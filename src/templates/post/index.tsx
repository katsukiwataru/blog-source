import React from "react"
import styled from "styled-components"
import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import {
  Layout,
  SEO,
  GradientFont,
  MarkdownContent,
  Comments,
} from "../../components"
import { formatDate } from "../../helpers"
import { PaginationLink, PaginationNav } from "./pagination"

const PostTitle = styled.h1`
  font-size: 4rem;
  word-break: break-word;
  margin-bottom: 1rem;
  @media screen and (max-width: 700px) {
    font-size: 4rem;
  }
`
const PostDate = styled.time`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 2rem;
  display: inline-block;
  text-shadow: 0 0 1rem #000;
`

const PostLink = ({ data, linkType }) => {
  if (!data) {
    return <Link to={"#"} />
  }
  const title = data.frontmatter.title
  const arrow = linkType === "prev" ? `< ${title}` : `${title} >`

  return (
    <Link to={data.fields.slug}>
      <PaginationLink active>{arrow}</PaginationLink>
    </Link>
  )
}

export default function Post({ data, pageContext }) {
  const post = data.mdx
  const { prev, next, identifier } = pageContext
  return (
    <Layout>
      <SEO title={post.frontmatter.title} description={post.rawBody} />
      <div>
        <PostTitle>
          <GradientFont
            dangerouslySetInnerHTML={{ __html: post.frontmatter.title }}
          />
        </PostTitle>
        <PostDate>{formatDate(post.frontmatter.date)}</PostDate>
        <MarkdownContent>
          <MDXRenderer>{post.body}</MDXRenderer>
        </MarkdownContent>
      </div>
      <PaginationNav>
        <PostLink data={prev} linkType={"prev"} />
        <PostLink data={next} linkType={"next"} />
      </PaginationNav>
      <Comments
        url={`https://blog.rainy.me/${pageContext.slug}`}
        identifier={identifier}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      rawBody
      frontmatter {
        title
        date
        tags
      }
      headings {
        value
      }
    }
  }
`
