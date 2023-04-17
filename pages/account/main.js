import { useState, useEffect } from "react";

import Layout from "../../components/layout";
import { getSession } from '../../utils/api/get-session';

export async function getServerSideProps(context){
    const session = await getSession(context.req, context.res);

    return {
        props: {
            data: session.user
        }
    };
}

export default function Posts({ data }){

    const [user, setUser] = useState(null);
    
    useEffect(() => {
        setUser(data);
    }, [data]);

    return (
        <Layout sessionData={user}>
            <h1>This will be the account detail page</h1>
        </Layout>
    )
}