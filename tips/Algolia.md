# Aloglia tips

- The `indexName` the index on which you will perform your geosearcg is `space-centers`
- `algoliaClient` credentials:
  - `appId`: **`UORHJCOG49`**
  - `searchApiKey`: **`74fb98e8049e4753ce230f010774b425`**
- `configurations`: (you can set them directly in a `<Configure />` component
  - `facets`: `'*,planet_code'`
  - `facetFilters`: `[['planet_code:EAR']]`
- Since you will perform an inside bounding box GeoSearch with algolia here's the
  query string to provide to the `<InstantSearch />` component
  - it takes the coordinates of the top left corner and the bottom right corner: `insideBoundingBox=${topLeft.lat},${topLeft.lng},${bottomRight.lat},${bottomRight.lng}`.
