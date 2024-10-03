import logo from '../Assets/Logo_inner.svg';

export default function ApplicationLogo(props) {
    return (
        <img src={logo} alt="Inner Logo" {...props} />
    );
}
