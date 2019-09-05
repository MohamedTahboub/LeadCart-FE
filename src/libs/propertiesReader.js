import PropertiesObject from 'assets/hardCodedMessages.json';


function getNestedKeyValue (key) {
  function findKeyValue (key, object) {
    if (object[key]) return object[key];

    const [firstKey, ...restKeys] = key.split('.');

    const keys = restKeys.join('.');

    return object[firstKey] ? findKeyValue(keys, object[firstKey]) : undefined;
  }

  return {
    from: (obj) => findKeyValue(key, obj)
  };
}


export default (key) => getNestedKeyValue(key).from(PropertiesObject);
