import { PrismicRichText } from '@prismicio/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { createClient } from '../../../services/prismicio';
import styles from '../post.module.scss';

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: any;
    updatedAt: string;
  };
}

export default function PostPreview({ post }: PostPreviewProps) {
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
            className={`${styles.postContent} ${styles.previewContent}`}
          >
            <PrismicRichText field={post.content} />
          </div>
          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/">
              <a >
                Subscribe now🤗
              </a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;


  const prismic = createClient();

  const response = await prismic.getByUID('posts', String(slug));
  // console.log(JSON.stringify(response, null, 2));

  const post = {
    slug,
    title: response.data.title[0].text,
    content: response.data.content.splice(0, 3),
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