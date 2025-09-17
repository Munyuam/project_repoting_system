import Login from "../Login"
import Administration from "../department/Administration";
import Management from "../department/Management";
import Studio from "../department/Studio";
import Warehouse from "../department/Warehouse";
import Workshop from "../department/Workshop";
import Notfound from "../errors/Notfound";
import ServerError from "../errors/ServerError";
import Addproject from "../components/Addproject";
import DisplayProjects from "../components/DisplayProjects";
import ProjectStatus from "../components/ProjectStatus";
import CompletedProjects from "../components/CompletedProjects";

const routes = [
    {
        path : '/',
        component : <ServerError/>
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
        path : '/p/addproject',
        component : <Addproject/>
    },
    {
        path : '/p/projects',
        component : <DisplayProjects/>
    },
    {
        path : '/p/completed-projects',
        component : <CompletedProjects/>
    },
    {
        path : '/p/project-status',
        component : <ProjectStatus/>
    },
     {
        path : '/pendings',
        component : <Workshop/>
    },
    {
        path : '*',
        component : <Notfound/>
    }

]

export default routes;