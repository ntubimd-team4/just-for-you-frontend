import Image from 'next/image';
import loadingGIF from '@/public/images/loading.gif';
import styles from '@/styles/frontend/_Loading.module.scss';

export default function Loading({ hint }: { hint: string }) {
  return (
    <section className={styles.container}>
      <Image src={loadingGIF} alt={''} />
      <p className={styles.hint}>{hint}...</p>
    </section>
  );
}