import React from 'react';
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react';
import { X } from 'lucide-react';

interface PopupContainerProps {
  open: boolean;
  onClose: () => void;
  header?: string;
  children?: React.ReactNode;
}

const PopupContainer: React.FC<PopupContainerProps> = ({
  open,
  onClose,
  header,
  children,
}: PopupContainerProps) => {
  return (
    <Dialog
      size="sm"
      className="items-center justify-center overflow-y-auto max-w-[95%] max-h-[95vh]"
      dismiss={{ outsidePress: false }}
      {...({ open, handler: onClose } as unknown as React.ComponentProps<
        typeof Dialog
      >)}
    >
      <DialogHeader
        className="w-full justify-between border-b"
        {...({} as React.ComponentProps<typeof DialogHeader>)}
      >
        <h2 className="text-center w-full ml-[10%] sm:text-base md:text-lg">
          {header}
        </h2>
        <X
          onClick={onClose}
          className="cursor-pointer text-lg font-semibold w-[10%] mb-4 text-gray-600"
        />
      </DialogHeader>
      <div className="w-full mt-1">
        <DialogBody {...({} as React.ComponentProps<typeof DialogHeader>)}>
          {children}
        </DialogBody>
        <DialogFooter
          className="w-full"
          {...({} as React.ComponentProps<typeof DialogHeader>)}
        >
          <p></p>
        </DialogFooter>
      </div>
    </Dialog>
  );
};

export default PopupContainer;
