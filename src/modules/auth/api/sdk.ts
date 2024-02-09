import { Configuration, FrontendApi } from '@ory/client';
import { edgeConfig } from '@ory/integrations/next';

const localConfig = {
  basePath: process.env.NEXT_PUBLIC_KRATOS_PUBLIC_URL,
};

export const OryServerSdk = new FrontendApi(
  new Configuration({
    basePath: process.env.ORY_SDK_URL,
  }),
);

export const OryClientSdk = new FrontendApi(
  new Configuration(process.env.NEXT_PUBLIC_KRATOS_PUBLIC_URL ? localConfig : edgeConfig),
);
