import Head from 'next/head';
import { createClient } from '../../services/prismicio';
import styles from './styles.module.scss';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="">
            <time>17 de junho</time>
            <strong>AAAAA</strong>
            <p>dsgfsarhdesarhedrhedrthrtf</p>
          </a>
          <a href="">
            <time>17 de junho</time>
            <strong>AAAAA</strong>
            <p>dsgfsarhdesarhedrhedrthrtf</p>
          </a>
          <a href="">
            <time>17 de junho</time>
            <strong>AAAAA</strong>
            <p>dsgfsarhdesarhedrhedrthrtf</p>
          </a>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const client = createClient();

  const posts = await client.getAllByType('posts');

  // console.log(JSON.stringify(posts, null, 2));

  return {
    props: { posts },
  };
}