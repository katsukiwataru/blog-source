import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/global/seo"
import styled from "styled-components"
import { MDXRenderer } from 'gatsby-mdx'

import GradientFont from "../../components/common/gradientFont"
import MarkdownContent from "../../components/common/markdownContent"
import Link from "gatsby-link"
import { PaginationLink, PaginationNav } from "./pagination"
import Comments from '../../components/common/comments'

const PostTitle = styled.h1`
  font-size: 4rem;
  word-break: break-word;
  @media screen and (max-width: 700px) {
    font-size: 4rem;
  }
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
      <SEO title={post.frontmatter.title} keywords={post.frontmatter.tags} />
      <div>
        <PostTitle>
          <GradientFont
            dangerouslySetInnerHTML={{ __html: post.frontmatter.title }}
          />
        </PostTitle>
        <MarkdownContent >
          <MDXRenderer>{post.code.body}</MDXRenderer>
        </MarkdownContent>
      </div>
      <PaginationNav>
        <PostLink data={prev} linkType={"prev"} />
        <PostLink data={next} linkType={"next"} />
      </PaginationNav>
      <Comments url={`https://blog.rainy.me/${pageContext.slug}`} identifier={identifier} title={post.frontmatter.title} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      code{
          body
      }
      frontmatter {
        title
        date
        tags
      }
    }
  }
`
