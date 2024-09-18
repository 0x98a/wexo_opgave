import { useEffect } from 'react';
import { useRouter } from 'next/router'
import { NextPageContext } from 'next';

const CustomErrorPage = ({ statusCode }: { statusCode: number }) => {
    const router = useRouter();
  
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Client-side fejl, redirect til custom error page
            router.replace('/error');
        }
    }, [router]);
  
    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1>Something went wrong</h1>
                {statusCode ? (
                    <p>An error {statusCode} occurred on server</p>
                ) : (
                    <p>An error occurred on the client</p>
                )}
        </div>
    );
};
  
CustomErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};
  
export default CustomErrorPage;