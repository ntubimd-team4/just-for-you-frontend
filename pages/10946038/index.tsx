import MyAccordion from '@/components/10946038/Accordion';
import MyAlert from '@/components/10946038/Alert';
import MyAvatar from '@/components/10946038/Avatar';
import MyBreadcrumb from '@/components/10946038/Breadcrumb';
import MyCircularProgress from '@/components/10946038/CircularProgress';
import MyIcon from '@/components/10946038/Icon';
import MyImage from '@/components/10946038/Image';
import MyLink from '@/components/10946038/Link';
import MyProgress from '@/components/10946038/Progress';
import MySkeleton from '@/components/10946038/Skeleton';
import MySpinner from '@/components/10946038/Spinner';
import MyTads from '@/components/10946038/Tabs';
import MyToast from '@/components/10946038/Toast';
import MyVisuallyHidden from '@/components/10946038/VisuallyHidden';
import { Container, Icon } from '@chakra-ui/react';

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
      <MyAvatar/>
      <MyIcon/>
      <MyImage/>
      <MyBreadcrumb/>
      <MyLink/>
    </Container></>
  );
}