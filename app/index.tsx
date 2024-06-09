import useSessionStore from '@src/stores/sessionStore';
import OnBoarding from './onBoarding'
import LoginPage from './LoginPage';

export default function App() {
  const { session } = useSessionStore();
  console.info('session', session)
  return (
    <>
      {session && session.user ? <OnBoarding /> : <LoginPage />}
    </>
  )
}