import Home from "../pages/Home"
import Catalog from "../pages/Catelog"
import Search from "../pages/Search"
import Details from '../pages/Details'


const publicRouter = [
    {path:'/', element:Home},
    {path:'/:cate', element:Catalog},
    {path:'/:cate/search', element:Search},
    {path:'/:cate/:id', element:Details},

]

export default publicRouter