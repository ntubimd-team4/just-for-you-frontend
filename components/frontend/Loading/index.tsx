import styles from '@/styles/frontend/_Loading.module.scss';

export default function Loading() {
  const LoadingEffect = () => (
    <section className={styles.container}>
      <div className={styles.ripple}></div>
    </section>
  );

  return (
    <LoadingEffect />
  );
}