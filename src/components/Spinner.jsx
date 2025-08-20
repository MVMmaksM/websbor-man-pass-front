export const Spinner = ({color = "primary"}) =>{
    return (
        <div
          style={{
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
          }}
        >
          <div className={`spinner-border text-${color}`} style={{ width: '3rem', height: '3rem' }} role="status"></div>
        </div>
    )
}