export interface SplideOptions {
  /**
   * The type of the carousel
   */
  type?: 'slide' | 'loop' | 'fade';

  /**
   * Sets role to the root element
   */
  role?: string;

  /**
   * Sets aria-label to the root element
   */
  label?: string;

  /**
   * Sets aria-labelledby to the root element
   */
  labelledby?: string;

  /**
   * Determines whether to rewind the carousel or not
   */
  rewind?: boolean;

  /**
   * The transition speed in milliseconds
   */
  speed?: number;

  /**
   * The transition speed on rewind in milliseconds
   */
  rewindSpeed?: number;

  /**
   * Allows to rewind by drag
   */
  rewindByDrag?: boolean;

  /**
   * Defines the carousel max width, accepting the CSS format such as 10em, 80vw
   */
  width?: string | number;

  /**
   * Defines the carousel height, accepting the CSS format except for %
   */
  height?: string | number;

  /**
   * Fixes width of slides, accepting the CSS format
   */
  fixedWidth?: string | number;

  /**
   * Fixes height of slides, accepting the CSS format except for %
   */
  fixedHeight?: string | number;

  /**
   * Determines height of slides by the ratio to the carousel width
   */
  heightRatio?: number;

  /**
   * If true, the width of slides are determined by their width
   */
  autoWidth?: boolean;

  /**
   * If true, the height of slides are determined by their height
   */
  autoHeight?: boolean;

  /**
   * The start index
   */
  start?: number;

  /**
   * Determines the number of slides to display in a page
   */
  perPage?: number;

  /**
   * Determines the number of slides to move at once
   */
  perMove?: number;

  /**
   * Explicitly determines the number of clones on each side of the carousel
   */
  clones?: number;

  /**
   * Determines whether to add the is-active class to clones
   */
  cloneStatus?: boolean;

  /**
   * Determines which slide should be active if there are multiple slides in a page
   */
  focus?: number | 'center';

  /**
   * The gap between slides. The CSS format is acceptable
   */
  gap?: string | number;

  /**
   * Sets padding left/right or top/bottom of the carousel. The CSS format is acceptable
   */
  padding?: string | number | { left?: string | number; right?: string | number; top?: string | number; bottom?: string | number };

  /**
   * Determines whether to create/find arrows or not
   */
  arrows?: boolean;

  /**
   * Determines whether to create pagination (indicator dots) or not
   */
  pagination?: boolean;

  /**
   * Determines whether to enable keyboard shortcuts for pagination when it contains focus
   */
  paginationKeyboard?: boolean;

  /**
   * Explicitly sets the pagination direction
   */
  paginationDirection?: 'ltr' | 'rtl' | 'ttb';

  /**
   * The timing function for the CSS transition
   */
  easing?: string;

  /**
   * The easing function for the drag free mode
   */
  easingFunc?: (t: number) => number;

  /**
   * Determines whether to allow to drag the carousel or not
   */
  drag?: boolean;

  /**
   * Snaps the closest slide on drag free mode
   */
  snap?: boolean;

  /**
   * The selector for nodes that cannot be dragged
   */
  noDrag?: string;

  /**
   * The required distance to start moving the carousel by the touch action
   */
  dragMinThreshold?: number | { mouse: number; touch: number };

  /**
   * Determines the power of "flick". The larger number this is, the farther the carousel runs
   */
  flickPower?: number;

  /**
   * Limits the number of pages to move by the flick action
   */
  flickMaxPages?: number;

  /**
   * Determines whether to disable any actions while the carousel is transitioning
   */
  waitForTransition?: boolean;

  /**
   * Changes the arrow SVG path, like 'm7.61 0.807-2.12...'
   */
  arrowPath?: string;

  /**
   * Determines whether to activate autoplay or not
   */
  autoplay?: boolean;

  /**
   * The autoplay interval in milliseconds
   */
  interval?: number;

  /**
   * Determines whether to pause autoplay on mouseover or not
   */
  pauseOnHover?: boolean;

  /**
   * Determines whether to pause autoplay when the carousel contains a focused element or not
   */
  pauseOnFocus?: boolean;

  /**
   * Determines whether to reset the autoplay progress when it is requested to start again or not
   */
  resetProgress?: boolean;

  /**
   * Enables lazy loading
   */
  lazyLoad?: boolean;

  /**
   * Determines how many pages (not slides) around the active slide should be loaded beforehand
   */
  preloadPages?: number;

  /**
   * Enables keyboard shortcuts
   */
  keyboard?: boolean;

  /**
   * Enables navigation by the mouse wheel
   */
  wheel?: boolean;

  /**
   * The threshold to cut off the small delta produced by inertia scroll
   */
  wheelMinThreshold?: number;

  /**
   * The sleep duration in milliseconds until accepting next wheel input
   */
  wheelSleep?: number;

  /**
   * Determines whether to release the wheel event when the carousel reaches the first or last slide
   */
  releaseWheel?: boolean;

  /**
   * The direction of the carousel
   */
  direction?: 'ltr' | 'rtl' | 'ttb';

  /**
   * Converts the image src to the css background-image URL of the parent element
   */
  cover?: boolean;

  /**
   * Determines whether to add tabindex="0" to visible slides or not
   */
  slideFocus?: boolean;

  /**
   * A selector for focusable nodes inside slides
   */
  focusableNodes?: string;

  /**
   * If true, the carousel makes slides clickable to navigate another carousel
   */
  isNavigation?: boolean;

  /**
   * Determines whether to trim spaces before/after the carousel if the focus option is available
   */
  trimSpace?: boolean;

  /**
   * Disables the next arrow when the carousel reaches the last page and omits redundant pagination dots
   */
  omitEnd?: boolean;

  /**
   * Updates the is-active status of slides just before moving the carousel
   */
  updateOnMove?: boolean;

  /**
   * If min, the media query for breakpoints will be min-width, or otherwise, max-width
   */
  mediaQuery?: 'min' | 'max';

  /**
   * Enables a live region
   */
  live?: boolean;

  /**
   * The collection of responsive options for specific breakpoints
   */
  breakpoints?: Record<number, Partial<SplideOptions>>;

  /**
   * Options used when the (prefers-reduced-motion: reduce) is detected
   */
  reducedMotion?: Partial<SplideOptions>;

  /**
   * The collection of class names
   */
  classes?: Record<string, string>;

  /**
   * The collection of i18n strings
   */
  i18n?: Record<string, string>;

  /**
   * Destroys the carousel
   */
  destroy?: boolean | 'completely';
}