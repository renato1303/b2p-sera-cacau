/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Helper to extract the nutritionist's clean first name
 * Removes titles like Dra., Dr., Nutri and removes accents/special characters
 */
export function getNutritionistFirstName(name: string): string {
  if (!name || typeof name !== 'string') return 'nutri';
  
  // Remove common medical/nutrition titles
  const cleaned = name
    .trim()
    .replace(/^(dra?\.|dr\.|nutri(cionista)?\s+)/i, '')
    .trim();
  
  const parts = cleaned.split(/\s+/);
  const rawFirst = parts[0] || 'nutri';
  
  // Normalize: remove accents, convert to lowercase, keep only alphanumeric
  const normalized = rawFirst
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  return normalized || 'nutri';
}

/**
 * Returns the nutritionist's personal 15% discount coupon:
 * [nomedanutricionista(apenas o primeiro nome)]nutri15
 */
export function getNutriCoupon(name: string): string {
  const firstName = getNutritionistFirstName(name);
  return `${firstName}nutri15`;
}

/**
 * Returns the discount coupon for the nutritionist's patients (8% discount):
 * [nomedanutricionista(apenas o primeiro nome)]8
 */
export function getPatientCoupon(name: string): string {
  const firstName = getNutritionistFirstName(name);
  return `${firstName}8`;
}
