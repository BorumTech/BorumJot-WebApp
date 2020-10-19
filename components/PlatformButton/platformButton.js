import Link from 'next/link';
import platformButton from './platformButton.module.css';

export default function PlatformButton({downloadLink="", imgSrc, label}) {
    return (
        <a href={downloadLink} className={platformButton.platformButton} download>
            <img src={imgSrc} title={label} alt={label} />
        </a>
    );
}