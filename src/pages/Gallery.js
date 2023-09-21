import React, { useState, useEffect } from 'react';
import Art1 from "../assets/images/arts/Art1.jpg";
import Art2 from "../assets/images/arts/Art2.jpg";
import Art3 from "../assets/images/arts/Art3.jpg";
import Art4 from "../assets/images/arts/Art4.jpg";
import Art5 from "../assets/images/arts/Art5.jpg";
import Art6 from "../assets/images/arts/Art6.jpg";
import Art7 from "../assets/images/arts/Art7.jpg";
import Art8 from "../assets/images/arts/Art8.jpg";
import Art9 from "../assets/images/arts/Art9.jpg";
import Art10 from "../assets/images/arts/Art10.jpg";
import Nature1 from '../assets/images/nature/nature1.jpg';
import Nature2 from '../assets/images/nature/nature2.jpg';
import Nature3 from '../assets/images/nature/nature3.jpg';
import Nature4 from '../assets/images/nature/nature4.jpg';
import Nature5 from '../assets/images/nature/nature5.jpg';
import Nature6 from '../assets/images/nature/nature6.jpg';
import Nature7 from '../assets/images/nature/nature7.jpg';
import Nature8 from '../assets/images/nature/nature8.jpg';
import Nature9 from '../assets/images/nature/nature9.jpg';
import Nature10 from '../assets/images/nature/nature10.jpg';
import { useDrag, useDrop } from 'react-dnd';
import styled from 'styled-components';
import './gallery.css'

const imageData = [
  {
    id: "1",
    src: Art1,
    tags: ["art", "museum"],
  },

  {
    id: "2",
    src: Art2,
    tags: ["art", "museum"],
  },

  {
    id: "3",
    src: Art3,
    tags: ["art", "museum"],
  },

  {
    id: "4",
    src: Art4,
    tags: ["art", "museum"],
  },

  {
    id: "5",
    src: Art5,
    tags: ["art", "museum"],
  },

  {
    id: "6",
    src: Art6,
    tags: ["art", "museum"],
  },

  {
    id: "7",
    src: Art7,
    tags: ["art", "museum"],
  },

  {
    id: "8",
    src: Art8,
    tags: ["art", "museum"],
  },

  {
    id: "9",
    src: Art9,
    tags: ["art", "museum"],
  },

  {
    id: "10",
    src: Art10,
    tags: ["art", "museum"],
  },
  
  {
    id: 11,
    src: Nature1,
    tags: ['nature', 'landscape']
  },
  {
    id: 12,
    src: Nature2,
    tags: ['nature', 'portrait']
  },
  {
    id: 13,
    src: Nature3,
    tags: ['nature', 'portrait']
  },
  {
    id: 14,
    src: Nature4,
    tags: ['nature', 'landscape']
  },
  {
    id: 15,
    src: Nature5,
    tags: ['nature', 'landscape']
  },
  {
    id: 16,
    src: Nature6,
    tags: ['nature', 'landscape']
  },
  {
    id: 17,
    src: Nature7,
    tags: ['nature', 'landscape']
  },
  {
    id: 18,
    src: Nature8,
    tags: ['nature', 'landscape']
  },
  {
    id: 19,
    src: Nature9,
    tags: ['nature', 'landscape']
  },
  {
    id: 20,
    src: Nature10,
    tags: ['nature', 'landscape']
  },
];

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
  margin-top: 50px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const GalleryItem = ({ image, index, moveImage }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'IMAGE',
    item: { id: image.id, index },
  });

  const [, drop] = useDrop({
    accept: 'IMAGE',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveImage(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      className={`gallery-item ${isDragging ? 'dragging' : ''}`}
      ref={(node) => drag(drop(node))}
    >
      <img src={image.src} alt={`Item ${image.id}`} />
      <div className="tags">
        {image.tags.map((tag, tagIndex) => (
          <span key={tag} className="tag">
            {tagIndex > 0 && ' '}
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setImages(imageData)
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const moveImage = (dragIndex, hoverIndex) => {
    const updatedImages = [...images];
    const draggedImage = updatedImages[dragIndex];

    updatedImages.splice(dragIndex, 1);
    updatedImages.splice(hoverIndex, 0, draggedImage);

    setImages(updatedImages);
  };

  return (
    <div>
      <h1 className="headerText">Image Gallery</h1>
      <input
        type="text"
        placeholder="Search by tag"
        value={searchQuery}
        onChange={handleSearch}
      />
      {loading ? (
        <Spinner />
      ) : (
        <div className="gallery-grid">
          {images
            .filter(image =>
              image.tags.some(tag => tag.includes(searchQuery.toLowerCase()))
            )
            .map((image, index) => (
              <GalleryItem
                key={image.id}
                image={image}
                index={index}
                moveImage={moveImage}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;