import hydrate from 'next-mdx-remote/hydrate';
import renderToString from 'next-mdx-remote/render-to-string';
import { getSanityContent } from '../utils/sanity';
import Callout from '../components/callout';

export default function Page({ title, content }) {
  const renderedContent = hydrate(content, {
    components: {
      Callout,
    },
  });

  return (
    <div>
      <h1>{title}</h1>
      {renderedContent}
    </div>
  );
}

export async function getStaticProps({ params }) {
  const data = await getSanityContent({
    query: `
      query PageBySlug($slug: String!) {
        allPage(where: { slug: { current: { eq: $slug } } }) {
          title
          slug {
            current
          }
          content
        }
      }
    `,
    variables: {
      slug: params.page,
    },
  });

  const [pageData] = data.allPage;

  const content = await renderToString(pageData.content, {
    components: { Callout },
  });

  return {
    props: {
      title: pageData.title,
      content,
    },
  };
}

export async function getStaticPaths() {
  const data = await getSanityContent({
    query: `
      query AllPages {
        allPage {
          slug {
            current
          }
        }
      }
    `,
  });

  const pages = data.allPage;

  return {
    paths: pages.map((p) => `/${p.slug.current}`),
    fallback: false,
  };
}
