export const Spinner = ({
  color = "primary",
  spinnerStyle = { width: '3rem', height: '3rem' },
  divStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    zIndex: 10,
  } }) => {
  return (
    <div
      style={divStyle}
    >
      <div className={`spinner-border text-${color}`} style={spinnerStyle} role="status"></div>
    </div>
  )
}