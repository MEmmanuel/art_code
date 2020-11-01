/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import messages from './messages';

export default function HomePage() {
  return (
    <h1>
      <FormattedMessage {...messages.header} />
      <Link to="/trains">Trains</Link>
      <Link to="/fake-trains">fakeTrains</Link>
    </h1>
  );
}
