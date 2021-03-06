export const getById = (id) => document.getElementById(id);

export const append = (parent, child = []) => {
  if (child.length > 0) {
    child.forEach((elem) => {
      parent.appendChild(elem);
    });
  }
  return parent;
};

export const create = (type, attrib = []) => {
  const elem = document.createElement(type);
  if (attrib.length > 0) {
    attrib.forEach((item) => {
      Object.assign(elem, item);
    });
  }
  return elem;
};

export const owmKey = 'f100398f5940f1494ed8e47d5af027c9';