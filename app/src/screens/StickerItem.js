import useImage from "use-image";
import React, { useState, useEffect, useRef } from "react";
import { Image as KonvaImage, Group, Rect, Transformer } from 'react-konva';
import { useHoverDirty, useLongPress } from 'react-use';
import cancelImage from "../assets/Sticker/items/cancel.png";

export const StickerItem = ({ image, onDelete, onDragEnd, isSelected, onSelect, onChange }) => {
    const imageRef = useRef(null);
    const isHovered = useHoverDirty(imageRef);
    const [stickerImage] = useImage(image.src);
    const [deleteImage] = useImage(cancelImage);
    const [showDeleteButton, setShowDeleteButton] = useState(false);

    const trRef = useRef();

    React.useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([imageRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    const onLongPress = () => {
        setShowDeleteButton(true);
    }

    image.resetButtonRef.current = () => {
        setShowDeleteButton(false);
    }

    const longPressEvent = useLongPress(onLongPress, {
        delay: 200
    });
    const [isDragging, setIsDragging] = useState(false);

    const stickerWidth = image.width;
    const stickerHeight = stickerImage ? (image.width * stickerImage.height) / stickerImage.width : 0;

    useEffect(() => {
        if (isHovered) {
            setShowDeleteButton(true);
        } else {
            setTimeout(() => {
                setShowDeleteButton(false);
            }, 2000);
        }
    }, [isHovered]);

    return (
        <Group
            draggable
            x={image.x}
            y={image.y}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(event) => {
                setIsDragging(false);
                onDragEnd(event);
            }}
        >
            <KonvaImage
                ref={imageRef}
                width={image.width}
                height={stickerHeight}
                image={stickerImage}
                {...longPressEvent}
                onClick={onSelect}
                onTap={onSelect}
                {...stickerImage}
                onDragEnd={(event) => {
                    onChange({
                        ...stickerImage,
                        x: event.target.x(),
                        y: event.target.y()
                    });
                }}
                onTransformEnd={(e) => {
                    // transformer is changing scale
                    const node = imageRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    // we will reset it back
                    // node.scaleX(1);
                    // node.scaleY(1);
                    // onChange({
                    //     ...image,
                    //     x: node.x(),
                    //     y: node.y(),
                    //     // set minimal value
                    //     width: Math.max(5, node.width() * scaleX),
                    //     height: Math.max(node.height() * scaleY)
                    // })
                }}
            />
            {isSelected && !isDragging && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
            {showDeleteButton && !isDragging && (
                <KonvaImage
                    onTouchStart={onDelete}
                    onClick={onDelete}
                    image={deleteImage}
                    width={25}
                    height={25}
                    offsetX={-stickerWidth / 2 - 50}
                />
            )}
        </Group>
    )
}