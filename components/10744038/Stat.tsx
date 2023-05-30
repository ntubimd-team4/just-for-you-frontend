import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react';

export default function MyStat() {
  return (
    <>
      <Stat m={10}>
        <StatLabel>Collected Fees</StatLabel>
        <StatNumber>£0.00</StatNumber>
        <StatHelpText>Feb 12 - Feb 28</StatHelpText>
      </Stat>
      <StatGroup m={10}>
        <Stat>
          <StatLabel>Sent</StatLabel>
          <StatNumber>345,670</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
        23.36%
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Clicked</StatLabel>
          <StatNumber>45</StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
        9.05%
          </StatHelpText>
        </Stat>
      </StatGroup>
    </>
  );
}