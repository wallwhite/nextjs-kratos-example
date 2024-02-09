import React from 'react';
import { type NextPage } from 'next';
import { notFound } from 'next/navigation';
import { getRegistrationFlow } from '@/modules/auth/api/operations/get-registration-flow';
import { Registration } from '@/modules/auth/components/registration';
import { AuthSearchParams } from '@/modules/auth/types/auth.types';

interface RegistrationPageProps {
  searchParams: Partial<AuthSearchParams>;
}

const RegistrationPage: NextPage<RegistrationPageProps> = async ({ searchParams }) => {
  const flowId = String(searchParams.flow ?? '');
  const returnTo = String(searchParams.returnTo ?? '');

  const { flow, csrf } = await getRegistrationFlow(flowId, returnTo);

  if (!flow) {
    return notFound();
  }

  return <Registration flow={flow} csrf={csrf} />;
};

export default RegistrationPage;
