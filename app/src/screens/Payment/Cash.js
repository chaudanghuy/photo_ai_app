import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../../translations/i18n';
import "../../css/Payment.css";
import done from '../../assets/Payment/Cash/done.png';
import done_click from '../../assets/Payment/Cash/done_click.png';
import axios from 'axios';

function Cash() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [hoveredImage, setHoveredImage] = useState(null);
  const [orderCode, setOrderCode] = useState(null);
  const [amountToPay, setAmountToPay] = useState(0);
  const [insertedMoney, setInsertedMoney] = useState(0);

  useEffect(() => {
    const startCashPayment = async () => {
      try {
        const requestOptions = {
          method: "POST",
          redirect: "follow"
        };

        fetch("http://127.0.0.1:8002/api/start/", requestOptions)
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.error(error));
      } catch (error) {
        console.error(error);
      }
    }

    startCashPayment();
  }, []);

  useEffect(() => {
    const fetchCashPayment = async () => {
      try {
        const deviceNumber = process.env.REACT_APP_DEVICE_NUMBER;
        const framePrice = sessionStorage.getItem('framePrice');
        setAmountToPay(framePrice);

        const response = await fetch(`${process.env.REACT_APP_BACKEND}/payments/api/cash/create?device=${deviceNumber}&amount=${framePrice}`)

        const responseData = await response.json();
        console.log(responseData);
        if (responseData) {
          console.log(responseData.order_code);
          setOrderCode(responseData.order_code);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (!orderCode) {
      fetchCashPayment();
    }
  }, []);

  useEffect(() => {
    const checkPaymentStatus = async (orderCodeNum) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/payments/api/cash/webhook?order=${orderCodeNum}`)
        const responseData = await response.json();
        setInsertedMoney(responseData.total_money);  
        if (parseInt(responseData.total_money) >= parseInt(amountToPay)) {
          setHoveredImage(done);
        }      
      } catch (error) {
        console.error(error);
      }
    }

    const intervalId = setInterval(() => {
      if (orderCode) {
        checkPaymentStatus(orderCode);
      }
    }, 3000);

    return () => {
      clearInterval(intervalId);
    }
  })

  const continuePay = () => {
    if (orderCode) {
      if (parseInt(insertedMoney) >= parseInt(amountToPay)) {
        axios.post(
          `${process.env.REACT_APP_BACKEND}/payments/api/cash/stop`,
          {}
        );
        navigate("/payment-result");
      }
    }
  }

  const handleMouseEnter = (image) => {
    setHoveredImage(image);
  }

  const handleMouseLeave = () => {
    setHoveredImage(null);
  }

  return (
    <div className='cash-container'>
      <div className="go-back" onClick={() => navigate("/payment")}></div>
      <div className="paid-cash">
        <div className="paid-cash-text">{amountToPay}</div>
      </div>
      <div className="insert-cash">
        <div className="insert-cash-text">{insertedMoney}</div>
      </div>
      <div style={{ backgroundImage: `url(${hoveredImage === done ? done_click : done})` }} className="done-button" onClick={continuePay}></div>
    </div>
  );
}

export default Cash;