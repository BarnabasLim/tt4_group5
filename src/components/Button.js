
import PropTypes from 'prop-types'

const Button = (props) => {
  let color=props.color;
  let text=props.text;
  let onClick=props.onClick; 

  return (
    <button
     onClick={onClick}
     className="btn"
     style={{ color:'white',border:1}}
     >{text}</button>
  )
}

Button.defaultProps={
    color:'steelblue',
}
Button.propTypes={
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button