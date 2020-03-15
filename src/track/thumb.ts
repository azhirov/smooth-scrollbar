import * as I from '../interfaces/';
import { TrackDirection } from './direction';
import { setStyle } from '../utils/';

export class ScrollbarThumb implements I.ScrollbarThumb {
  /**
   * Thumb element
   */
  readonly element = document.createElement('div');

  /**
   * Display size of the thumb
   * will always be greater than `scrollbar.options.thumbMinSize`
   */
  displaySize = 0;

  /**
   * Actual size of the thumb
   */
  realSize = 0;

  /**
   * Thumb offset to the top
   */
  offset = 0;

  constructor(
    private _direction: TrackDirection,
    private _minSize = 0,
  ) {
    this.element.className = `scrollbar-thumb scrollbar-thumb-${_direction}`;
  }

  /**
   * Attach to track element
   *
   * @param trackEl Track element
   */
  attachTo(trackEl: HTMLElement) {
    trackEl.appendChild(this.element);
  }

  update(
    scrollOffset: number,
    containerSize: number,
    pageSize: number,
  ) {
    // calculate thumb size
    // pageSize > containerSize -> scrollable
    this.realSize = Math.min((containerSize) / pageSize, 1) * (containerSize);
    this.displaySize = Math.max(this.realSize, this._minSize);
    console.log('realSize: ' + this.realSize);
    console.log('displaySize: ' + this.displaySize);
    console.log('containerSize: ' + containerSize);
    console.log('pageSize: ' + pageSize);
    console.log('scrollOffset: ' + scrollOffset);
    // calculate thumb offset
    this.offset = scrollOffset / pageSize * (containerSize - 8 + (this.realSize - this.displaySize));
    setStyle(this.element, this._getStyle(containerSize - 8));
  }

  private _getStyle(containerSize) {
    switch (this._direction) {
      case TrackDirection.X:
        return {
          width: `${this.displaySize}px`,
          '-transform': `translate3d(${this.offset}px, 0, 0)`,
        };

      case TrackDirection.Y:
        return {
          height: `${100 * this.displaySize / containerSize}%`,
          '-transform': `translate3d(0, ${this.offset}px, 0)`,
        };

      default:
        return null;
    }
  }
}
