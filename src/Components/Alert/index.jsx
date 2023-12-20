import './styles.css'

export default function Alert({ msgAlert }) {
    return (
        <div className='alert-box'>
            <strong>{msgAlert}</strong>
        </div>
    )
}