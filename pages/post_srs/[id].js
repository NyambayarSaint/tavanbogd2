import React from 'react';
import { motion } from "framer-motion";
import Root from "@/core/Root";
import checkLanguage from '@/components/miscs/checkLanguage';
import NewsSingle from "@/components/NewsSingle";

const NewsId = ({ single, multiple }) => {
    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Root seo={{ title: single.Title, description: single.Description, thumb: process.env.serverUrl + single.Thumbnail.url }}>
                <NewsSingle single={single} multiple={multiple} />
            </Root>
        </motion.div>
    );
};

export default NewsId;

export async function getServerSideProps({ params, req }) {
    let single = await checkLanguage('/posts-of-social-responsibilities?slug=' + params.id, req);
    let multiple = await checkLanguage('/posts-of-social-responsibilities?slug_ne=' + params.id + '&_limit=6&_sort=createdAt:DESC', req);
    return { props: { single: single.data[0], multiple: multiple.data } }
}