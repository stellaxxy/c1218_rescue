import React from 'react';

export const isRequired = (value, allValues, props, name) => !value ? name[0].toUpperCase() + name.slice(1) + ' Required' : undefined;