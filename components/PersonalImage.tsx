import { ImageComponentProps } from "types";

const PersonalImage: React.FC<ImageComponentProps> = ({ src = '/assets/images/personalPhoto.jpg', alt, className }) => {
    return (
        <div style={{
            width: '200px',
            height: '200px',
            borderRadius: '2rem',
            overflow: 'hidden',
            float: 'right',
            margin: '3rem',
            marginTop: 'auto'
        }}>
            <img
                src={ src }
                alt={ alt }
                className={ className }
                style={ {
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center center',
                    transform: 'scale(1.4)'
                } }
            />
        </div>
    );
}

export default PersonalImage;