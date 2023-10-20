import React from 'react';

function Alert(props) {
  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const alertStyles = {
    position: 'fixed', // Fixed at the top
    top: 0,
    left: 0,
    right: 0,
    zIndex: 3,
    width: '100vw',
  };

  return (
    <div>
      {props.alert && (
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} style={alertStyles} role="alert">
          <strong>{capitalize(props.alert.type === 'danger' ? 'Error' : 'Success')}</strong>: {props.alert.msg}
        </div>
      )}
    </div>
  );
}

export default Alert;
