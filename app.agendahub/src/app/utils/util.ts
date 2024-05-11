import { EventInput } from "@fullcalendar/core"
import { UserSchedule } from "../models/core/entities"
import { SortEvent } from "primeng/api"
import { environment } from "../../environments/environment.development";
import { defer } from "../types/typing";

export function getRandomImage(el: string = "#login_page") {
  const thisPage = document.querySelector(el) as HTMLElement;
  const [width, height] = [thisPage.clientWidth - 200, thisPage.clientHeight];
  const url = `https://source.unsplash.com/random/${height}x${width}/?landscape?grayscale`;

  defer(async () => {

    if (await caches.has(url)) {
      return;
    }

    caches.open("auth").then(cache => {      
      cache.add(url).then(() => {
        console.log("Image cached " + url);
      });
    });
  })

  return url;
}

export function mapScheduleToEvent(schedules: UserSchedule[], filter: (x: UserSchedule) => boolean = () => true) {
  var self = window.globalThis as any;  
  let events: EventInput[] = [];
  
    schedules.forEach(x => {
      filter.bind(self).call(self, x) && events.push({
        id: x.id?.toString(),
        title: `${x.employee.name} - ${x.customer?.name ?? "-"}`,
        start: x.schedule.startDateTime,
        end: x.schedule.finishDateTime,
        color: x.employee.color ? hexToRgbA(x.employee.color!, 1) : x.employee.color,
        extendedProps: {...x},
      })
    })

    return events;
}

export function customSort(event: SortEvent) {
  event.data?.sort((data1, data2) => {
      
      let value1 = data1[event.field ?? ""];
      let value2 = data2[event.field ?? ""];
      let result = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      
      return (event.order as number) * result;
  });
}

export function notNull(value: unknown) {
  return value != null && value != undefined;
}

export function getTheme() {
  return {
    dark: localStorage.getItem("color-theme") === "dark" || (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
    light: localStorage.getItem("color-theme") === "light" || (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: light)").matches),
  };
}

export function setTheme(theme: "dark" | "light") {
  localStorage.setItem("color-theme", theme);
}

function hashObject(object: any) : any {
  
  const flatify = (object_: any): string => {
    return !object_ ? "" 
                 : (Object
                            .keys(object_)
                              .sort().
                                map((key) => isComplex(object_[key]) 
                                                ? flatify(object_[key]) 
                                                : object_[key].toString())
                                                .join('|')
                                                )
  }

  const flatified = flatify(object);
  let hash = 0

  for (let i = 0; i < flatified.length; i++) {
    hash += flatified.charCodeAt(i);
  }

  return hash;
}

function isComplex(value: any) {
  return !(value instanceof Date) && (typeof value === 'object' || value instanceof Array);
}

export function isMobile() {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window)
  ) || /android/i.test(navigator.userAgent);
  
}

export function rgbaToRgb(rgba: string) {
  if (!rgba.includes("rgba") || !rgba) return rgba;

  const [r, g, b, a] = rgba.match(/\d+/g)!.map(Number);
  return `rgb(${r}, ${g}, ${b})`;
}

export function rgbToRgba(rgb: string, alpha: number) {
  if (!rgb.includes("rgb") || !rgb) return rgb;

  const [r, g, b] = rgb.match(/\d+/g)!.map(Number);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function hexToRgbA(hex: string, alpha: number) {
  let c : any;
  if(/^#([a-f0-9]{3}){1,2}$/.test(hex)){
    c= hex.substring(1).split('');
      if(c.length== 3){
          c= [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c= '0x'+c.join('');
      c= 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+ ',' + alpha + ' )';
  }
  return c ?? hex;
}