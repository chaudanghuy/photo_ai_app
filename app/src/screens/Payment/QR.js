import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../../translations/i18n';
import "../../css/Payment.css";
import QRCode from 'qrcode.react';

function QR() {
     const { t } = useTranslation();
     const navigate = useNavigate();
     const [hoveredImage, setHoveredImage] = useState(null);
     const [qrCode, setQrCode] = useState(null);
     const [orderCode, setOrderCode] = useState(null);
     const [paymentStatus, setPaymentStatus] = useState(null);

     useEffect(() => {
          const fetchQRPayment = async () => {
               try {
                    const deviceNumber = process.env.REACT_APP_DEVICE_NUMBER;
                    const framePrice = sessionStorage.getItem('framePrice');
                    const response = await fetch(`${process.env.REACT_APP_BACKEND}/zalopay/api?device=${deviceNumber}&amount=${framePrice}`);
                    const qrCodeData = await response.json();
                    setQrCode(qrCodeData.qr_code);
                    setOrderCode(qrCodeData.order_code);

                    if (qrCodeData.return_code == 1) {
                         setPaymentStatus(qrCodeData.status);
                    }
               } catch (error) {
                    console.error(error);
               }
          }

          fetchQRPayment();
     }, [])

     useEffect(() => {
          const checkPaymentStatus = async (orderCodeNum) => {
               try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND}/zalopay/api/webhook?order=${orderCodeNum}`);
                    const paymentData = await response.json();
                    if (paymentData.status === "Success") {
                         clearInterval(intervalId);
                         navigate("/payment-result");
                    }
               } catch (error) {
                    console.error(error);
               }
          };

          const intervalId = setInterval(() => {
               if (orderCode) {
                    checkPaymentStatus(orderCode);
               }
          }, 8000);

          return () => {
               clearInterval(intervalId);
          }
     })

     useEffect(() => {
          if (paymentStatus === 'Success') {
               navigate("/payment-result"); // Redirect to the next page
          }
     }, [paymentStatus]);

     const handleMouseEnter = (image) => {
          setHoveredImage(image);
     }

     const handleMouseLeave = () => {
          setHoveredImage(null);
     }

     const goBack = () => {
          navigate("/payment");
     }

     return (
          <div className='qr-container'>
               <div className='qr-code'>
                    {qrCode && <QRCode value={qrCode} />}
               </div>
               <div className="go-back" onClick={goBack}></div>
          </div>
     );
}

export default QR;