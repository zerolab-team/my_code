import React from 'react';
import { Helmet } from 'react-helmet';

import { pages } from '../utils/meta';

export const Meta = ({ name }) => {
  const page = pages?.find(({ page }) => page === name);

  if (!page) return null;

  return (
    <Helmet>
      {page.title ? <title>{page.title}</title> : null}

      {page.description ? <meta name="description" content={page.description} /> : null}
    </Helmet>
  );
};
