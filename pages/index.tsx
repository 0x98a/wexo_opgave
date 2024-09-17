import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        redirect: {
            destination: '/da',
            permanent: false,
        },
    };
};

const IndexPage = () => null; //Siden vi bare redirecter serverside så kan vi return null da siden ikke bliver vist

export default IndexPage;
