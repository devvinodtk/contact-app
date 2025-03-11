import { Button } from '@material-tailwind/react';

interface MemberIdCardProps {
  memberId: string;
}

const MemberIdCardView = ({ memberId }: MemberIdCardProps) => {
  return (
    <>
      <h1>Show member to print id card here</h1>
    </>
  );
};

export default MemberIdCardView;
