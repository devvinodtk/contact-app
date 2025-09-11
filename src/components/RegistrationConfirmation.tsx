/* eslint-disable react/jsx-props-no-spreading */
import { Button, Typography } from '@material-tailwind/react';
import QRCode from 'react-qr-code';
import { typographyProps } from '../types/Users';

const RegistrationConfirmation = () => {
  const WABA_NUMBER = '+91 96206 49197';
  const formattedPhone = WABA_NUMBER.replace(/\D/g, '');
  const waLink = `https://wa.me/${formattedPhone}?text=${encodeURIComponent('Hi')}`;

  const handleSendWhatsAppMsgClick = () => {
    window.open(waLink, '_blank');
  };

  return (
    <main className="text-justify">
      <Typography
        className="leading-relaxed pb-2"
        {...(typographyProps as React.ComponentProps<typeof Typography>)}
      >
        Thank you for registering with the Kalakairali Member Management System.
        {' '}
        One of our admins will review your details and approve your registration shortly.
      </Typography>
      <Typography
        className="leading-relaxed pb-1"
        {...(typographyProps as React.ComponentProps<typeof Typography>)}
      >
        To receive the latest updates, you can start a WhatsApp conversation by sending
        `Hi` to our official contact number:
        {' '}
        <strong>{WABA_NUMBER}</strong>
        {' '}
        from your registered mobile number.
      </Typography>
      <Typography
        className="leading-relaxed pb-1"
        {...(typographyProps as React.ComponentProps<typeof Typography>)}
      >
        You can click the `START CHAT` button or
        scan the QR code to open WhatsApp with a pre-filled message.
      </Typography>

      <div className="p-4 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center border rounded-lg shadow-md p-4">
          {/* QR Code Section */}
          <div className="flex flex-col items-center pr-4">
            <QRCode value={waLink} size={90} />
            <Typography className="mt-2 text-sm text-gray-600">
              Scan to chat
            </Typography>
          </div>

          {/* Vertical Divider */}
          <div className="w-px bg-gray-300 mx-6 h-24 shadow-sm" />

          {/* Button Section */}
          <div className="flex flex-col items-center">
            <Button
              type="button"
              color="blue"
              onClick={handleSendWhatsAppMsgClick}
              className="cursor-pointer text-white
              hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300
              font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              {...({} as React.ComponentProps<typeof Button>)}
            >
              Start Chat
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegistrationConfirmation;
