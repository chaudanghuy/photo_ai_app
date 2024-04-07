import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../../translations/i18n';
import "../../css/Payment.css";
// Image
import promo_form from '../../assets/Payment/Promo/promo_form.png';
import promo_input from '../../assets/Payment/Promo/promo_input.png';
import redeem from '../../assets/Payment/Promo/redeem.png';
import redeem_click from '../../assets/Payment/Promo/redeem_click.png';
// Promo images
import button0 from '../../assets/Payment/Promo/button0.png';
import button1 from '../../assets/Payment/Promo/button1.png';
import button2 from '../../assets/Payment/Promo/button2.png';
import button3 from '../../assets/Payment/Promo/button3.png';
import button4 from '../../assets/Payment/Promo/button4.png';
import button5 from '../../assets/Payment/Promo/button5.png';
import button6 from '../../assets/Payment/Promo/button6.png';
import button7 from '../../assets/Payment/Promo/button7.png';
import button8 from '../../assets/Payment/Promo/button8.png';
import button9 from '../../assets/Payment/Promo/button9.png';
import x from '../../assets/Payment/Promo/x.png';
import numx_click from '../../assets/Payment/Promo/numx_click.png';
import num0_click from '../../assets/Payment/Promo/num0_click.png';
import num1_click from '../../assets/Payment/Promo/num1_click.png';
import num2_click from '../../assets/Payment/Promo/num2_click.png';
import num3_click from '../../assets/Payment/Promo/num3_click.png';
import num4_click from '../../assets/Payment/Promo/num4_click.png';
import num5_click from '../../assets/Payment/Promo/num5_click.png';
import num6_click from '../../assets/Payment/Promo/num6_click.png';
import num7_click from '../../assets/Payment/Promo/num7_click.png';
import num8_click from '../../assets/Payment/Promo/num8_click.png';
import num9_click from '../../assets/Payment/Promo/num9_click.png';

function Cash() {
     const { t } = useTranslation();
     const navigate = useNavigate();
     const [hoveredImage, setHoveredImage] = useState(null);
     const [hoveredRedeem, setHoveredRedeem] = useState(null);
     const [redeemCode, setRedeemCode] = useState('');

     const handleMouseEnter = (image) => {
          setHoveredImage(image);
     }

     const handleMouseLeave = () => {
          setHoveredImage(null);
     }

     const handleRedeemEnter = (image) => {
          setHoveredRedeem(image);
     }

     const handleRedeemLeave = () => {
          setHoveredRedeem(null);
     }

     const handleRedeem = (buttonClick) => {
          if (buttonClick) {
               setRedeemCode(redeemCode + buttonClick);
          }
     }

     const handleBackspace = () => {
          setRedeemCode(redeemCode.slice(0, -1));
     }

     const redeemClick = () => {
          // Check redeem code
          navigate('/payment-result');
     }

     const checkReedeem = async () => {
          try {
               const deviceNumber = process.env.REACT_APP_DEVICE_NUMBER;
               const response = await fetch(`${process.env.REACT_APP_BACKEND}/cash/api/redeem?device=${deviceNumber}&code=${redeemCode}`);
               const paymentData = await response.json();
               if (paymentData.status === "Success") {
                    navigate("/payment-result");
               }
          } catch (error) {
               console.error(error);
          }
     }

     return (
          <div className='promo-container'>
               <div className="go-back" onClick={() => navigate("/payment")}></div>
               <div className="promo-form" style={{ backgroundImage: `url(${promo_form})` }}>
                    <div className="code-input" style={{ backgroundImage: `url(${promo_input})` }}></div>
                    <div className='code-input-code'>{redeemCode}</div>
                    <div className="redeem-button" style={{ backgroundImage: `url(${hoveredImage === redeem ? redeem_click : redeem})` }} onMouseEnter={() => handleMouseEnter(redeem)} onMouseLeave={handleMouseLeave} onClick={redeemClick}></div>
                    <div className="form-buttons">
                         <div className="form-button-container">
                              <div className="form-button" style={{ backgroundImage: `url(${hoveredImage === button1 ? num1_click : button1})` }} onMouseEnter={() => handleMouseEnter(button1)} onMouseLeave={handleMouseLeave} onClick={() => handleRedeem(1)}></div>
                              <div className="form-button" style={{ backgroundImage: `url(${hoveredImage === button2 ? num2_click : button2})` }} onMouseEnter={() => handleMouseEnter(button2)} onMouseLeave={handleMouseLeave} onClick={() => handleRedeem(2)}></div>
                              <div className="form-button" style={{ backgroundImage: `url(${hoveredImage === button3 ? num3_click : button3})` }} onMouseEnter={() => handleMouseEnter(button3)} onMouseLeave={handleMouseLeave} onClick={() => handleRedeem(3)}></div>
                         </div>
                         <div className="form-button-container">
                              <div className="form-button" style={{ backgroundImage: `url(${hoveredImage === button4 ? num4_click : button4})` }} onMouseEnter={() => handleMouseEnter(button4)} onMouseLeave={handleMouseLeave} onClick={() => handleRedeem(4)}></div>
                              <div className="form-button" style={{ backgroundImage: `url(${hoveredImage === button5 ? num5_click : button5})` }} onMouseEnter={() => handleMouseEnter(button5)} onMouseLeave={handleMouseLeave} onClick={() => handleRedeem(5)}></div>
                              <div className="form-button" style={{ backgroundImage: `url(${hoveredImage === button6 ? num6_click : button6})` }} onMouseEnter={() => handleMouseEnter(button6)} onMouseLeave={handleMouseLeave} onClick={() => handleRedeem(6)}></div>
                         </div>
                         <div className="form-button-container">
                              <div className="form-button" style={{ backgroundImage: `url(${hoveredImage === button7 ? num7_click : button7})` }} onMouseEnter={() => handleMouseEnter(button7)} onMouseLeave={handleMouseLeave} onClick={() => handleRedeem(7)}></div>
                              <div className="form-button" style={{ backgroundImage: `url(${hoveredImage === button8 ? num8_click : button8})` }} onMouseEnter={() => handleMouseEnter(button8)} onMouseLeave={handleMouseLeave} onClick={() => handleRedeem(8)}></div>
                              <div className="form-button" style={{ backgroundImage: `url(${hoveredImage === button9 ? num9_click : button9})` }} onMouseEnter={() => handleMouseEnter(button9)} onMouseLeave={handleMouseLeave} onClick={() => handleRedeem(9)}></div>
                         </div>
                         <div className="form-button-container">
                              <div className="form-button"></div>
                              <div className="form-button" style={{ backgroundImage: `url(${hoveredImage === button0 ? num0_click : button0})` }} onMouseEnter={() => handleMouseEnter(button0)} onMouseLeave={handleMouseLeave} onClick={() => handleRedeem('0')}></div>
                              <div className="form-button" style={{ backgroundImage: `url(${hoveredImage === x ? numx_click : x})` }} onMouseEnter={() => handleMouseEnter(x)} onMouseLeave={handleMouseLeave} onClick={() => handleBackspace()}></div>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default Cash;