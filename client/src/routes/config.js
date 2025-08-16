import Home from "../Home";
import Login from "../Login"
import Administration from "../department/Administration";
import Management from "../department/Management";
import Studio from "../department/Studio";
import Warehouse from "../department/Warehouse";
import Workshop from "../department/Workshop";
import Notfound from "../errors/Notfound";


const routes = [
    {
        path : '/',
        component : <Home/>
    },
    {
        path : '/Login',
        component : <Login/>
    },
     {
        path : '/department/Administration',
        component : <Administration/>
    }, 
     {
        path : '/department/Management',
        component : <Management/>
    } ,
    {
        path : '/department/Studio',
        component : <Studio/>
    },
    {
        path : '/department/Warehouse',
        component : <Warehouse/>
    },
    {
        path : '/department/Workshop',
        component : <Workshop/>
    },
    {
        path : '*',
        component : <Notfound/>
    }

]

export default routes;