import type { NextApiRequest, NextApiResponse } from 'next';

type HealthResponse = {
  ok: true;
  data: {
    version: string;
    env: string;
    ts: string;
  };
};

export default function handler(_req: NextApiRequest, res: NextApiResponse<HealthResponse>) {
  res.status(200).json({
    ok: true,
    data: {
      version: process.env.npm_package_version ?? '0.0.1',
      env: process.env.NODE_ENV ?? 'development',
      ts: new Date().toISOString(),
    },
  });
}
