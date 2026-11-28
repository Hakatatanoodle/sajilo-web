# Photo credits audit

Unsplash licence: free for commercial use, attribution **not required** but appreciated.
Hotlinking from images.unsplash.com is fine. We keep a visible credit anyway.

| Where | Photos | Credit status |
|---|---|---|
| `public/demos/dwaar/` | 12 local jpgs | OK: 12 photographers named + linked in the demo footer. Not verified here that each name matches the right photo (no internet in the check). |
| `public/demos/sajilo-hub-store/` | 12 hotlinked Unsplash photos | Generic "via Unsplash" line added. Photographer names still unknown. |
| `public/demos/ironforge-fitness/` | 1 hotlinked Unsplash photo (hero background) | Generic "via Unsplash" line added. Photographer name still unknown. |
| `src/components/mockups/StoreMini.tsx`, `GymMini.tsx` | 5 of the photos above, reused | Covered by the footer line "Concept demo photography from Unsplash". |
| `public/demos/sweet-house/imgs/` | 10 local jpgs | **NOT Unsplash links, source unknown. No credit.** `masala_tea.jpg` has EXIF copyright/artist = `PITAMAAS.COM`. Confirm the licence or replace. |
| `public/showcase/*.webp` | screenshots of the demos | Contain the photos above, so inherit their status. |

## Hotlinked Unsplash IDs (CDN asset IDs, not page URLs)

photo-1509942774463-acf339cf87d5, photo-1515886657613-9f3515b0c78f, photo-1521369909029-2afed882baee,
photo-1521572163474-6864f9cf17ab, photo-1534438327276-14e5300c3a48 (gym hero), photo-1543076447-215ad9ba6923,
photo-1544816155-12df9643f363, photo-1551028719-00167b16eac5, photo-1556821840-3a63f95609a7,
photo-1578681994506-b8f463449011, photo-1581655353564-df123a1eb820, photo-1596755389378-c31d21fd1273,
photo-1598033129183-c4f50c736f10

To find the photographer: paste `https://images.unsplash.com/photo-<id>` into a reverse image search
or Unsplash search, then add "Photo by Name" + a link to that demo's footer.

## Before a demo becomes a real client site
Replace stock photos with the client's own. Unsplash does not clear people, brands or property for you.
