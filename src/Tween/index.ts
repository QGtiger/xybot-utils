import { isFn } from '../_utils';
import { EventsDispatcher } from '../EventsDispatcher';
import { EaseType, Easing } from './easing';

type EaseFn = (t: number, m?: number) => number;
type EaseKey = keyof EaseType;

type Obj = Record<string, any>;

export class Tween<T extends Record<string, any>> extends EventsDispatcher<{
  type: 'update' | 'end';
}> {
  private _target: Record<string, any>;
  private isPlay: boolean = false;

  // tween 目标值
  private _dest: object = {};
  // 动画时间
  private _duration: number = 0;
  // 进度
  private _progress: number = 0;
  // 动画开始值
  private _origin: Obj = {};
  // diff
  private _diff: Obj = {};
  // 缓动动画
  private _ease: EaseFn = Easing.linear;

  constructor(target: T) {
    super();
    this._target = target;
  }

  to(props: T, duration: number, ease: EaseKey | EaseFn) {
    const target = this._target;
    const origin: any = {};
    const diff: any = {};

    // 赋值
    this._dest = props;
    this._duration = duration || this._duration;

    this._ease = isFn(ease) ? (ease as EaseFn) : Easing[ease as EaseKey];

    const keys = Object.keys(props);
    keys.forEach((k: any) => {
      const val = props[k];
      origin[k] = target[k];
      diff[k] = val - origin[k];
    });

    this._origin = origin;
    this._diff = diff;

    return this;
  }

  progress(process: number) {
    const { _dest, _origin, _target, _ease, _diff } = this;

    process = process < 1 ? process : 1;

    this._progress = process;

    const keys = Object.keys(_dest);
    keys.forEach((k) => {
      _target[k] = _origin[k] + _diff[k] * _ease(process);
    });

    this.dispathcEvent({
      type: 'update',
    });

    return this;
  }

  play(isResume: boolean = false) {
    if (this.isPlay) return;
    this.isPlay = true;

    if (!isResume) {
      this._progress = 0;
    }

    const { _progress, _duration } = this;
    const startTime = Date.now();
    const duration = _duration * (1 - _progress);

    const render = () => {
      if (!this.isPlay) return;

      const time = Date.now();
      this.progress(_progress + (time - startTime) / duration);

      if (this._progress === 1) {
        this.isPlay = false;
        this.dispathcEvent({
          type: 'end',
        });
        return;
      }

      window.requestAnimationFrame(render);
    };

    window.requestAnimationFrame(render);
  }

  pause() {
    this.isPlay = false;
    return this;
  }
}

export * from './easing';
