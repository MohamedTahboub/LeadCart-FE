import eventsNamesMap from './eventsMap';

const groups = {};


function EventsRegister ({ source, events }) {
  if (groups[source]) return;

  groups[source] = events;
}


function fireEvent (eventName, payload) {
  try { // eslint-disable-next-line
    Object.values(groups).map((eventsGroup) => {
      const func = eventsGroup[eventName];
      if (typeof func === 'function') func(payload);
    });
  } catch (err) {
    console.error(err);
  }
}


export default (event) => {
  const { type, payload } = event;
  const eventName = eventsNamesMap(type);

  fireEvent(eventName, payload);
  return { register: EventsRegister };
};
