import { DashboardPage } from '@/pages/dashboard/dashboard-page'
import { LoginPage } from '@/pages/login/login-page'
import { OnboardingPage } from '@/pages/onboarding/onboarding-page'
import { RegisterPage } from '@/pages/register/register-page'
import { ResetPasswordPage } from '@/pages/reset-password/reset-password-page'
import { SelectPlanPage } from '@/pages/select-plan/select-plan-page'
import { SuccessPage } from '@/pages/success/success-page'
import { UserInfoPage } from '@/pages/user-info/user-info-page'
import { Navigate } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './protected-route'
import { AuthRoute } from './auth-route'
import { RouterContainer } from './router-container'

export const Router = () => {
  return (
    <BrowserRouter>
      <RouterContainer>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route
              path='/sign-in'
              element={<LoginPage />}
            />
            <Route
              path='/sign-up'
              element={<RegisterPage />}
            />
            <Route
              path='/reset-password'
              element={<ResetPasswordPage />}
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
              path='/success'
              element={<SuccessPage />}
            />
          </Route>

          <Route
            path='*'
            element={
              <Navigate
                to='/sign-in'
                replace
              />
            }
          />
        </Routes>
      </RouterContainer>
    </BrowserRouter>
  )
}
