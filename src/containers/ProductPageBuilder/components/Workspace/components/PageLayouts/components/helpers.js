export const stylesCasting = (styles = {}) => {
  const style = {};

  if (styles.backgroundType === 'image') {
    style.backgroundImage = `url(${styles.backgroundImage})`;
    style.backgroundSize = 'cover';
    style.backgroundRepeat = 'no-repeat';
  } else {style.backgroundColor = styles.backgroundColor;}

  return {
    ...styles,
    ...style
  };

};
