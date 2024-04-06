import React, { useEffect, useState, createRef, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../translations/i18n';
import "../css/Sticker.css";
import frame from '../assets/Sticker/frame.png';
import sticker_frame from '../assets/Sticker/sticker_frame.png';
import sticker_taskbar from '../assets/Sticker/sticker_taskbar.png';
import mood from '../assets/Sticker/mood.png';
import lovely from '../assets/Sticker/lovely.png';
import cartoon from '../assets/Sticker/cartoon.png';
import y2k from '../assets/Sticker/y2k.png';
import print from '../assets/Sticker/print.png';
import { Image as KonvaImage, Layer, Stage, Rect, Transformer } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';
import { StickerItem } from '../screens/StickerItem';
import backgroundImg from '../assets/Sticker/items/testSample.jpg';
import html2canvas from 'html2canvas';


function Filter() {
     const { t } = useTranslation();
     const navigate = useNavigate();
     const [hoveredImage, setHoveredImage] = useState(null);
     const [selectedLayout, setSelectedLayout] = useState(null);
     const [selectedPhotos, setSelectedPhotos] = useState([]);
     const [filterEffect, setFilterEffect] = useState(null);
     const [myBackground, setMyBackground] = useState(null);
     const [selectedFrame, setSelectedFrame] = useState(null);
     const [stickersData, setStickersData] = useState([]);
     
     const [images, setImages] = useState([]);
     const [selectedId, selectShape] = useState(null);
     const [background] = useImage(sessionStorage.getItem('downloaded-image'));

     const [selectedCategory, setSelectedCategory] = useState('MOOD');

     const stageRef = useRef(null);

     const chunkArray = (arr, size) => {
          return arr.reduce((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), []);
     };

     const photos = JSON.parse(sessionStorage.getItem('photos'));

     useEffect(() => {
          const storedLanguage = sessionStorage.getItem('language');
          if (storedLanguage) {
               i18n.changeLanguage(storedLanguage);
          }

          // get session storage selectedLayout
          const sessionSelectedLayout = sessionStorage.getItem('selectedLayout');
          if (sessionSelectedLayout) {
               const parsedSelectedLayout = JSON.parse(sessionSelectedLayout);
               setSelectedLayout(parsedSelectedLayout.photo_cover);
               setMyBackground(parsedSelectedLayout.photo);
          }

          // Retrieve selected photos from session storage
          const storedSelectedPhotos = JSON.parse(sessionStorage.getItem('choosePhotos'));
          if (storedSelectedPhotos) {
               setSelectedPhotos(storedSelectedPhotos);
          }

          // Filter
          const filterSession = sessionStorage.getItem('filter');
          if (filterSession) {
               setFilterEffect(filterSession);
          }

          // Retrieve selected frame from session storage
          const storedSelectedFrame = JSON.parse(sessionStorage.getItem('selectedFrame'));
          if (storedSelectedFrame) {
               setSelectedFrame(storedSelectedFrame.frame);
          }
     }, []);

     useEffect(() => {
          const fetchStickers = async () => {
               try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND}/stickers/api?category=${selectedCategory}`);
                    const data = await response.json();
                    const newStickersData = data.map(item => ({
                         title: item.title,
                         category: item.category,
                         photo: process.env.REACT_APP_BACKEND + item.photo
                    }))

                    // Default filter newStickerData by selectedCatego
                    setStickersData(newStickersData);                    
               } catch (error) {
                    console.error(error);
               }
          };  

          fetchStickers();        
     }, [selectedCategory]);

     const handleMouseEnter = (image) => {
          setHoveredImage(image);
     }

     const handleMouseLeave = () => {
          setHoveredImage(null);
     }

     const displayClassNameForBackground = () => {
          if (selectedFrame == '2cut-x2') {
               return 'left-choose-photos-2cut';
          } else if (selectedFrame == '4-cutx2') {
               return 'left-choose-photos-4cut';
          } else if (selectedFrame == '5-cutx2') {
               return 'left-choose-photos-5cut';
          } else {
               return 'left-choose-photos';
          }
     }

     const getImageStyle = () => {
          return filterEffect;
     }

     const displayClassNameForLayout = () => {
          if (selectedFrame == '2cut-x2') {
               return 'left-choose-container-2cut';
          } else if (selectedFrame == '4-cutx2') {
               return 'left-choose-container-4cut';
          } else if (selectedFrame == '5-cutx2') {
               return 'left-choose-container-5cut';
          } else {
               return 'left-choose-container';
          }
     }

     const displayClassNameForPhoto = (rowIndex, photoIndex) => {
          if (selectedFrame === 'Stripx2' || selectedFrame === '6-cutx2') {
               if (rowIndex === 0 && photoIndex === 0) {
                    return 'choose-photo-item-0-0';
               } else if (rowIndex === 0 && photoIndex === 1) {
                    return 'choose-photo-item-0-1';
               } else if (rowIndex === 1 && photoIndex === 0) {
                    return 'choose-photo-item-1-0';
               } else if (rowIndex === 1 && photoIndex === 1) {
                    return 'choose-photo-item-1-1';
               } else if (rowIndex === 2 && photoIndex === 0) {
                    return 'choose-photo-item-2-0';
               } else if (rowIndex === 2 && photoIndex === 1) {
                    return 'choose-photo-item-2-1';
               } else if (rowIndex === 3 && photoIndex === 0) {
                    return 'choose-photo-item-3-0';
               } else if (rowIndex === 3 && photoIndex === 1) {
                    return 'choose-photo-item-3-1';
               }
          } else if (selectedFrame === '2cut-x2') {
               if (rowIndex === 0 && photoIndex === 0) {
                    return 'choose-photo-item-2cut-0-0';
               } else if (rowIndex === 0 && photoIndex === 1) {
                    return 'choose-photo-item-2cut-0-1';
               }
          } else if (selectedFrame === '3-cutx2') {
               if (rowIndex === 0 && photoIndex === 0) {
                    return 'choose-photo-item-3cut-0-0';
               } else if (rowIndex === 0 && photoIndex === 1) {
                    return 'choose-photo-item-3cut-0-1';
               } else if (rowIndex === 1 && photoIndex === 0) {
                    return 'choose-photo-item-3cut-0-1';
               }
          } else if (selectedFrame === '4-cutx2') {
               if (rowIndex === 0 && photoIndex === 0) {
                    return 'choose-photo-item-4cut-0-0';
               } else if (rowIndex === 0 && photoIndex === 1) {
                    return 'choose-photo-item-4cut-0-1';
               } else if (rowIndex === 1 && photoIndex === 0) {
                    return 'choose-photo-item-4cut-1-0';
               } else if (rowIndex === 1 && photoIndex === 1) {
                    return 'choose-photo-item-4cut-1-1';
               }
          } else if (selectedFrame === '5-cutx2') {
               if (rowIndex === 0 && photoIndex === 0) {
                    return 'choose-photo-item-5cut-0-0';
               } else if (rowIndex === 0 && photoIndex === 1) {
                    return 'choose-photo-item-5cut-0-1';
               } else if (rowIndex === 1 && photoIndex === 0) {
                    return 'choose-photo-item-5cut-1-0';
               } else if (rowIndex === 1 && photoIndex === 1) {
                    return 'choose-photo-item-5cut-1-1';
               }
          }
          return 'choose-photo-item';
     }

     const showSelectedPhotos = () => {
          if (selectedFrame == '3-cutx2' && selectedPhotos.length > 1) {
               const firstPhotoTpl = (
                    <div className="choose-photo-row">
                         <div
                              className="choose-photo-item-3cut-top-line"
                              style={{ backgroundImage: `url(${photos[selectedPhotos[0]].url})` }}
                         />
                    </div>
               )
               const selectedPhotoRows = chunkArray(selectedPhotos.slice(1), 2);
               return (
                    [firstPhotoTpl, ...selectedPhotoRows.map((row, rowIndex) => (
                         <div key={rowIndex} className="choose-photo-row">
                              {row.map((selectedIndex, photoIndex) => (
                                   <div
                                        key={photoIndex}
                                        className={displayClassNameForPhoto(rowIndex, photoIndex)}
                                        style={{ backgroundImage: `url(${photos[selectedIndex].url})` }}
                                   />
                              ))}
                         </div>
                    ))]
               );
          } else if (selectedFrame == '5-cutx2' && selectedPhotos.length > 1) {
               const lastPhotoTpl = (
                    <div className="choose-photo-row">
                         <div
                              className="choose-photo-item-5cut-last-line"
                              style={{ backgroundImage: `url(${photos[selectedPhotos[selectedPhotos.length - 1]].url})` }}
                         />
                    </div>
               )
               const selectedPhotoRows = chunkArray(selectedPhotos.slice(0, selectedPhotos.length - 1), 2);
               return (
                    [selectedPhotoRows.map((row, rowIndex) => (
                         <div key={rowIndex} className="choose-photo-row">
                              {row.map((selectedIndex, photoIndex) => (
                                   <div
                                        key={photoIndex}
                                        className={displayClassNameForPhoto(rowIndex, photoIndex)}
                                        style={{ backgroundImage: `url(${photos[selectedIndex].url})` }}
                                   />
                              ))}
                         </div>
                    )), lastPhotoTpl]
               );
          } else {
               const selectedPhotoRows = chunkArray(selectedPhotos, 2);
               return (
                    selectedPhotoRows.map((row, rowIndex) => (
                         <div key={rowIndex} className="choose-photo-row">
                              {row.map((selectedIndex, photoIndex) => (
                                   <div
                                        key={photoIndex}
                                        className={displayClassNameForPhoto(rowIndex, photoIndex)}
                                        style={{ backgroundImage: `url(${photos[selectedIndex].url})`, filter: getImageStyle() }}
                                   />
                              ))}
                         </div>
                    ))
               );
          }
     }

     const addStickerToPanel = ({ src, width, x, y }) => {
          setImages((currentImages) => [
               ...currentImages,
               {
                    width,
                    x,
                    y,
                    src,
                    resetButtonRef: createRef()
               }
          ]);
     };

     const resetAllButtons = useCallback(() => {
          images.forEach((image) => {
               if (image.resetButtonRef.current) {
                    image.resetButtonRef.current();
               }
          });
     }, [images]);

     const handleCanvasClick = useCallback(
          (event) => {
               if (event.target.attrs.id === "backgroundImage") {
                    resetAllButtons();
               }
          },
          [resetAllButtons]
     );

     const checkDeselect = (e) => {
          const clickedOnEmpty = e.target === e.target.getStage();
          if (clickedOnEmpty) {
               selectShape(null);
          }
     }     

     const filterStickerByCategory = (category) => {
          setSelectedCategory(category);     
     }

     const printFrameWithSticker = () => {
          const uri = stageRef.current.toDataURL();
          var link = document.createElement('a');
          link.download = 'stage.png';
          link.href = uri;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
     }

     // Chunk the selected photos array into arrays of 2 photos each
     const selectedPhotoRows = chunkArray(selectedPhotos, 2);
     
     const myStickers = chunkArray(stickersData, 4);
     return (
          <div className='sticker-container'>
               <div className="go-back" onClick={() => navigate("/filter")}></div>
               <div className="left-sticker">
                    <Stage
                         width={1000}
                         height={800}
                         onClick={handleCanvasClick}
                         onTap={handleCanvasClick}
                         className="konva-image"
                         onMouseDown={checkDeselect}
                         onTouchStart={checkDeselect}
                         ref={stageRef}
                    >
                         <Layer>
                              <KonvaImage
                                   image={background}
                                   height={800}
                                   width={1000}
                                   id="backgroundImage"
                              />
                              {images.map((image, i) => {
                                   return (
                                        <StickerItem
                                             onDelete={() => {
                                                  const newImages = [...images];
                                                  newImages.splice(i, 1);
                                                  setImages(newImages);
                                             }}
                                             onDragEnd={(event) => {
                                                  image.x = event.target.x();
                                                  image.y = event.target.y();
                                             }}
                                             key={i}
                                             image={image}
                                             shapeProps={image}
                                             isSelected={image.id === selectedId}
                                             onSelect={() => {
                                                  selectShape(image.id)
                                             }}
                                             onChange={(newAttrs) => {
                                                  const newImages = [...images];
                                                  newImages[i] = newAttrs;
                                                  setImages(newImages);
                                             }}
                                        />
                                   );
                              })}
                         </Layer>
                    </Stage>
               </div>
               <div className="middle-sticker" style={{ backgroundImage: `url(${sticker_frame})` }}>
                    {myStickers.map((group, index) => (
                         <div key={index} className={index === 0 ? 'sticker-line-1' : 'sticker-line'}>
                              {group.map((mySticker, photoIndex) => (
                                   <div
                                        key={photoIndex}
                                        className="sticker"  
                                        onClick={() => {
                                             addStickerToPanel({
                                                  src: mySticker.photo,
                                                  width: 100,
                                                  x: 500,
                                                  y: 500
                                             });
                                        }}                                                                         
                                   >
                                        <img className="sticker-image" alt={mySticker.title} src={mySticker.photo} width='140px' height='140px'/>
                                   </div>
                              ))}
                         </div>
                    ))}                                        
               </div>
               <div className="right-sticker" style={{ backgroundImage: `url(${sticker_taskbar})` }}>
                    <div className="sticker-category">
                         <div className="sticker-category-item" style={{ backgroundImage: `url(${mood})` }} onClick={() => filterStickerByCategory('MOOD')}></div>
                         <div className="sticker-category-item" style={{ backgroundImage: `url(${lovely})` }} onClick={() => filterStickerByCategory('LOVELY')}></div>
                         <div className="sticker-category-item" style={{ backgroundImage: `url(${cartoon})` }} onClick={() => filterStickerByCategory('CARTOON')}></div>
                         <div className="sticker-category-item" style={{ backgroundImage: `url(${y2k})` }} onClick={() => filterStickerByCategory('Y2K')}></div>
                    </div>
                    <div className="sticker-print-btn" onClick={printFrameWithSticker}></div>
               </div>
          </div>
     );
}

export default Filter;