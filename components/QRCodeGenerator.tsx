import { useEffect, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";

interface QRCodeGeneratorProps {
  link: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ link }) => {
  const [qrCode, setQrCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const url = await QRCode.toDataURL(link, { width: 200 });
        setQrCode(url);
      } catch (err) {
        console.error("Error generating QR code:", err);
        setError("Failed to generate QR Code. Please try again.");
      }
    };

    generateQRCode();
  }, [link]);

  return (
    <div className="flex flex-col items-center">
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : qrCode ? (
        <Image src={qrCode} alt="QR Code" width={250} height={250} />
      ) : (
        <p>Loading QR Code...</p>
      )}
    </div>
  );
};

export default QRCodeGenerator;
