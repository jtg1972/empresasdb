import { Provider } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route } from "react-router-dom";
import DetailedProduct from "./pages/DetailedProduct";
import Reports from "./pages/Reports/reportindexv1";
import DateTest from "./pages/DateTest";
import client from './index'
import { ApolloProvider } from "@apollo/client";
import MainLayoutProducts from "./layouts/MainLayoutProducts";
import store from './redux/store'
import "react-datetime/css/react-datetime.css"
import NewDetailProduct from "./pages/NewDetailProduct";
import {useState} from 'react'

const App=()=>{

  const [isThereReport,setIsThereReport]=useState([false,false])
  return <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/categories/:category"
            element={
              <MainLayoutProducts>
                <DetailedProduct/>
              </MainLayoutProducts>
            }/>
              
            <Route exact path="/categories/"
            element={
              <MainLayoutProducts
                isThereReport={isThereReport}
                setIsThereReport={setIsThereReport}
              >
                {/*<DetailedProduct/>*/}
                <NewDetailProduct
                  isThereReport={isThereReport}
                  setIsThereReport={setIsThereReport}
                />
              </MainLayoutProducts>
            }/>
            <Route exact path="/reports/"
            element={
              <MainLayoutProducts>
                <Reports/>
              </MainLayoutProducts>
            }/>
            <Route exact path="/datetest/"
            element={
              <MainLayoutProducts>
                <DateTest/>
              </MainLayoutProducts>
            }/>
          
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </Provider>
  
}
export default App
