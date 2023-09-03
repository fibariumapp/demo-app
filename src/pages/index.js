import Contact from "./Contact";
import Dashboard from "./Dashboard";
import Explore01 from "./Explore01";
import Home01 from "./Home01";
import Ranking from "./Ranking";
import Wallet from "./Wallet";
import ConnectFiba from "./ConnectFiba";
import DisonnectFiba from "./DisconnectFiba";


const routes = [
  {path: '/', component: <Home01/>},
  {path: '/explore-v1', component: <Explore01/>},
  {path: '/dashboard', component: <Dashboard/>},
  {path: '/ranking', component: <Ranking/>},
  {path: '/wallet', component: <Wallet/>},
  {path: '/contact', component: <Contact/>},
  {path: '/connect-fiba', component: <ConnectFiba/>},
  {path: '/disconnect-fiba', component: <DisonnectFiba/>},
]

export default routes;