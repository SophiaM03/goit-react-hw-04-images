import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button.styled';
import { SearchBar } from './SearchBar/SearchBar';
import { Text } from './Text/Text.styled';
import { Loader } from './Loader/Loader';
import { fetchImagesQuery } from '../services/pixabayApi';
import { animateScroll } from 'react-scroll';

export function App() {
  const [value, setValue] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setStatus] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (!value) return;
    const getImages = () => {
      setStatus(true);
      fetchImagesQuery(value, pageNumber)
        .then(({ hits, totalHits }) => {
          if (hits.length === 0) {
            setShowBtn(false);
            setIsEmpty(true);
            return;
          }

          setImages(prevHits => [...prevHits, ...hits]);
          setShowBtn(pageNumber < Math.ceil(totalHits / 12));

          if (pageNumber !== 1) {
            animateScroll.scrollToBottom({
              duration: 200,
              smooth: 'linear',
            });
          }
        })
        .catch(error => {
          setError(error.message);
        })
        .finally(() => {
          setStatus(false);
        });
    };
    getImages();
  }, [value, pageNumber]);

  const onSubmit = value => {
    setValue(value);
    setPageNumber(1);
    setImages([]);
    setIsEmpty(false);
    setError(null);
  };
  const loadMore = () => {
    setPageNumber(pageNumber => pageNumber + 1);
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      <ImageGallery images={images} />
      {showBtn && (
        <Button type="button" onClick={loadMore}>
          Load more
        </Button>
      )}
      {isLoading && <Loader />}
      {error && <Text textAlign="center">{error}</Text>}
      {isEmpty && (
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      )}
    </>
  );
}
