import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import i18n from '../../translations/i18n';
import '../../css/Payment.css';

function QR() {
     const { t } = useTranslation();
     const navigate = useNavigate();
     const [selectedSquare, setSelectedSquare] = useState(null);

     const handleItemClick = (item, index) => {
          setSelectedSquare(index);
          navigate(item.url);
     }

     return (
          <div className='qr-container'>
               <div className="go-back"></div>
          </div>
     );
}

export default QR;