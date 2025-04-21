export function ordinal(num: number): string {
  if (num.toString().at(-1) === '1') {
    return `${num}st`;
  } else if (num.toString().at(-1) === '2') {
    return `${num}nd`;
  } else if (num.toString().at(-1) === '3') {
    return `${num}rd`;
  } else {
    return `${num}th`;
  }
}

export function titleCase(str: string): string {
  return str.split(' ').map(s => s.slice(0,1).toUpperCase() + s.slice(1).toLowerCase()).join(' ');
}