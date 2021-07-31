import React from "react";
import '../assets/styles/components/Carousel.scss'
import { Link } from "react-router-dom";

const Carousel = ({ children, title, user}) => {
  return (
    title
      ? <section className="carousel">
          <h3 className="carousel__title">{title}</h3>
          <div className="carousel__container">{children}</div>
        </section>
      //--------------------------------------------------------------//  
      : <section className="carousel">
          <h3 className="carousel__title">
            {
              user.favoriteMovies.length 
                ? <>Lista de favoritos de <Link to={`/users/${user.id}/info`}>{user.name}</Link></>
                : `${user.name} no tiene películas en sus favoritos.`
            }
          </h3>
          <div className="carousel__container">{children}</div>
        </section>
  );
};

export default Carousel;
