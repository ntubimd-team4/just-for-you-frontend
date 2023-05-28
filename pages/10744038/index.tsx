import MyAccordion from '@/components/10744038/Accordion';
import MyAlertDialog from '@/components/10744038/AlertDialog';
import MyDrawer from '@/components/10744038/Drawer';
import MyMenu from '@/components/10744038/Menu';
import MyModal from '@/components/10744038/Modal';
import MyPopover from '@/components/10744038/Popover';
import MyTabs from '@/components/10744038/Tabs';
import MyTooltip from '@/components/10744038/Tooltip';
import MyVisuallyHidden from '@/components/10744038/VisuallyHidden';
import { Container } from '@chakra-ui/react';

export default function Page10744038() {
  return (
    <Container>
      <MyAccordion />
      <MyTabs />
      <MyVisuallyHidden />
      <MyAlertDialog />
      <MyDrawer />
      <MyMenu />
      <MyModal />
      <MyPopover />
      <MyTooltip />
    </Container>
  );
}