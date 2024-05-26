import React from 'react';

const styles = {
    ImageContainer: {
        top: '220px',
        left: '74px',
        width: '228px',
        height: '228px',
        borderRadius: '24px',
        backgroundImage: 'url(./image.png)',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
};

const defaultProps = {
    image: 'https://assets.api.uizard.io/api/cdn/stream/24ef11f5-895a-47df-a435-07e5b49624d2.png',
}

const Image = (props: { image: any; }) => {
    return (
        <div style={{
            ...styles.ImageContainer,
            backgroundImage: `url(${props.image ?? defaultProps.image})`,
        }} />
    );
};

export default Image;