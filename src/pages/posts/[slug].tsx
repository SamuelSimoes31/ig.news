import { PrismicRichText } from '@prismicio/react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import React from 'react';
import { createClient } from '../../services/prismicio';
import styles from './post.module.scss';

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: any;
    updatedAt: string;
  };
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={styles.postContent}
            // dangerouslySetInnerHTML={{__html, post.content}}
          >
          <PrismicRichText field={post.content}/>
          </div>
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });
  const { slug } = params;

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      }
    }
  }

  const prismic = createClient({ req });

  const response = await prismic.getByUID('posts', String(slug));
  // console.log(JSON.stringify(response, null, 2));

  const post = {
    slug,
    title: response.data.title[0].text,
    content: response.data.content,
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  };

  return {
    props: {
      post
    }
  };
};