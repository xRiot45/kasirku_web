import UnderlineShape from '@/components/shape/underline';
import { metaObject } from '@/config/site.config';
import AuthWrapperOne from '@/shared/auth-layout/auth-wrapper';
import SignInForm from './partials/form';

export const metadata = {
  ...metaObject('Sign In'),
};

export default function SignIn() {
  return (
    <AuthWrapperOne
      title={
        <>
          Welcome back! Please{' '}
          <span className="relative inline-block">
            Sign in to
            <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-24 text-amber-500 md:w-28 xl:-bottom-1.5 xl:w-36" />
          </span>{' '}
          continue.
        </>
      }
      description="Please sign in to continue to your account. Enter your email address and password below."
      isSocialLoginActive={false}
    >
      <SignInForm />
    </AuthWrapperOne>
  );
}
