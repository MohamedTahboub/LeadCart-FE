import { useEffect, useState } from 'react';
import { isFunction, notEmptyObj } from 'libs/checks';

export default (options) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const onChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const reset = () => {
    setValues({});
    setErrors({});
  };

  const onSubmit = (e) => {
    if (e.preventDefault) e.preventDefault();

    if (isFunction(options.onSubmit)) if (!notEmptyObj(errors)) options.onSubmit(values);


    if (options.resetOnSubmit) {
      reset();
      if (e.target.reset) e.target.reset();
    }
  };


  const updateErrors = async (values) => {
    const { validationSchema } = options;
    let errors = {};
    if (!notEmptyObj(validationSchema)) return;
    await Object.keys(validationSchema).map(async (key) => {
      if (values[key] && notEmptyObj(validationSchema[key])) {
        const error = await validationSchema[key].validateAt(key, values);
        errors = { ...errors, [key]: error };
      }
    });
    setErrors(errors);
  };

  useEffect(() => {
    // validate and set the errors if occurs
    updateErrors(values);
  }, [values]);

  return [{ values, errors }, { onChange, onSubmit }];
};
