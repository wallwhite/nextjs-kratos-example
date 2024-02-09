/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';
import { type AxiosError } from 'axios';

const EXPIRED_HTTP_STATUS = 410;

// A small function to help us deal with errors coming from fetching a flow.
export const handleGetFlowError =
  (flowType: 'login' | 'registration' | 'settings' | 'recovery' | 'verification', resetFlow?: () => void) =>
  (err: AxiosError<any>): void => {
    switch (err.response?.data.error?.id) {
      case 'session_inactive': {
        return redirect(`/login?return_to=${window.location.href}`);
      }
      case 'session_aal2_required': {
        if (err.response.data.redirect_browser_to) {
          const redirectTo = new URL(err.response.data.redirect_browser_to);

          if (flowType === 'settings') {
            redirectTo.searchParams.set('return_to', window.location.href);
          }

          // 2FA is enabled and enforced, but user did not perform 2fa yet!
          return redirect(redirectTo.toString());
        }

        return redirect(`/login?aal=aal2&return_to=${window.location.href}`);
      }
      case 'session_already_available': {
        // User is already signed in, let's redirect them home!
        return redirect('/');
      }
      case 'browser_location_change_required':
      case 'session_refresh_required': {
        // We need to re-authenticate to perform this action
        return redirect(err.response.data.redirect_browser_to);
      }
      case 'self_service_flow_return_to_forbidden': {
        // The flow expired, let's request a new one.
        toast.error('The return_to address is not allowed.');

        resetFlow?.();

        return redirect(`/${flowType}`);
      }
      case 'self_service_flow_expired': {
        // The flow expired, let's request a new one.
        toast.error('Your interaction expired, please fill out the form again.');
        resetFlow?.();

        return redirect(`/${flowType}`);
      }
      case 'security_csrf_violation': {
        // A CSRF violation occurred. Best to just refresh the flow!
        toast.error('A security violation was detected, please fill out the form again.');
        resetFlow?.();

        return redirect(`/${flowType}`);
      }
      case 'security_identity_mismatch': {
        // The requested item was intended for someone else. Let's request a new flow...
        resetFlow?.();

        return redirect(`/${flowType}`);
      }

      default: {
        break;
      }
    }

    if (err.response?.status === EXPIRED_HTTP_STATUS) {
      // The flow expired, let's request a new one.
      resetFlow?.();

      return redirect(`/${flowType}`);
    }

    throw err;
  };

// A small function to help us deal with errors coming from initializing a flow.
export const handleFlowError = handleGetFlowError;
