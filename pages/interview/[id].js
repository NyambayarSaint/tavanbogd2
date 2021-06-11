const Redirecter = () => {
    return ''
};

export default Redirecter;

export async function getServerSideProps({ params, req }) {
    return { redirect: { destination: '/post_podcasts/'+params.id, permanent: false } }
}