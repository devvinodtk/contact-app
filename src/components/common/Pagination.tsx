import React, { useEffect, useState } from 'react';
import { Button, IconButton, Typography } from '@material-tailwind/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { typographyProps } from '../../types/Users';

interface PaginationProps {
  totalCount: number;
  pageSize: number;
  onPageChange: (startIndex: number, endIndex: number) => void;
}
const Pagination = ({
  totalCount,
  pageSize,
  onPageChange,
}: PaginationProps) => {
  const [active, setActive] = useState(0);
  const numberOfPages = Math.ceil(totalCount / pageSize);
  const startIndex = active * pageSize;
  const endIndex = startIndex + pageSize;

  const getItemProps = (index: number) =>
    ({
      variant: active === index ? 'filled' : 'text',
      color: 'gray',
      onClick: () => setActive(index),
      className: 'rounded-full',
    }) as any;

  const next = () => {
    if (active === numberOfPages - 1) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 0) return;
    setActive((previous) => previous - 1);
  };

  useEffect(() => {
    onPageChange(startIndex, endIndex);
  }, [active]);

  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        {...({} as React.ComponentProps<typeof Button>)}
        variant="text"
        className="flex item-center gap-2 rounded-full"
        disabled={active === 0}
        onClick={prev}
      >
        <ArrowLeft strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2 hidden sm:block">
        {[...Array(numberOfPages).keys()].map((n) => (
          <IconButton key={n} {...getItemProps(n)}>
            {n + 1}
          </IconButton>
        ))}
      </div>
      <Typography
        {...(typographyProps as React.ComponentProps<typeof Typography>)}
        color="gray"
        className="font-normal block sm:hidden"
      >
        Page <strong className="text-gray-900">{active + 1}</strong> of{' '}
        <strong className="text-gray-900">{numberOfPages}</strong>
      </Typography>
      <Button
        {...({} as React.ComponentProps<typeof Button>)}
        variant="text"
        className="flex item-center gap-2 rounded-full"
        disabled={active === numberOfPages - 1}
        onClick={next}
      >
        <ArrowRight strokeWidth={2} className="h-4 w-4" /> Next
      </Button>
    </div>
  );
};

export default Pagination;
