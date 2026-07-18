import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";

import DashboardLayout from "../components/layout/DashboardLayout";

import Dashboard from "../pages/admin/Dashboard";

import Leads from "../pages/admin/Leads";
import Analytics from "../pages/admin/Analytics";
import ActivityLogs from "../pages/admin/ActivityLogs";
import Settings from "../pages/admin/Settings";
import SalesDashboard from "../pages/sales/Dashboard";
import MyLeads from "../pages/sales/MyLeads";




import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

import NotFound from "../pages/shared/NotFound";
import Users from "../pages/admin/Users";
import Chat from "../pages/sales/Chat";
import Notifications from "../pages/Notifications";
import Reports from "../pages/admin/Reports";
import Profile from "../pages/Profile";

const AppRoutes = () => {

    return (

        <BrowserRouter>

            <Routes>
				<Route
    path="/"
    element={<Navigate to="/login" replace />}
/>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />

                <Route
                    element={<ProtectedRoute />}
                >

                    <Route
                        element={
                            <RoleProtectedRoute
                                roles={["ADMIN"]}
                            />
                        }
                    >

                        <Route
                            element={<DashboardLayout />}
                        >

                            <Route
                                path="/admin/dashboard"
                                element={<Dashboard />}
                            />

                            <Route
                                path="/admin/users"
                                element={<Users />}
                            />

                            <Route
                                path="/admin/leads"
                                element={<Leads />}
                            />
                            <Route
                                path="/admin/analytics"
                                element={<Analytics />}
                            />
                            <Route
                                path="/admin/activity"
                                element={<ActivityLogs />}
                            />
                            <Route
                                path="/admin/settings"
                                element={<Settings />}
                            />
							 <Route
                            path="/chat"
                    element={<Chat />}
                            />
							<Route
    path="/notifications"
    element={<Notifications />}
/>
<Route
    path="/reports"
    element={<Reports />}
/>
<Route
    path="/profile"
    element={<Profile />}
/>
                           

                            

                           

                        </Route>

                    </Route>

                    <Route
                        element={
                            <RoleProtectedRoute
                                roles={["sales"]}
                            />
                        }
                    >

                        <Route
                            element={<DashboardLayout />}
                        >

                            <Route
                                path="/sales/dashboard"
                                element={<SalesDashboard />}
                            />

                            <Route
                                path="/sales/leads"
                                element={<MyLeads />}
                            />

                            <Route
                                path="/sales/chat"
                                element={<Chat />}
                            />

                            <Route
                                path="/sales/notifications"
                                element={<Notifications />}
                            />

                            <Route
                                path="/sales/profile"
                                element={<Profile />}
                            />

                        </Route>

                    </Route>

                </Route>

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </BrowserRouter>

    );

};

export default AppRoutes;
