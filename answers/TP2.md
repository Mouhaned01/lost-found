Question 1: TypeScript error message: Property 'claimed' is missing in type '{ id: string; title: string; place: string; }' but required in type 'Item'. TypeScript complains because we added claimed: boolean as a required field in src/types.ts, but the items defined in index.tsx don't have this property yet.

