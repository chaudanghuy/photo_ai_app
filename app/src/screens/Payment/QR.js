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
                    const response = await fetch('http://127.0.0.1:8000/zalopay/api?device=PB1&amount=10000');
                    const qrCodeData = await response.json();
                    setQrCode(qrCodeData.qr_code);
                    setOrderCode(qrCodeData.order_code);
               } catch (error) {
                    console.error(error);
               }
          }

          fetchQRPayment();
     }, [])

     useEffect(() => {
          const checkPaymentStatus = async () => {
               try {
                    const response = await fetch(`http://127.0.0.1:8000/zalopay/api/webhook?device=PB1`);
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
               checkPaymentStatus()
          }, 8000);
          
          return () => {
               clearInterval(intervalId);
          }
     }, []);

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