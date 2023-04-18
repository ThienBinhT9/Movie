import defaultImg from '../asstes/images/defaultImg.jpg'

const configApi = {
    baseUrl:'https://api.themoviedb.org/3/',
    apiKey:'4cf8576baf364be278524941e6802bbc',
    originalImage: (imgPath) => {
        if(imgPath) return `https://image.tmdb.org/t/p/original/${imgPath}`
        else return defaultImg
    },
    w500Image: (imgPath) => {
        if(imgPath) return `https://image.tmdb.org/t/p/w500/${imgPath}`
        else return defaultImg
    }
}

export default configApi