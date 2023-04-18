import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainLayout from "./layouts/MainLayout";
import publicRouter from "./router";
import { Fragment } from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {
          publicRouter.map((router,index) => {

            let Layout = MainLayout
            const Comp = router.element

            if(router.layout){
              Layout = router.layout
            }
            else if(router.layout === null){
              Layout = Fragment
            }

            return <Route key={index} path={router.path} element={<Layout><Comp /></Layout>}/>
          })
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
