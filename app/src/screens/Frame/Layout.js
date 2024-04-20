import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../../translations/i18n';
import '../../css/Frame.css';
import Background from './Background';
import axios from 'axios';

// Import images
import confirm from '../../assets/Frame/Layout/confirm.png';
import confirm_click from '../../assets/Frame/Layout/confirm_click.png';

// Go Back
import goback_en from '../../assets/Common/goback.png';
import goback_en_hover from '../../assets/Common/gobackhover.png';
import goback_kr from '../../assets/Common/kr/goback.png';
import goback_kr_hover from '../../assets/Common/kr/gobackhover.png';
import goback_vn from '../../assets/Common/vn/goback.png';
import goback_vn_hover from '../../assets/Common/vn/gobackhover.png';

// Confirm
import confirm_en from '../../assets/Frame/Layout/confirm.png';
import confirm_en_hover from '../../assets/Frame/Layout/confirm_click.png';
import confirm_kr from '../../assets/Frame/Layout/Confirm/kr/confirm.png';
import confirm_kr_hover from '../../assets/Frame/Layout/Confirm/kr/confirm_click.png';
import confirm_vn from '../../assets/Frame/Layout/Confirm/vn/confirm.png';
import confirm_vn_hover from '../../assets/Frame/Layout/Confirm/vn/confirm_click.png';

function Layout() {
     const [layoutBackground, setLayoutBackground] = useState(null);
     const [layouts, setLayouts] = useState([]);
     const [clickedIndex, setClickedIndex] = useState(null);
     const [selectedFrame, setSelectedFrame] = useState(null);
     const [goBackBg, setGoBackBg] = useState([]);
     const [language, setLanguage] = useState(null);
     const [confirmButton, setConfirmButton] = useState(confirm_en);
     const [confirmHoverButton, setConfirmHoverButton] = useState(confirm_en_hover);
     const [confirmClick, setConfirmClick] = useState(false);

     const { t } = useTranslation();
     const navigate = useNavigate();

     useEffect(() => {
          const storedLanguage = sessionStorage.getItem('language');
          if (storedLanguage) {
               i18n.changeLanguage(storedLanguage);
               setLanguage(storedLanguage);
          }

          const frame = sessionStorage.getItem('selectedFrame');
          if (frame) {
               setSelectedFrame(JSON.parse(frame).frame);
          }

          const sessionStyleBg = sessionStorage.getItem('styleBg');
          if (sessionStyleBg) {
               let layoutBg = '';
               if (sessionStyleBg == 'Seasons') {
                    if (storedLanguage == 'ko') {
                         layoutBg = require(`../../assets/Frame/Layout/Seasons/kr/BG.png`);
                    } else if (storedLanguage == 'vi') {
                         layoutBg = require(`../../assets/Frame/Layout/Seasons/vn/BG.png`);
                    } else {
                         layoutBg = require(`../../assets/Frame/Layout/Seasons/BG.png`);
                    }
               } else if (sessionStyleBg == 'Party') {
                    if (storedLanguage == 'ko') {
                         layoutBg = require(`../../assets/Frame/Layout/Party/kr/BG.png`);
                    } else if (storedLanguage == 'vi') {
                         layoutBg = require(`../../assets/Frame/Layout/Party/vn/BG.png`);
                    } else {
                         layoutBg = require(`../../assets/Frame/Layout/Party/BG.png`);
                    }
               } else if (sessionStyleBg == 'Cartoon') {
                    if (storedLanguage == 'ko') {
                         layoutBg = require(`../../assets/Frame/Layout/Cartoon/kr/BG.png`);
                    } else if (storedLanguage == 'vi') {
                         layoutBg = require(`../../assets/Frame/Layout/Cartoon/vn/BG.png`);
                    } else {
                         layoutBg = require(`../../assets/Frame/Layout/Cartoon/BG.png`);
                    }
               } else if (sessionStyleBg == 'Minimalism') {
                    if (storedLanguage == 'ko') {
                         layoutBg = require(`../../assets/Frame/Layout/Minimalism/kr/BG.png`);
                    } else if (storedLanguage == 'vi') {
                         layoutBg = require(`../../assets/Frame/Layout/Minimalism/vn/BG.png`);
                    } else {
                         layoutBg = require(`../../assets/Frame/Layout/Minimalism/BG.png`);
                    }
               } else if (sessionStyleBg == 'Collab') {
                    if (storedLanguage == 'ko') {
                         layoutBg = require(`../../assets/Frame/Layout/Collab/kr/BG.png`);
                    } else if (storedLanguage == 'vi') {
                         layoutBg = require(`../../assets/Frame/Layout/Collab/vn/BG.png`);
                    } else {
                         layoutBg = require(`../../assets/Frame/Layout/Collab/BG.png`);
                    }
               }
               setLayoutBackground(layoutBg);
          }

          if (storedLanguage === 'en') {
               setGoBackBg(goback_en);
               setConfirmButton(confirm_en);
               setConfirmHoverButton(confirm_en_hover);
          } else if (storedLanguage === 'ko') {
               setGoBackBg(goback_kr);
               setConfirmButton(confirm_kr);
               setConfirmHoverButton(confirm_kr_hover);
          } else if (storedLanguage === 'vi') {
               setGoBackBg(goback_vn);
               setConfirmButton(confirm_vn);
               setConfirmHoverButton(confirm_vn_hover);
          }
     }, []);

     useEffect(() => {
          const fetchLayoutsByBackground = async () => {
               try {
                    const frame = sessionStorage.getItem('selectedFrame');
                    const response = await axios.get(`${process.env.REACT_APP_BE_PROD}/layouts/api/by-background/` + sessionStorage.getItem('styleBg') + '/frame/' + JSON.parse(frame).frame);
                    const layoutDatas = response.data
                    const newBackgrounds = layoutDatas.map(item => ({
                         title: item.title,
                         photo: process.env.REACT_APP_BE_PROD + item.photo,
                         photo_cover: process.env.REACT_APP_BE_PROD + item.photo_cover,
                         photo_full: process.env.REACT_APP_BE_PROD + item.photo_full
                    }));
                    setLayouts(newBackgrounds);
               } catch (error) {
                    console.error(error)
               }
          }

          fetchLayoutsByBackground()
     }, []);

     const handleClick = (index) => {
          sessionStorage.setItem('selectedLayout', JSON.stringify(layouts[index]));
          setClickedIndex(index === clickedIndex ? null : index);
          setConfirmClick(confirmButton)
     }

     const goToPayment = () => {
          if (confirmClick === confirmButton) {
               navigate('/payment');
          }
     }

     const hoverGoBackBtn = (goBackBG) => {
          if (goBackBG === 'ko') {
               setGoBackBg(goBackBg === goback_kr ? goback_kr_hover : goback_kr);
          } else if (goBackBG === 'vi') {
               setGoBackBg(goBackBg === goback_vn ? goback_vn_hover : goback_vn);
          } else {
               setGoBackBg(goBackBg === goback_en ? goback_en_hover : goback_en);
          }
     }

     return (
          <div className='layout-container' style={{ backgroundImage: `url(${layoutBackground})` }}>
               <div className="go-back" style={{ backgroundImage: `url(${goBackBg})` }} onClick={() => navigate("/background")} onMouseEnter={() => hoverGoBackBtn(language)} onMouseLeave={() => hoverGoBackBtn(language)}></div>
               <div className="style-section">
                    {layouts.map((item, index) => (
                         <div key={item.id} className="style-column">
                              <div className="image-style-div">
                                   <div className={`${selectedFrame === '2cut-x2' || selectedFrame === '4-cutx2' ? 'layout-overlay-cut' : 'layout-overlay'} ${index === clickedIndex ? 'clicked' : ''}`} style={{ backgroundImage: `url(${item.photo_full})` }} onClick={() => handleClick(index)}></div>
                              </div>
                         </div>
                    ))}
               </div>
               <div
                    className="confirm-layout-button"
                    style={{ backgroundImage: `url(${confirmClick === confirmButton ? confirmHoverButton : confirmButton})` }}
                    onClick={goToPayment}
               ></div>
          </div>
     );
};

export default Layout;