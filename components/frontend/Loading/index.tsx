import styles from '@/styles/frontend/_Loading.module.scss';
import Layout from '../Layout';

export default function Loading({ hint }: { hint: string }) {
  return (
    <Layout>
      <section className={styles.container}>
        <p className={styles.hint}>{hint}...</p>
      </section>
    </Layout>
  );
}