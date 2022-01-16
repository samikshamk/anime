import Main from '../Pages/Main';
import AnimeDesc from '../Pages/AnimeDesc';


const Routes = [
    { path: "/", name: "main", element: <Main/>},
    { path: "/:animeID", name: "animeDesc", element: <AnimeDesc/>}
];

export default Routes;
