import React, { lazy, Suspense, useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from './Routes/PublicRoutes';
import NotAuthorized from './components/notAuthorized';
import Settings from './components/settings';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                clients: {
                    merge(existing, incoming) {
                        return incoming;
                    },
                },
                projects: {
                    merge(existing, incoming) {
                        return incoming;
                    },
                },
            },
        },
    },
});

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache,
});

// const Home = lazy(()=>import('./components/Public/Home'))
const Auth = lazy(() => import('./components/Auth/auth'));
const DashboardLayout = lazy(() =>
    import('./components/Layout/DashboardLayout')
);
const PublicLayout = lazy(() => import('./components/Layout/PublicLayout'));
const DHome = lazy(() => import('./components/Dashboard/Home'));
const Users = lazy(() => import('./components/Dashboard/Users/Users'));
const Posts = lazy(() => import('./components/Dashboard/Posts/Posts'));
const DashboardPost = lazy(() => import('./components/Dashboard/Posts/Post'));
const PostForm = lazy(() => import('./components/Dashboard/Posts/PostForm'));
const Homepage = lazy(() => import('./Containers/Homepage'));
const PostView = lazy(() => import('./Containers/SinglePost'));
const DbProjects = lazy(() =>
    import('./components/Dashboard/Projects/Projects')
);
const ProjectView = lazy(() =>
    import('./components/Dashboard/Projects/project')
);

const Roles = {
    ADMIN: 'admin',
    USER: 'user',
    EDITOR: 'editor',
};

function App() {
    return (
        <>
            <ApolloProvider client={client}>
                <Suspense fallback="Loading....">
                    <Router>
                        <Routes>
                            <Route path="/" element={<PublicRoutes />}>
                                <Route path="/" element={<PublicLayout />}>
                                    <Route path={''} element={<Homepage />} />
                                    <Route
                                        path={'/post/:id'}
                                        element={<PostView />}
                                    />
                                </Route>
                            </Route>

                            <Route
                                path="/dashboard"
                                element={
                                    <PrivateRoutes
                                        roles={[Roles.ADMIN, Roles.EDITOR]}
                                    />
                                }
                            >
                                <Route
                                    path="/dashboard"
                                    element={<DashboardLayout />}
                                >
                                    <Route
                                        path={''}
                                        element={
                                            <Navigate to="/dashboard/home" />
                                        }
                                    />
                                    <Route path={'home'} element={<DHome />} />
                                    <Route
                                        path={'projects'}
                                        element={<DbProjects />}
                                    />
                                    <Route
                                        path={'projects/:id'}
                                        element={<ProjectView />}
                                    />
                                    <Route path={'users'} element={<Users />} />
                                    <Route
                                        path={'posts/:pageNumber'}
                                        element={<Posts />}
                                    />
                                    <Route path={'posts'} element={<Posts />} />
                                    <Route
                                        path={'posts/post/:id'}
                                        element={<DashboardPost />}
                                    />
                                </Route>
                            </Route>

                            <Route path="/auth" element={<Auth />} />
                            <Route
                                path="/unauthorized"
                                element={<NotAuthorized />}
                            />

                            <Route
                                path="*"
                                element={
                                    <div className=" font-semibold text-2xl h-screen flex items-center justify-center flex-col text-gray-800 bg-slate-200">
                                        <p className="text-6xl"> 404</p>
                                        <p> Not Found</p>
                                    </div>
                                }
                            />
                        </Routes>
                    </Router>
                    <Settings />
                </Suspense>
            </ApolloProvider>
        </>
    );
}

export default App;
