import { useNavigate } from 'react-router-dom';
import './Error.scss';

export default function Error() {
    const navigate = useNavigate();

    return (
        <div id='error-wrapper'>
            <h1>Oh um, Hi</h1>
            <h2>Well this is akward...</h2>
            <h3>Something went wrong, you <span className='emphesized danger'>really</span> should <span className='emphesized danger'>not</span> be here</h3>

            <h3>Click <span className='emphesized safe' onClick={() => navigate('/')}>here</span> to go back to safety</h3>
        </div>
    )
}
