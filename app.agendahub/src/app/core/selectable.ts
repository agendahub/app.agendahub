export abstract class Selectable {
  selected: boolean = false;

  toggle(): void {
    this.selected = !this.selected;
  }
}
