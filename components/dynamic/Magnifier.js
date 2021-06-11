import React from 'react';
import { PictureInPictureMagnifier, GlassMagnifier } from "react-image-magnifiers";
import { MenuContext } from '../miscs/ContextMenuProvider';
import minimize from '../miscs/minimize';

const Magnifier = ({ data }) => {
    const { config } = React.useContext(MenuContext);
    return (
        <div>
            {config.width > 768 ?
                <PictureInPictureMagnifier imageSrc={minimize(data.Image, 'medium')} imageAlt={data.Image.alternativeText} largeImageSrc={minimize(data.Image)} />
                :
                <GlassMagnifier imageSrc={minimize(data.Image, 'medium')} imageAlt={data.Image.alternativeText} largeImageSrc={minimize(data.Image)} />
            }
        </div>
    );
};

export default Magnifier;