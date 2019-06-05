/**
 * Purpose: Form Validation Methods
 */

import React from 'react';
import {capitalize} from './index';

const labels = {
    caseDate: 'Date',
    coverImg: 'Photo'
};

export const isRequired = (value, allValues, props, name) => {
    if (value) return;

    return (labels[name] || capitalize(name)) + ' Required';
}