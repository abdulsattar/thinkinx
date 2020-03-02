import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All Languages" />

      <blockquote>
        A language that doesn't affect the way you think about programming, is
        not worth knowing. - Alan Perlis
      </blockquote>
      <p>
        The most important thing you need to learn about a language is how to
        think in it. This blog languages highlighting that aspect. It doesn't
        focus much on syntax or the ecosystem. There are sites like{" "}
        <a href="https://learnxinyminutes.com">Learn X in Y minutes</a> for
        that.
      </p>
      <h3>Languages</h3>
      <p>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <React.Fragment key={node.fields.slug}>
              <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                {title}
              </Link>
              <br />
            </React.Fragment>
          )
        })}
      </p>
      <Bio />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___title], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            description
          }
        }
      }
    }
  }
`
