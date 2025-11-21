import { ImageComponentProps } from "types";

import Image from 'next/image';

const PersonalImage: React.FC<ImageComponentProps> = ({ src = '/assets/images/personalPhoto.jpg', alt, className }) => {
    return (
        <div style={{
            width: '200px',
            height: '200px',
            borderRadius: '2rem',
            overflow: 'hidden',
            position: 'relative',
            flexShrink: 0
        }}>
            <Image
                src={src}
                alt={alt || "Pablo Machado"}
                className={className}
                fill
                sizes="200px"
                priority
                style={{
                    objectFit: 'cover',
                    objectPosition: 'center center',
                    transform: 'scale(1.4)'
                }}
            />
        </div>
    );
}

export default PersonalImage;