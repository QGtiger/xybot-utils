type ColorEnum =
  | 'yellow'
  | 'orange'
  | 'red'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'purple';

const colorMap = new Map<ColorEnum, string>([
  ['yellow', '#FFC107'],
  ['orange', '#ff9800'],
  ['red', '#f44336'],
  ['green', '#4caf50'],
  ['cyan', '#00BCD4'],
  ['blue', '#2196f3'],
  ['purple', '#9C27B0'],
]);

const gradientColorMap = new Map<ColorEnum, string>([
  ['yellow', 'linear-gradient(to right, #FDB813, #FFAA00)'],
  ['orange', 'linear-gradient(to right, #FFA500, #FF6347)'],
  ['red', 'linear-gradient(to right, #FF416C, #FF4B2B)'],
  ['green', 'linear-gradient(to right, #00b09b, #96c93d)'],
  ['cyan', 'linear-gradient(to right, #1D976C, #93F9B9)'],
  ['blue', 'linear-gradient(to right, #2196F3, #4FC3F7)'],
  ['purple', 'linear-gradient(to right, #DA22FF, #9733EE)'],
]);

interface MaterialButtonLogProps {
  type: ColorEnum;
  logName: string;
  isLinearGradient?: boolean;
}

const defaultMaterialProps: MaterialButtonLogProps = {
  type: 'blue',
  isLinearGradient: false,
  logName: 'MaterialLog',
};

// material ui 风格的 log 样式增强器
export class MaterialButtonLog {
  options: MaterialButtonLogProps;
  constructor(opts?: MaterialButtonLogProps) {
    this.options = Object.assign({}, defaultMaterialProps, opts);
  }

  log(...data: any[]) {
    const { isLinearGradient, type, logName } = this.options;
    if (isLinearGradient) {
      console.log(
        `%c${logName}`,
        `background-image: ${gradientColorMap.get(
          type,
        )}; padding: 6px 12px; border-radius: 2px; font-size: 14px; color: #fff; text-transform: uppercase; font-weight: 600;`,
        ...data,
      );
    } else {
      console.log(
        `%c${logName}`,
        `background-color: ${colorMap.get(
          type,
        )}; padding: 6px 12px; border-radius: 2px; font-size: 14px; color: #fff; text-transform: uppercase; font-weight: 600;`,
        ...data,
      );
    }
  }
}

export const MaterialConsole = new MaterialButtonLog();
