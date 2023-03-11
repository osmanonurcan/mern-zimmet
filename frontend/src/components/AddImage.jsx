import ImageUploading from "react-images-uploading";
import styled from "styled-components";

export const AddImage = ({ image, onImageChange }) => {
  return (
    <div>
      <h3>Image</h3>
      <ImageUploading
        value={image}
        onChange={onImageChange}
        dataURLKey="data_url"
        acceptType={["jpg", "jpeg"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <>
            <ClickDropContainer>
              {imageList.length < 1 ? (
                <ClickDrop
                  isDragging={isDragging}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here
                </ClickDrop>
              ) : (
                <ImageContainer>
                  <img src={imageList[0].data_url} alt="device" />
                  <div>
                    <button onClick={() => onImageRemove(0)}>
                      <AiOutlineClose />
                    </button>
                  </div>
                </ImageContainer>
              )}
            </ClickDropContainer>
          </>
        )}
      </ImageUploading>
    </div>
  );
};

// STYLED COPMPONENTS

const ClickDropContainer = styled.div`
  height: 10rem;
  width: 100%;
  background-color: ${({ theme }) => theme.card};
  margin: auto;
`;

const ClickDrop = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  outline: 5px dashed
    ${({ isDragging, theme }) => (isDragging ? theme.text : theme.body)};
  outline-offset: -1rem;
  transition: all 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  img {
    height: 10rem;
    width: 100%;
    object-fit: contain;
  }
  button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    border: 1px solid ${({ theme }) => theme.text};
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 0.3rem;

    color: ${({ theme }) => theme.text};
  }
`;
