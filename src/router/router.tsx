import { DashboardPage } from '@/pages/dashboard/dashboard-page'
import { LoginPage } from '@/pages/login/login-page'
import { NewPasswordPage } from '@/pages/new-password/new-password-page'
import { OnboardingPage } from '@/pages/onboarding/onboarding-page'
import { RegisterPage } from '@/pages/register/register-page'
import { ResetPasswordRequestPage } from '@/pages/reset-password-request/reset-password-request-page'
import { ResetPasswordPage } from '@/pages/reset-password/reset-password-page'
import { SelectPlanPage } from '@/pages/select-plan/select-plan-page'
import { SuccessPage } from '@/pages/success/success-page'
import { UserInfoPage } from '@/pages/user-info/user-info-page'
import { Navigate } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { AuthRoute } from './auth-route'
import { ProtectedRoute } from './protected-route'
import { RouterContainer } from './router-container'

export const Router = () => {
  return (
    <BrowserRouter>
      <RouterContainer>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route
              path='/login'
              element={<LoginPage />}
            />
            <Route
              path='/register'
              element={<RegisterPage />}
            />
            <Route
              path='/forgot-password'
              element={<ResetPasswordPage />}
            />
            <Route
              path='/forgot-password-request'
              element={<ResetPasswordRequestPage />}
            />
            <Route
              path='/reset-password'
              element={<NewPasswordPage />}
            />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route
              path='/select-plan'
              element={<SelectPlanPage />}
            />
            <Route
              path='/user-info'
              element={<UserInfoPage />}
            />
            <Route
              path='/dashboard/onboarding'
              element={<OnboardingPage />}
            />
            <Route
              path='/dashboard'
              element={<DashboardPage />}
            />
            <Route
              path='/dashboard/upgrade-subscription'
              element={<DashboardPage />}
            />
            <Route
              path='/pricing'
              element={
                <Navigate
                  to='/dashboard/upgrade-subscription'
                  replace
                />
              }
            />
          </Route>

          <Route
            path='/success'
            element={<SuccessPage />}
          />

          <Route
            path='*'
            element={
              <Navigate
                to='/login'
                replace
              />
            }
          />
        </Routes>
      </RouterContainer>
    </BrowserRouter>
  )
}
