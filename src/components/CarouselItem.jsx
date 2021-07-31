import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'
import playIcon from '../assets/static/play-icon.png'
import plusIcon from '../assets/static/plus-icon.png'
import removeIcon from '../assets/static/remove-icon.png'
import '../assets/styles/components/CarouselItem.scss'
import { getFavoriteMovies, setFavoriteMovies } from '../redux/favoriteMovies'
import { getSpecificMovie, setSelectedMovie } from '../redux/movies'
import generateAxios from '../utils/generateAxios'

const CarouselItem = (props) => {
  const { Title, Year, imdbID, Poster, isUserList} = props
  const history = useHistory()
  const dispatch = useDispatch()
  const match = useRouteMatch()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const favoriteMovies = useSelector(state => state.favoriteMovies)
  /* console.log("props -->", props) */

  //TODO Preguntar si puedo hacer logica del tipo "si mi componente padre, o el componente que me envuelve es tal hago una cosa y si es tal otro, hago otra cosa"
  
  //DONE implementar si el usuario no está logueado y intente ingresar a una ruta del front que requiera info privada del back que lo redirija automaticamente a /login

  //TODO preguntar como implementar bien eso del query en la barra de direcciones

  //FIXME Si yo desestructuro las props arriba abajo llegan undefined ´-´, es rarisimo
  const handleSetFavorite = async () => {
    try {
      if (match.path === '/movies') {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=a475d412&i=${props.imdbID}`)
        const specificMovie = response.data
        const { imdbID, Title, Year, Rated, Runtime, Director, Actors, Plot, Poster } = specificMovie
        const newFavoriteMovie = { imdbID, Title, Year, Rated, Runtime, Director, Actors, Plot, Poster }
        const server = generateAxios(user.token)
        await server.post('/users/favorites', newFavoriteMovie)
        //NOTE yo supongo que si el post de arriba dio error entonces se para la ejecucion y entra en el catch, o sea lo de acá abajo no se debería ejecutar si hubo algun error en la linea de arriba
        /* alert("Se ha agregado la pelicula a favoritos.") */
        dispatch(setFavoriteMovies([...favoriteMovies, newFavoriteMovie]))
        //FIXED El dispatch este no cambia el estado, no se por que.. :C, o sea el payload está perfecto pero no cambia el estado. Investigar como hacer dos action para un mismo reducer.. quizás es eso :C
        //NOTE La solución era que estaba tomando el action como una action asincrónica le estaba poniendo     [setFavoriteMovies.fulfilled]: (state, action) => action.payload ...... cuando en realidad el fulfilled solo es para las promesas :' )
      } else { //-> estoy parado en /users/:userId o en /users/me
        const targetUserId = match.url === '/users/me' ? user.id : match.params.userId
        const targetUser = users.filter(user => user.id === Number(targetUserId))[0]
        const specificMovie = targetUser.favoriteMovies.filter(movie => movie.imdbID === props.imdbID)[0]
        const { imdbID, Title, Year, Rated, Runtime, Director, Actors, Plot, Poster } = specificMovie
        const newFavoriteMovie = { imdbID, Title, Year, Rated, Runtime, Director, Actors, Plot, Poster }
        const server = generateAxios(user.token)
        await server.post('/users/favorites', newFavoriteMovie)
        dispatch(setFavoriteMovies([...favoriteMovies, newFavoriteMovie]))
      }
    } catch (error) {
      if(error.response.status === 401)
        alert("Debes estar logueado para realizar esta acción")
      if(error.response.status === 302)
        alert("Ya tenés esa pelicula en favoritos")
    }
  }

  const handleDeleteFavorite = async () => {
    try {
      const server = generateAxios(user.token)
      await server.delete(`/users/favorites/${props.imdbID}`)
      const filteredMovies = favoriteMovies.filter(movie => movie.imdbID !== props.imdbID)
      dispatch(setFavoriteMovies(filteredMovies))
    } catch (error) {
      console.log(error)
    }
  }

  const handleSeeDetails = () => {
    if( match.path === '/movies' ) {
      dispatch(getSpecificMovie(imdbID))
    } else if( match.url === '/users/me' ) { 
      const specificMovie = favoriteMovies.filter(movie => movie.imdbID === imdbID)[0]
      dispatch(setSelectedMovie(specificMovie))
    } else { //-> estoy parado en /users/:userId
      const targetUserId = match.url === '/users/me' ? user.id : match.params.userId
      const targetUser = users.filter(user => user.id === Number(targetUserId))[0]
      const specificMovie = targetUser.favoriteMovies.filter(movie => movie.imdbID === imdbID)[0]
      dispatch(setSelectedMovie(specificMovie))
    }
    history.push(`/movies/${imdbID}`)
  }

  return (
    <div className="carousel-item">
      <img className="carousel-item__img" src={Poster} alt={Title}  />
      <div className="carousel-item__details" >
        <div>
            <img className="carousel-item__details--img" src={playIcon} alt="Play Icon"  onClick={handleSeeDetails}/> 
          {isUserList
              ? <img className="carousel-item__details--img" src={removeIcon} alt="remove icon" onClick={() => handleDeleteFavorite(imdbID)}/>
              : <img className="carousel-item__details--img" src={plusIcon} alt="Plus Icon" onClick={handleSetFavorite}/>
          } 
        </div>
        <p className="carousel-item__details--title">{Title}</p>
        <p className="carousel-item__details--subtitle">{`${Year}`}</p>
      </div>
    </div>

  )
}

export default CarouselItem;
