import { useEffect, useState } from 'react';
import { FieldErrors, UseFormClearErrors } from 'react-hook-form';
import AddressCard from './common/AddressCard';
import {
  Address,
  AddressChangeType,
  AddressType,
  Members,
} from '../types/Users';
import PopupContainer from './common/PopupContainer';
import AddressForm from './AddressForm';
import { memberAddress } from '../types/UsersMock';

interface MemberAddressProps {
  memPresentAddress: Address;
  memPermanentAddress: Address;
  memOfficeAddress?: Address | null;
  errors: FieldErrors<Members>;
  clearErrors: UseFormClearErrors<Members>;
  onMemberAddressChange: (type: string, address: Address) => void;
  showActionButton: boolean;
}

const MemberAddress = ({
  memPresentAddress,
  memPermanentAddress,
  memOfficeAddress,
  onMemberAddressChange,
  errors,
  clearErrors,
  showActionButton,
}: MemberAddressProps) => {
  const [presentAddress, setPresentAddress] =
    useState<Address>(memPresentAddress);
  const [permanentAddress, setPermanentAddress] =
    useState<Address>(memPermanentAddress);
  const [officeAddress, setOfficeAddress] = useState<
    Address | null | undefined
  >(memOfficeAddress);

  const [currentAddressChange, setCurrentAddressChange] =
    useState<AddressChangeType>({} as AddressChangeType);

  const [openAddressDialog, setOpenAddressDialog] = useState(false);

  const handleAddAddress = ({ operation, addressType }: AddressChangeType) => {
    setCurrentAddressChange({ operation, addressType });
    setOpenAddressDialog(true);
  };

  const handleCloseAddress = () => setOpenAddressDialog(false);

  const handleAddressChange = (addressType: AddressType, value: Address) => {
    if (addressType === AddressType.PresentAddress) {
      clearErrors('presentAddress');
      setPresentAddress(value);
    } else if (addressType === AddressType.PermanentAddress) {
      setPermanentAddress(value);
      clearErrors('permanentAddress');
    } else if (addressType === AddressType.OfficeAddress) {
      setOfficeAddress(value);
    }
    handleCloseAddress();
    onMemberAddressChange(addressType, value);
  };

  useEffect(() => {
    if (memPresentAddress.flatNumberName) {
      setPresentAddress(memPresentAddress);
    }
    if (memPermanentAddress.flatNumberName) {
      setPermanentAddress(memPermanentAddress);
    }
    if (memOfficeAddress?.flatNumberName) {
      setOfficeAddress(memOfficeAddress);
    }
    if (
      !memPresentAddress.flatNumberName &&
      !memPermanentAddress.flatNumberName &&
      !memOfficeAddress?.flatNumberName
    ) {
      setPresentAddress(memberAddress);
      setPermanentAddress(memberAddress);
      setOfficeAddress(memberAddress);
    }
  }, [memPresentAddress, memPermanentAddress, memOfficeAddress]);

  const handleCopyPresentAddressChange = (value: boolean) => {
    if (value && presentAddress?.flatNumberName) {
      setPermanentAddress(presentAddress);
      clearErrors('permanentAddress');
    } else {
      setPermanentAddress(memberAddress);
    }
  };

  return (
    <>
      <AddressCard
        address={presentAddress}
        addressType={AddressType.PresentAddress}
        onEdit={({ operation, addressType }) =>
          handleAddAddress({ operation, addressType })
        }
        error={!!errors?.presentAddress}
        showActionButton={showActionButton}
      />
      <AddressCard
        address={permanentAddress}
        copyAddress={true}
        addressType={AddressType.PermanentAddress}
        onEdit={({ operation, addressType }) =>
          handleAddAddress({ operation, addressType })
        }
        onCopyPresentAddress={handleCopyPresentAddressChange}
        error={!!errors?.permanentAddress}
        showActionButton={showActionButton}
      />
      <AddressCard
        address={officeAddress}
        addressType={AddressType.OfficeAddress}
        onEdit={({ operation, addressType }) =>
          handleAddAddress({ operation, addressType })
        }
        error={false}
        showActionButton={showActionButton}
      />
      <PopupContainer
        header={`${currentAddressChange.operation} ${currentAddressChange.addressType}`}
        open={openAddressDialog}
        onClose={handleCloseAddress}
      >
        <AddressForm
          addressType={currentAddressChange.addressType}
          addressInfo={
            (presentAddress || permanentAddress || officeAddress) &&
            currentAddressChange.addressType === AddressType.PresentAddress
              ? presentAddress
              : currentAddressChange.addressType ===
                  AddressType.PermanentAddress
                ? permanentAddress
                : officeAddress
          }
          onAddressChange={(addressType, value) =>
            handleAddressChange(addressType, value)
          }
        />
      </PopupContainer>
    </>
  );
};

export default MemberAddress;
