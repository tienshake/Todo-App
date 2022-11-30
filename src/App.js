import GlobalStyle from './components/layout/GlobalStyle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRouters } from './router';
import DefaultLayout from './components/layout/DefaultLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './components/NotFound';
import Login from './page/login';
import { useSelector } from 'react-redux';

function App() {
    const user = useSelector((state) => state.auth.login.currentUser);
    dssd;
    dasdsd;
    return (
        <GlobalStyle>
            <BrowserRouter>
                <Routes>
                    {publicRouters?.map((route, index) => {
                        let Component = route.component;
                        let LayoutRender = DefaultLayout;
                        if (route.login) {
                            if (user) {
                                Component = route.component;
                            } else {
                                Component = Login;
                            }
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <LayoutRender>
                                        <Component />
                                    </LayoutRender>
                                }
                            />
                        );
                    })}
                    <Route
                        path="*"
                        element={
                            <DefaultLayout>
                                <NotFound />
                            </DefaultLayout>
                        }
                    />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </GlobalStyle>
    );
}

export default App;
