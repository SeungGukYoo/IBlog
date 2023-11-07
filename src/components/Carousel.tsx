import { useState } from 'react';
const IMAGE_1_URL =
  'https://plus.unsplash.com/premium_photo-1698496965873-47fa718a6f26?auto=format&fit=crop&q=80&w=3203&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const IMAGE_2_URL =
  'https://images.unsplash.com/photo-1695653422718-48c2cc37caf7?auto=format&fit=crop&q=80&w=3174&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const IMAGE_3_URL =
  'https://plus.unsplash.com/premium_photo-1684958840276-f597017d350f?auto=format&fit=crop&q=80&w=2972&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
function Carousel() {
  const [activeImage, setActiveImage] = useState(1);
  return (
    <div>
      <div className="carousel">
        <ul className="carousel__slides">
          <input type="radio" name="radio-button" id="img-1" checked={activeImage === 1} readOnly />
          <li className="carousel__slide-container">
            <div className="carousel__slide-img">
              <img src={IMAGE_1_URL} alt="scenery 2" />
            </div>
            <div className="carousel__controls">
              <label onClick={() => setActiveImage(3)} className="carousel__slide-prev">
                &lsaquo;
              </label>
              <label onClick={() => setActiveImage(2)} className="carousel__slide-next">
                &rsaquo;
              </label>
            </div>
          </li>
          <input type="radio" name="radio-button" id="img-2" checked={activeImage === 2} readOnly />
          <li className="carousel__slide-container">
            <div className="carousel__slide-img">
              <img src={IMAGE_2_URL} alt="scenery 3" />
            </div>
            <div className="carousel__controls">
              <label onClick={() => setActiveImage(1)} className="carousel__slide-prev">
                &lsaquo;
              </label>
              <label onClick={() => setActiveImage(3)} className="carousel__slide-next">
                &rsaquo;
              </label>
            </div>
          </li>
          <input type="radio" name="radio-button" id="img-3" checked={activeImage === 3} readOnly />
          <li className="carousel__slide-container">
            <div className="carousel__slide-img">
              <img src={IMAGE_3_URL} alt="scenery 3" />
            </div>
            <div className="carousel__controls">
              <label onClick={() => setActiveImage(2)} className="carousel__slide-prev">
                &lsaquo;
              </label>
              <label onClick={() => setActiveImage(1)} className="carousel__slide-next">
                &rsaquo;
              </label>
            </div>
          </li>
          <div className="carousel__dots">
            <label
              onClick={() => setActiveImage(1)}
              className="carousel__dot"
              id="img-dot-1"
            ></label>
            <label
              onClick={() => setActiveImage(2)}
              className="carousel__dot"
              id="img-dot-2"
            ></label>
            <label
              onClick={() => setActiveImage(3)}
              className="carousel__dot"
              id="img-dot-3"
            ></label>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Carousel;
