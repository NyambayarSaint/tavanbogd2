const Redirecter = () => {
    return ''
};

export default Redirecter;

export async function getServerSideProps({ params, req }) {
    return { redirect: { destination: '/post_news/'+params.id, permanent: false } }
}