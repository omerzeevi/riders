const Input = ({ label, name, error, ...rest }) => {
    return ( 
        <div className="form-group">
            <label htmlFor="">{label}</label>
            <input {...rest} name={name} id={name} className="form-control general-input" />
            {/* short circuit */}
            {error && <span className="text-danger">{error}</span>}
        </div>
     );
}
 
export default Input;