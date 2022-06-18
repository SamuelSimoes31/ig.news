import Head from 'next/head';
import Link from 'next/link';
import { createClient } from '../../services/prismicio';
import styles from './styles.module.scss';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};
interface PostProps {
  posts: Post[];
}

export default function Posts({ posts }: PostProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link href={`posts/${post.slug}`} key={post.slug}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const client = createClient();

  const results = await client.getAllByType('posts');
  // console.log(JSON.stringify(results, null, 2));

  const posts = results.map(post => ({
    slug: post.uid,
    title: post.data.title[0].text,
    excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? "",
    updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }));

  return {
    props: { posts },
  };
}