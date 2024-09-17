import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        redirect: {
            destination: '/da',
            permanent: false,
        },
    };
};

const IndexPage = () => null;

export default IndexPage;
