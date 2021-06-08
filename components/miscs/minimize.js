import { MenuContext } from '@/miscs/ContextMenuProvider'
import { useContext } from 'react';
import { returnLanguage } from './parseCookies';

const placeholder = '/img/placeholder.jpg';

const minimize = (obj, quality, fullInfo) => {

    const CH = (url) => {
        if (url.includes('http')) return url
        else {
            if (language === "mn") {
                if (fullInfo) {
                    return { url: process.env.serverUrl + url, info: obj }
                }
                return process.env.serverUrl + url
            }
            else {
                if (fullInfo) {
                    return { url: process.env.serverUrlEnglish + url, info: obj }
                }
                return process.env.serverUrlEnglish + url
            }
        }
    }

    const language = returnLanguage();

    if (obj === undefined || obj === null) return placeholder
    if (obj.formats === undefined || obj.formats === null) return obj.url && CH(obj.url) || placeholder

    const { config } = useContext(MenuContext)
    const formats = obj.formats

    if (config.width <= 768) {
        if (quality === 'large') return formats.small && CH(formats.small.url) || formats.medium && CH(formats.medium.url) || formats.large && CH(formats.large.url) || obj.url && CH(obj.url) || placeholder
        if (quality === 'medium') return formats.small && CH(formats.small.url) || formats.medium && CH(formats.medium.url) || formats.large && CH(formats.large.url) || obj.url && CH(obj.url) || placeholder
        if (quality === 'small') return formats.thumbnail && CH(formats.thumbnail.url) || formats.small && CH(formats.small.url) || formats.medium && CH(formats.medium.url) || formats.large && CH(formats.large.url) || obj.url && CH(obj.url) || placeholder
        if (quality === 'thumbnail') return formats.thumbnail && CH(formats.thumbnail.url) || formats.small && CH(formats.small.url) || formats.medium && CH(formats.medium.url) || formats.large && CH(formats.large.url) || obj.url && CH(obj.url) || placeholder
        return formats.medium && CH(formats.medium.url) || formats.large && CH(formats.large.url) || obj.url && CH(obj.url) || placeholder
    }

    if (quality === 'large') return formats.large && CH(formats.large.url) || obj.url && CH(obj.url) || placeholder
    if (quality === 'medium') return formats.medium && CH(formats.medium.url) || formats.large && CH(formats.large.url) || obj.url && CH(obj.url) || placeholder
    if (quality === 'small') return formats.small && CH(formats.small.url) || formats.medium && CH(formats.medium.url) || formats.large && CH(formats.large.url) || obj.url && CH(obj.url) || placeholder
    if (quality === 'thumbnail') return formats.thumbnail && CH(formats.thumbnail.url) || formats.small && CH(formats.small.url) || formats.medium && CH(formats.medium.url) || formats.large && CH(formats.large.url) || obj.url && CH(obj.url) || placeholder
    return obj.url && CH(obj.url) || placeholder
}

export default minimize