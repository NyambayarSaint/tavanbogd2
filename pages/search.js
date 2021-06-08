import Root from '@/core/Root';
import { motion } from 'framer-motion';
import React from 'react';

const search = () => {

    React.useEffect(() => {
    }, [])

    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Root>
                <div className="container" style={{ marginTop: 30, marginBottom: 30 }}>
                    <h4>Result: </h4>
                    <div className="results-page">
                        <h6>Pages: </h6>
                        <div className="box">

                        </div>
                    </div>
                </div>
            </Root>
        </motion.div>
    );
};

export default search;

export async function getServerSideProps({ params, req, query }) {
    console.log(query, 'query');
    return { props: { data: '' } }
}