import React, { useState } from 'react';
import { Card } from './Card.tsx';

export type Item = {
  id: string;
  giftName: string;
  description: string;
  previewImageUrl: string;
  weightage: number;
  rewardType: string;
};

type ColumnProps = {
  id: string;
  items: Item[];
  onDrop: (item: Item, fromColumnId: string, targetIndex: number) => void;
};

export const Column: React.FC<ColumnProps> = ({ id, items, onDrop }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const mouseY = event.clientY;
    const newIndex = calculateDropIndex(mouseY, items);
    setHoverIndex(newIndex);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const itemData = event.dataTransfer.getData('text/plain');
    const item: Item = JSON.parse(itemData);

    const targetIndex = hoverIndex ?? items.length;

    onDrop(item, id, targetIndex);
    setHoverIndex(null);
  };

  const handleDragLeave = () => {
    setHoverIndex(null);
  };

  const calculateDropIndex = (mouseY: number, items: Item[]): number => {
    for (let i = 0; i < items.length; i++) {
      const itemElement = document.getElementById(items[i].id);
      if (itemElement) {
        const rect = itemElement.getBoundingClientRect();
        if (mouseY < rect.top + rect.height / 2) {
          return i;
        }
      }
    }

    return items.length;
  };

  return (
    <>
      <div style={columnStyles.container}>
        <div
          className="custom-scrollbar"
          onDragOver={(e) => {
            handleDragOver(e);
            setIsDraggingOver(true);
          }}
          onDrop={(e) => {
            handleDrop(e);
            setIsDraggingOver(false);
          }}
          onDragLeave={() => {
            handleDragLeave();
            setIsDraggingOver(false);
          }}
          style={{
            ...columnStyles.dropZone,
            backgroundColor: isDraggingOver ? '#e3f2fd' : '#f8f9fa',
            transition: 'background-color 0.2s',
          }}
        >
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              {hoverIndex === index && <div style={columnStyles.dropIndicator} />}
              <div
                id={item.id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', JSON.stringify(item));
                  e.currentTarget.style.opacity = '0.5';
                }}
                onDragEnd={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
                style={columnStyles.itemContainer}
              >
                <Card
                  previewImageUrl={item.previewImageUrl}
                  title={item.giftName}
                  description={item.description}
                />
              </div>
            </React.Fragment>
          ))}
          {hoverIndex === items.length && <div style={columnStyles.dropIndicator} />}
        </div>
      </div>
    </>
  );
};

const columnStyles = {
  container: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  dropZone: {
    flex: 1,
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    height: '70vh',
    width: '100%',
    overflow: 'auto',
    backgroundColor: '#f8f9fa',
    padding: '12px',
    overflowY: 'auto',
    msOverflowStyle: 'none', // IE and Edge
    scrollbarWidth: 'thin', // Firefox
    scrollbarColor: '#c1c1c1 #f1f1f1', // Firefox
  } as React.CSSProperties,
  itemContainer: {
    padding: '8px',
    marginBottom: '8px',
    backgroundColor: '#ffffff',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    cursor: 'grab',
    height: '70px',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
    },
  },
  dropIndicator: {
    height: '3px',
    backgroundColor: '#2196f3',
    margin: '4px 0',
    borderRadius: '3px',
    transition: 'all 0.2s ease',
  },
};
