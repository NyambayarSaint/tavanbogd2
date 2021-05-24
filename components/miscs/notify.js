import { store } from 'react-notifications-component'

const notify = (data) => {
    return store.addNotification({
        title: data.title ? data.title : ' ',
        message: data.message ? data.message : ' ',
        type: data.type ? data.type : 'default',
        insert: "top",
        container: data.at ? data.at : 'top-right',
        animationIn: ["animate__animated", "animate__fadeIn"],
        dismiss: {
            duration: data.duration ? data.duration * 1000 : 3000,
            onScreen: data.onScreen ? data.onScreen : false
        }
    })
};

export default notify;