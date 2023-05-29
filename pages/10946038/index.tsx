import MyAccordion from '@/components/10946038/Accordion';
import MyAlert from '@/components/10946038/Alert';
import MyCircularProgress from '@/components/10946038/CircularProgress';
import MyProgress from '@/components/10946038/Progress';
import MySkeleton from '@/components/10946038/Skeleton';
import MySpinner from '@/components/10946038/Spinner';
import MyTads from '@/components/10946038/Tabs';
import MyToast from '@/components/10946038/Toast';
import MyVisuallyHidden from '@/components/10946038/VisuallyHidden';
import { Container } from '@chakra-ui/react';

export default function Page10946038() {
  return (
    <><Container>
      <MyAccordion />
      <MyTads />
      <MyVisuallyHidden />
      <MyAlert />
      <MyCircularProgress />
      <MyProgress />
      <MySkeleton />
      <MySpinner />
    </Container></>
  );
}