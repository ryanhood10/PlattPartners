import { GetServerSideProps } from 'next';

// /app → /app/pipeline (default landing inside the dashboard)
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: { destination: '/app/pipeline', permanent: false },
  };
};

export default function AppIndex() {
  return null;
}
