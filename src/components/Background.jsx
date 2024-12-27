import img1 from '../assets/images/background-desktop.png';
import img2 from '../assets/images/background-mobile.png';
import pattern_circle from '../assets/images/pattern-circle.svg';
import pattern_lines from '../assets/images/pattern-lines.svg'
import pattern_top from '../assets/images/pattern-squiggly-line-top.svg'
import pattern_bottom from '../assets/images/pattern-squiggly-line-bottom.svg'

const Background = () => {
    return (
        <>
            <picture>
                <source srcSet={img2} media="(max-width: 767px)" />
                <source srcSet={img1} media="(min-width: 768px)" />
                <img src={img1} alt="Background Image" className='bg-img' />
            </picture>
            <img src={pattern_circle} id='pattern-circle' />
            <img src={pattern_circle} id='pattern-center' />
            <img src={pattern_lines} id='pattern-lines' />
            <img src={pattern_top} id='pattern-top'/>
            <img src={pattern_bottom} id='pattern-bottom'/>
        </>
    )
}

export default Background