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

     const handleMouseEnter = (image) => {
          setHoveredImage(image);
     }

     const handleMouseLeave = () => {
          setHoveredImage(null);
     }

     return (
          <div className='promo-container'>
               <div className="go-back" onClick={() => navigate("/payment")}></div>
               <div className="promo-form" style={{ backgroundImage: `url(${promo_form})` }}>
                    <div className="code-input" style={{ backgroundImage: `url(${promo_input})` }}></div>
                    <div className="redeem-button" style={{ backgroundImage: `url(${redeem})` }}></div>
                    <div className="form-buttons">
                         <div className="form-button-container">
                              <div className="form-button" style={{ backgroundImage: `url(${hoveredImage === button1 ? num1_click : button1})` }} onMouseEnter={() => handleMouseEnter(button1)} onMouseLeave={handleMouseLeave}></div>
                              <div className="form-button" style={{ backgroundImage: `url(${hoveredImage === button2 ? num2_click : button2})` }} onMouseEnter={() => handleMouseEnter(button2)} onMouseLeave={handleMouseLeave}></div>
                              <div className="form-button" style={{ backgroundImage: `url(${hoveredImage === button3 ? num3_click : button3})` }} onMouseEnter={() => handleMouseEnter(button3)} onMouseLeave={handleMouseLeave}></div>
                         </div>
                         <div className="form-button-container">
                              <div className="form-button" style={{ backgroundImage: `url(${hoveredImage === button4 ? num4_click : button4})` }} onMouseEnter={() => handleMouseEnter(button4)} onMouseLeave={handleMouseLeave}></div>
                              <div className="form-button" style={{ backgroundImage: `url(${hoveredImage === button5 ? num5_click : button5})` }} onMouseEnter={() => handleMouseEnter(button5)} onMouseLeave={handleMouseLeave}></div>
                              <div className="form-button" style={{ backgroundImage: `url(${hoveredImage === button6 ? num6_click : button6})` }} onMouseEnter={() => handleMouseEnter(button6)} onMouseLeave={handleMouseLeave}></div>
                         </div>
                         <div className="form-button-container">
                              <div className="form-button" style={{ backgroundImage: `url(${hoveredImage === button7 ? num7_click : button7})` }} onMouseEnter={() => handleMouseEnter(button7)} onMouseLeave={handleMouseLeave}></div>
                              <div className="form-button" style={{ backgroundImage: `url(${hoveredImage === button8 ? num8_click : button8})` }} onMouseEnter={() => handleMouseEnter(button8)} onMouseLeave={handleMouseLeave}></div>
                              <div className="form-button" style={{ backgroundImage: `url(${hoveredImage === button9 ? num9_click : button9})` }} onMouseEnter={() => handleMouseEnter(button9)} onMouseLeave={handleMouseLeave}></div>
                         </div>
                         <div className="form-button-container">
                              <div className="form-button"></div>
                              <div className="form-button" style={{ backgroundImage: `url(${hoveredImage === button0 ? num0_click : button0})` }} onMouseEnter={() => handleMouseEnter(button0)} onMouseLeave={handleMouseLeave}></div>
                              <div className="form-button" style={{ backgroundImage: `url(${hoveredImage === x ? numx_click : x})` }} onMouseEnter={() => handleMouseEnter(x)} onMouseLeave={handleMouseLeave}></div>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default Cash;