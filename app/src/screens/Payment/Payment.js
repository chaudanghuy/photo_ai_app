import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../../translations/i18n';
import "../../css/Payment.css";
import cash from '../../assets/Payment/cash.png';
import cash_click from '../../assets/Payment/cash_click.png';
import momo from '../../assets/Payment/momo.png';
import momo_click from '../../assets/Payment/momo_click.png';
import zalopay from '../../assets/Payment/zalopay.png';
import zalopay_click from '../../assets/Payment/zalopay_click.png';
import vnpay from '../../assets/Payment/vnpay.png';
import vnpay_click from '../../assets/Payment/vnpay_click.png';
import promo from '../../assets/Payment/promo.png';
import promo_click from '../../assets/Payment/promo_click.png';

function Payment() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [hoveredImage, setHoveredImage] = useState(null);

  const handleMouseEnter = (image) => {
    setHoveredImage(image);
  }

  const handleMouseLeave = () => {
    setHoveredImage(null);
  }

  const goToPay = (method) => {
    if (method === 'cash') {
      navigate('/payment-cash');
    } else if (method === 'momo') {
      navigate('/payment-qr');
    } else if (method === 'zalopay') {
      navigate('/payment-qr');
    } else if (method === 'promo') {
      navigate('/payment-promo');
    } else if (method === 'vnpay') {
      navigate('/payment-qr');
    }
  }

  return (
    <div className='payment-container'>
      <div className="go-back" onClick={() => navigate("/frame-step-3")}></div>
      <div className="payment-line">
        <div className="payment-method" style={{ backgroundImage: `url(${hoveredImage === cash ? cash_click : cash})` }} onMouseEnter={() => handleMouseEnter(cash)} onMouseLeave={handleMouseLeave} onClick={() => goToPay('cash')}></div>
        <div className="payment-method" style={{ backgroundImage: `url(${hoveredImage === vnpay ? vnpay_click : vnpay})` }} onMouseEnter={() => handleMouseEnter(vnpay)} onMouseLeave={handleMouseLeave} onClick={() => goToPay('vnpay')}></div>
        <div className="payment-method" style={{ backgroundImage: `url(${hoveredImage === promo ? promo_click : promo})` }} onMouseEnter={() => handleMouseEnter(promo)} onMouseLeave={handleMouseLeave} onClick={() => goToPay('promo')}></div>
      </div>
    </div>
  );
}

export default Payment;