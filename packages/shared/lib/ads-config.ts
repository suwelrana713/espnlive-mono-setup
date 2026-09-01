/**
 * Per-project ad toggle. Set NEXT_PUBLIC_ADS_ENABLED=false in .env to disable.
 * Any other value (or unset) keeps ads enabled (default on).
 */
export const adsEnabled = process.env.NEXT_PUBLIC_ADS_ENABLED !== 'false'
