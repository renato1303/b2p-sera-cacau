import { Course } from '../types';

/**
 * Target release date for the "A Jornada do Cacau Cabruca" course (20/09/2026).
 */
export const CABRUCA_RELEASE_DATE = new Date('2026-09-20T00:00:00');

/**
 * Checks if a course is currently scheduled for future release and therefore locked for regular users.
 */
export function isCourseLockedByDate(course: Course | null | undefined, userRole?: string): boolean {
  if (!course) return false;

  const isCabruca = course.id === 'course-1' || 
    course.title.toLowerCase().includes('cabruca') || 
    course.title.toLowerCase().includes('jornada');

  if (course.isLockedUntilAvailable || isCabruca) {
    const targetDate = course.availableFrom ? new Date(course.availableFrom) : CABRUCA_RELEASE_DATE;
    const now = new Date();
    
    // If current time is before the release date, regular users cannot access
    if (now.getTime() < targetDate.getTime()) {
      return true;
    }
  }

  return false;
}

/**
 * Calculates remaining time until a course release.
 */
export function getTimeUntilRelease(targetDate: Date = CABRUCA_RELEASE_DATE) {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isReleased: true
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    isReleased: false
  };
}
