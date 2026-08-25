/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Direct asset imports bundled by Vite (guaranteed to resolve on Vercel and local dev)
import defaultRecipeImg from './images/artisanal_ceramics_1783964151303.jpg';
import defaultDaniImg from './images/cocoa_drops_jar_1783964100837.jpg';
import defaultLunaImg from './images/blog_cacao_ritual_1787673807596.jpg';

export const DEFAULT_RECIPE_IMAGE = defaultRecipeImg;
export const DEFAULT_DANI_IMAGE = defaultDaniImg;
export const DEFAULT_LUNA_IMAGE = defaultLunaImg;

export function getRecipeDefaultImage(category?: string, author?: string): string {
  if (author === 'Dani' || category === 'dani') {
    return defaultDaniImg || defaultRecipeImg;
  }
  if (author === 'Luna' || category === 'clinica') {
    return defaultLunaImg || defaultRecipeImg;
  }
  return defaultRecipeImg;
}
